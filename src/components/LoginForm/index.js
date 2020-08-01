import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import Button from '../Button/button';
import * as api from '../../services/api';

import './styles.scss'

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

const validate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

function LoginForm({ onLogin }) {
  const [error, setError] = useState(null)

  const onSubmit = useCallback(({email, password}) => {
    api.login(email, password)
      .then(res => onLogin(res.token))
      .catch(err => setError(err.message))
  }, [onLogin]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      <Form className="login-form" noValidate>
        {error && <div className="login-form__error">{error}</div>}

        <div className="login-form__fields">
          <h3 className="login-form__title">Log in</h3>
            <div className="login-form__field">
              <Field
                placeholder="Email"
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage name="email" component="p" className="login-form__field-error" />
            </div>
          <div className="login-form__field">
            <Field
              placeholder="Password"
              type="password"
              name="password"
              id="password"
            />
            <ErrorMessage name="password" component="p" className="login-form__field-error" />
          </div>
        </div>
        <div className="login-form__submit">
          <Button
            title="Login"
            type="submit"
          />
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;