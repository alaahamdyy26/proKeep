import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';
import LoginPage from './pages/LoginPage';

test('renders login page', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App/>)
  const result = renderer.getRenderOutput()

  expect(result.type).toBe('div');
  expect(result.props.children).toEqual(<LoginPage/>)
});