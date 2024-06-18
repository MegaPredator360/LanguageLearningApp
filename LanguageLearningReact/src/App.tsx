import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './Views/home';
import LoginView from './Views/login';
import Lecture from './Views/lecture';

function App() {

  const router = createBrowserRouter([
    {path: "/", element: <Home/>, },
    {path: "/login", element: <LoginView/>},
    {path: "/lecture", element: <Lecture/>}
  ])

  return (
    <>
       <div className='background'><RouterProvider router={router}/></div>
      
    </>
  )
}

export default App
