import { Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import '../layout/layout.css'
import { Button, Divider } from "antd"

function LayoutView() {

    return (
        <>
            <div className="min-vh-100">
                <div className="topnav d-flex">
                    <h4>LinguaLearn</h4>
                    <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                    <Button type='text'>Search</Button>
                    <Divider type='vertical' className="h-auto" />
                    <Button type='text'>Log In</Button>
                    <Button type='text'>Sign Up</Button>
                </div>

                {/* Mostrará las rutas anidadas */}
                <Outlet />
            </div>
        </>
    )
}

export default LayoutView