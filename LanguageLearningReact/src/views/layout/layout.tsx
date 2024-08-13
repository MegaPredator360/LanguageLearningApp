import { useNavigate, Outlet } from "react-router-dom"
import './layout.css'
import { Button, ConfigProvider, Divider, Dropdown, MenuProps } from "antd"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons"
import userService from '../../services/user-service';
import { useNotification } from '../../components/notification-component';
import { useEffect, useState } from "react";
import { User } from "../../interfaces/user-interface";
import utilityService from "../../services/utility-service";

function LayoutView() {

    // Estado para la sesion
    const [sesion, setSesion] = useState<Boolean>(false)
    const [logged, setLogged] = useState<User>()

    // Notificacion
    const { showNotification } = useNotification();

    // Navegacion atraves del layout
    const navigate = useNavigate()

    // Verificar si hay una sesion iniciada
    const verifyLoggedUser = async () => {

        // Se obtiene el token de sesion
        const token = utilityService.obtenerSesion()

        // Se realiza peticion a la API
        await userService.Logged(token)
            .then(data => {
                if (data.status) {

                    // Se verifica si hay sesion
                    if (data.value == null) {
                        setSesion(false);
                    }
                    else {
                        setSesion(true)
                        setLogged(data.value)
                    }
                }
                else {
                    // Notificacion
                    showNotification('error', 'Error', data.msg);
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', "An error ocurred when getting the logged user");
                console.error(error);
            })
    }

    // Cerrar Sesion
    const logout = () => {
        utilityService.eliminarSesion()
        setLogged(undefined)
        setSesion(false)
    }

    // Opciones del menu
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: "Create Profile"
        },
        {
            key: '2',
            label: "Account Settings"
        },
        {
            key: '3',
            onClick: (() => navigate('/reading/form')),
            label: "Create Reading"
        },
        {
            key: '4',
            onClick: (() => navigate('/exercise/form')),
            label: "Create Exercise"
        },
        {
            key: '5',
            onClick: (() => logout()),
            label: "Log Out"
        }
    ];

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        verifyLoggedUser()
    }, [])

    return (
        <>
            <div className="min-vh-100 d-flex flex-column content-padding">

                {/* Top Navigation Bar */}
                <div className="topnav fixed-top">
                    <div className="d-flex container">
                        <button onClick={() => navigate('/home')} className="logo-text blank-button">LinguaLearn</button>
                        <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                        <Button type='text' onClick={() => navigate('/search')}>Search</Button>
                        <Divider type='vertical' className="h-auto" />
                        {sesion ?
                            (
                                <Dropdown menu={{ items }} placement="topRight">
                                    <Button type="text">{logged?.username}</Button>
                                </Dropdown>
                            )
                            :
                            (
                                <div>
                                    <Button type='text' onClick={() => navigate('/login')}>Log In</Button>
                                    <Button type='text' onClick={() => navigate('/register')}>Sign Up</Button>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Mostrará las rutas anidadas */}
                <Outlet />

                {/* Footer */}
                <footer className="site-footer mt-auto">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h6>Stay Tuned</h6>
                                <p className="text-justify">
                                    Exciting updates are on the way! We're working hard behind the scenes to bring you new features and improvements.
                                    Stay tuned, make sure to follow us on our social media and check back soon for the latest updates.</p>
                                <p className="text-justify">Thank you for your patience and support!</p>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>About</h6>
                                <ul className="footer-links">
                                    <li><a href="#">Mission</a></li>
                                    <li><a href="#">Approach</a></li>
                                    <li><a href="#">Efficacy</a></li>
                                    <li><a href="#">Investors</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Templates</a></li>
                                </ul>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h6>Terms of Service</h6>
                                <ul className="footer-links">
                                    <li><a href="#">Community Guidelines</a></li>
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">Privacy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ borderColor: 'white' }} />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-6 col-xs-12">
                                <p className="copyright-text">Copyright &copy; 2024. All Rights Reserved by LinguaLearn
                                </p>
                            </div>

                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <ul className="social-icons">
                                    <li>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: '#084acf',
                                                },
                                            }}
                                        >
                                            <Button shape="circle" icon={<FacebookOutlined />} size="large" />
                                        </ConfigProvider>
                                    </li>
                                    <li>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: '#1da1f2',
                                                },
                                            }}
                                        >
                                            <Button shape="circle" icon={<TwitterOutlined />} size="large" />
                                        </ConfigProvider>
                                    </li>
                                    <li>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: '#c32aa3',
                                                },
                                            }}
                                        >
                                            <Button shape="circle" icon={<InstagramOutlined />} size="large" />
                                        </ConfigProvider>
                                    </li>
                                    <li>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: '#ff0000',
                                                },
                                            }}
                                        >
                                            <Button shape="circle" icon={<YoutubeOutlined />} size="large" />
                                        </ConfigProvider>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LayoutView