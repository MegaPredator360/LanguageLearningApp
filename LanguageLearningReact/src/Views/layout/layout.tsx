import { useNavigate, Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import './layout.css'
import { Button, ConfigProvider, Divider } from "antd"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons"

function LayoutView() {

    const navigate = useNavigate()

    return (
        <>
            <div className="min-vh-100 d-flex flex-column content-padding">

                {/* Top Navigation Bar */}
                <div className="topnav fixed-top">
                    <div className="d-flex container">
                        <h4>LinguaLearn</h4>
                        <span className="flex-grow-1 flex-shrink-1 flex-basis-auto"></span>
                        <Button type='text'>Search</Button>
                        <Divider type='vertical' className="h-auto" />
                        <Button type='text' onClick={() => navigate('/login')}>Log In</Button>
                        <Button type='text'>Sign Up</Button>
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