import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginView from './views/auth/login';
import RegisterView from './views/auth/register';
import LayoutView from './views/layout/layout';
import HomeView from './views/home/home'
import ReadingView from './views/reading/view';
import ReadingFormView from './views/reading/form';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutView />,
      children: [
        { path: "home", element: <HomeView /> },
        { path: "reading", element: <ReadingView /> },
        { path: "reading/form", element: <ReadingFormView /> },
        { path: "", element: <Navigate to = "home" /> }
      ]
    },
    { path: "/login", element: <LoginView /> },
    { path: "/register", element: <RegisterView /> },
    { path: "", element: <Navigate to = "/" /> }
  ])

  return (
    <>
      <div className='background'><RouterProvider router = {router} /></div>
    </>
  )
}

export default App
