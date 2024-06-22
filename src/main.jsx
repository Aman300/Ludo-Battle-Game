import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId="624108457637-dvcrjphjehd2ou55audo53m8n3lpqet1.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    <Toaster />
    </>
  
)
