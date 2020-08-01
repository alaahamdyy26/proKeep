import React, {useCallback, useState} from 'react';
import Page from "../../layouts/Page";
import LoginForm from "../../components/LoginForm";


function LoginPage() {
  const [token, setToken] = useState(null);

  const onLogin = useCallback(tkn => {
    setToken(tkn);
  }, [])

  return (
    <Page>
      {
        !token
          ? <LoginForm onLogin={onLogin} />
          : <div className="onLogin">
            <h4>Welcome back!</h4>
            <p>Your token is:</p>
            <pre>{token}</pre>
          </div>
      }
    </Page>
  );
}

export default LoginPage;