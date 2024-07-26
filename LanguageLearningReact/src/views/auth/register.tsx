import React, { useState } from 'react';
import { Card, Divider, Button, Input, Space, notification, Row, Col, DatePicker, Select, Tooltip } from 'antd';
import { UserOutlined, MailOutlined, InfoCircleOutlined } from '@ant-design/icons';
import userService from '../../services/user-service';
import { User } from '../../interfaces/user-interface';
import { useNavigate } from 'react-router-dom';
import utilityService from '../../services/utility-service';

// Importacion de lista de paises
import countryList from '../../assets/json/data/country-list.json'

const RegisterView: React.FC = () => {

    // Ordenar la lista por orden alfabetico
    const countrySorted = countryList.sort((a, b) => a.value.localeCompare(b.value));

    // Navegador de paginas
    const navigate = useNavigate()

    // Formulario
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState(null)
    const [country, setCountry] = useState("")

    // Controlar boardeado de errores de inputs
    const [fullNameError, setFullNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    // Notificacion
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false)

    // Controlar el cambio de texto
    const handleFullNameChanges = (e: any) => {
        setFullName(e.target.value);
        setFullNameError(false)
    }

    const handleUsernameChanges = (e: any) => {
        setUsername(e.target.value);
        setUsernameError(false)
    }

    const handleEmailChanges = (e: any) => {
        setEmail(e.target.value);
        setEmailError(false)
    }

    const handleBirthDateChanges = (date: any) => {
        setBirthDate(date);
        setBirthDateError(false)
    }

    const handlePasswordChanges = (e: any) => {
        setPassword(e.target.value);
        setPasswordError(false)
    }

    const handleConfirmPasswordChanges = (e: any) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(false)
    }

    const handleCountryChange = (value: string) => {
        setCountry(value)
        setCountryError(false)
    };

    const registerSubmit = async () => {

        // Se valida formulario
        if (validateForm()) {

            // Notificacion
            api['error']({
                message: 'Error',
                description:
                    'There is one or more fields empty.',
            });

            return
        }

        // Se valida que el correo sea valido
        if (!utilityService.verificarCorreo(email)) {

            // Activar error en correo
            setEmailError(true)

            // Notificacion
            api['error']({
                message: 'Error',
                description:
                    'The entered email is not valid.',
            });

            return
        }

        // Se valida que la contraseña cumpla con los requisitos
        if (!utilityService.verificarContrasena(password)) {

            // Activar error en contraseña
            setPasswordError(true)

            // Notificacion
            api['error']({
                message: 'Error',
                description:
                    'The entered password does not meet the requirements.',
            });

            return
        }

        // Se valida que las contraseñas sean iguales
        if (password != confirmPassword) {

            // Activar error en contraseña
            setConfirmPasswordError(true)

            // Notificacion
            api['error']({
                message: 'Error',
                description:
                    'The confirmation password does not match with the original.',
            });

            return
        }

        // Se activa el icono de carga
        setLoading(true)

        // Se crea objeto User
        const user: User = {
            id: 0,
            full_name: fullName,
            username: username,
            email: email,
            password: password,
            birth_date: birthDate?.format('YYYY-MM-DD'),
            country: country,
            active: true,
            role: 0,
            role_name: ""
        }

        // Se envia peticion
        await userService.Register(user)
        .then(data => {
            if (data.status) {

                // Se desactiva el icono de carga
                setLoading(false)

                // Notificacion
                api['success']({
                    message: 'Success',
                    description: "Your account has been created successfully!",
                });
            }
            else {
                // Se desactiva el icono de carga
                setLoading(false)

                // Notificacion
                api['error']({
                    message: 'Error',
                    description: data.msg,
                });

                console.error(data.msg)

            }
        })
        .catch(error => {
            // Notificacion
            api['error']({
                message: 'Error',
                description: "An error ocurred when registering the user",
            });
            console.error(error);
        })
    }

    // Se valida si los campos están con texto
    const validateForm = (): Boolean => {

        let emptyInput: Boolean = false

        if (fullName == '') {
            setFullNameError(true)
            emptyInput = true
        }

        if (username == '') {
            setUsernameError(true)
            emptyInput = true
        }

        if (email == '') {
            setEmailError(true)
            emptyInput = true
        }

        if (birthDate == '') {
            setBirthDateError(true)
            emptyInput = true
        }

        if (password == '') {
            setPasswordError(true)
            emptyInput = true
        }

        if (confirmPassword == '') {
            setConfirmPasswordError(true)
            emptyInput = true
        }

        if (country == '') {
            setCountryError(true)
            emptyInput = true
        }

        return emptyInput
    }

    return (
        <>
            {contextHolder}

            <div className="topnav fixed-top">

                {/* Barra de navegacion superior */}
                <div className="d-flex container">
                    <button onClick={() => navigate('/home')} className="logo-text blank-button">LinguaLearn</button>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Space direction="vertical" size={16}>
                    <Card
                        title="Create a new account"
                        style={{ width: 600 }}
                        styles={{ header: { textAlign: 'center' } }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col className="gutter-row" span={12}>
                                <Input
                                    value={fullName}
                                    onChange={handleFullNameChanges}
                                    status={fullNameError ? 'error' : ''}
                                    placeholder="Full Name"
                                    suffix={<UserOutlined />}
                                />
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Input
                                    value={username}
                                    onChange={handleUsernameChanges}
                                    status={usernameError ? 'error' : ''}
                                    placeholder="Username"
                                    suffix={<UserOutlined />}
                                />
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Input
                                    value={email}
                                    onChange={handleEmailChanges}
                                    status={emailError ? 'error' : ''}
                                    placeholder="E-mail"
                                    suffix={<MailOutlined />}
                                />
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <DatePicker
                                    placeholder='Birth Date'
                                    onChange={handleBirthDateChanges}
                                    status={birthDateError ? 'error' : ''}
                                    className='w-100'
                                    value={birthDate}
                                />
                            </Col>
                            <Col className="gutter-row d-flex" span={12}>
                                <Input.Password
                                    placeholder="Password"
                                    value={password}
                                    status={passwordError ? 'error' : ''}
                                    onChange={handlePasswordChanges}
                                />
                                <Tooltip
                                    title={<div><b>Minimun:</b> 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol</div>}
                                >
                                    <Button style={{ marginLeft: 10 }} shape='circle'>
                                        <InfoCircleOutlined />
                                    </Button>
                                </Tooltip>

                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Input.Password
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    status={confirmPasswordError ? 'error' : ''}
                                    onChange={handleConfirmPasswordChanges}
                                />
                            </Col>
                        </Row>
                        <div className='d-flex justify-content-center' style={{ marginTop: 16 }}>
                            <Select
                                showSearch
                                placeholder="Select a country"
                                optionFilterProp="label"
                                onChange={handleCountryChange}
                                options={countrySorted}
                                className='w-50'
                                status={countryError ? 'error' : ''}
                            />
                        </div>
                        <div className='d-flex justify-content-center' style={{ marginTop: 16 }}>
                            <Button
                                type="primary"
                                className='w-50'
                                block
                                loading={loading}
                                onClick={registerSubmit}
                            >
                                Create Account
                            </Button>
                        </div>
                        <Divider />
                        <div className='d-flex justify-content-center'>
                            <p>Do you have an account?</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Button
                                type="default"
                                block
                                onClick={() => navigate('/login')}
                                className='w-50'
                            >
                                Login to account
                            </Button>
                        </div>
                    </Card>
                </Space>
            </div>
        </>
    )
}

export default RegisterView;