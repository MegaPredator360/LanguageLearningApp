//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NotificationProvider } from './components/notification-component.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
      <App />
  </NotificationProvider>,
)

/*
// Usa Strict para detectar errores
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>,
  </React.StrictMode>,
)
*/