import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginView from './Views/login';
import LayoutView from './Views/layout/layout';
import HomeView from './Views/home/home'
import LectureView from './Views/lecture';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutView />,
      children: [
        { path: "home", element: <HomeView /> },
        { path: "lecture", element: <LectureView /> },
        { path: "", element: <Navigate to = "home" /> }
      ]
    },
    { path: "/login", element: <LoginView /> },
    { path: "", element: <Navigate to = "/" /> }
  ])

  return (
    <>
      <div className='background'><RouterProvider router={router} /></div>
    </>
  )
}

export default App
