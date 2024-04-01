import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
      domain="dev-xdfde1z7xmi0fnmy.us.auth0.com"
      clientId="DqoVJYCl4cz9iGwlyY2idHHwKOpaJrQM"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      audience='http://localhost:5000/user'
      scope="openid profile email"
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
)
