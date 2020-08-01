import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import * as api from '../../services/api'
import LoginForm from './index';

jest.mock('../../services/api')

describe('<LoginForm />', () => {
  it('displays a form with email and password fields', () => {
    render(<LoginForm onLogin={jest.fn()} />)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('displays error message if email or password is missing', async () => {
    render(<LoginForm onLogin={jest.fn()} />)

    let submitBtn = screen.getByText('Login');
    await waitFor(() => {
      fireEvent.click(submitBtn)
    })

    expect(await screen.findByText("Please enter your email")).toBeInTheDocument()
    expect(await screen.findByText("Please enter your password")).toBeInTheDocument()
  })

  it('entering a wrong email displays an error message', async () => {
    render(<LoginForm onLogin={jest.fn()} />)

    let email = screen.getByPlaceholderText('Email');

    await waitFor(() => {
      fireEvent.change(email, { target: { value: 'not@valid'}})
      fireEvent.blur(email)
    })

    expect(await screen.findByText("Invalid email")).toBeInTheDocument()
  })

  describe('on submit with API success', () => {
    const onLogin = jest.fn();
    const enteredEmail = 'john.doe@example.com';
    const enteredPassword = 'some-password';
    const token = '123'

    beforeEach(async () => {
      render(<LoginForm onLogin={onLogin} />)
      api.login.mockResolvedValue({
        token
      })

      const email = screen.getByPlaceholderText('Email');
      const password = screen.getByPlaceholderText('Password');
      const submitBtn = screen.getByText('Login');

      await waitFor(() => {
        fireEvent.change(email, { target: { value: enteredEmail}})
        fireEvent.change(password, { target: { value: enteredPassword}})
        submitBtn.click()
      })
    })

    it('passed entered values to API', () => {
      expect(api.login).toHaveBeenCalledWith(enteredEmail, enteredPassword)
    })

    it('passes API token using onLogin cb', async () => {
      expect(onLogin).toHaveBeenCalledWith(token)
    })
  });

  describe('on submit with API error', () => {
    const onLogin = jest.fn();
    const enteredEmail = 'john.doe@example.com';
    const enteredPassword = 'some-password';
    const apiError = 'user not found'

    beforeEach(async () => {
      render(<LoginForm onLogin={onLogin} />)

      api.login.mockRejectedValue(new Error(apiError))

      const email = screen.getByPlaceholderText('Email');
      const password = screen.getByPlaceholderText('Password');
      const submitBtn = screen.getByText('Login');

      await waitFor(() => {
        fireEvent.change(email, { target: { value: enteredEmail}})
        fireEvent.change(password, { target: { value: enteredPassword}})
        submitBtn.click()
      })
    })

    it('displays API error for the user', async () => {
      expect(await screen.findByText(apiError)).toBeInTheDocument()
    })

    it('does not call onLogin cb', async () => {
      expect(onLogin).not.toHaveBeenCalled()
    })
  });

});