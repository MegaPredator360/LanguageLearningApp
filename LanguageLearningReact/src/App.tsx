import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginView from './views/auth/login';
import RegisterView from './views/auth/register';
import LayoutView from './views/layout/layout';
import HomeView from './views/home/home'
import LectureView from './views/lecture/view';
import LectureFormView from './views/lecture/form';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutView />,
      children: [
        { path: "home", element: <HomeView /> },
        { path: "lecture", element: <LectureView /> },
        { path: "lecture/form", element: <LectureFormView /> },
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
