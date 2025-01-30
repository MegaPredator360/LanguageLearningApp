import { Button, Card, Col, DatePicker, Divider, Input, Row, Select, Tooltip, Popconfirm } from "antd";
import {
    UserOutlined,
    MailOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    LockOutlined,
    DeleteOutlined,
    SendOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from '../../components/notification-component';
import { User } from "../../interfaces/user-interface";
import dayjs from 'dayjs';
import userService from "../../services/user-service";
import utilityService from "../../services/utility-service";

// Importacion de lista de paises
import countryList from '../../assets/json/data/country-list.json'

function AccountSettingsView() {

    // Navegador de paginas
    const navigate = useNavigate()

    // Otros datos de usuario
    const [id, setId] = useState(0);
    const [active, setActive] = useState(true);
    const [role, setRole] = useState(0);

    // Formulario
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState<dayjs.Dayjs | null>(null)
    const [country, setCountry] = useState<string | null>(null)

    // Controlar boardeado de errores de inputs
    const [fullNameError, setFullNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    // Notificacion
    const { showNotification } = useNotification();
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

    const handleBirthDateChanges = (date: dayjs.Dayjs | null) => {
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

        if (birthDate == null) {
            setBirthDateError(true)
            emptyInput = true
        }

        if (country == '') {
            setCountryError(true)
            emptyInput = true
        }

        return emptyInput
    }

    const deleteAccount = async () => {

        await userService.Delete()
            .then(data => {
                if (data.status) {
                    showNotification('success', 'Success', 'The account has been deleted successfully!');

                    window.location.reload();
                }
                else {
                    // Notificacion
                    showNotification('error', 'Error', data.msg);

                    // Desactivar animacion
                    setLoading(false)
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', "An error ocurred when deleting the user");
                console.error(error);

                // Desactivar animacion
                setLoading(false)
            })
    }

    const updateAccount = async () => {

        // Se valida formulario
        if (validateForm()) {

            // Notificacion
            showNotification('error', 'Error', "There is one or more fields empty");

            return
        }

        // Se valida que el correo sea valido
        if (!utilityService.verificarCorreo(email)) {

            // Activar error en correo
            setEmailError(true)

            // Notificacion
            showNotification('error', 'Error', "The entered email is not valid");

            return
        }

        // Se verifica si la contraseña va a ser actualizada
        if (password != "") {

            // Se valida que la contraseña cumpla con los requisitos
            if (!utilityService.verificarContrasena(password)) {

                // Activar error en contraseña
                setPasswordError(true)

                // Notificacion
                showNotification('error', 'Error', "The entered password does not meet the requirements");

                return
            }

            // Se valida que las contraseñas sean iguales
            if (password != confirmPassword) {

                // Activar error en contraseña
                setConfirmPasswordError(true)

                // Notificacion
                showNotification('error', 'Error', "The confirmation password does not match with the original");

                return
            }
        }

        // Se activa la animacion de carga
        setLoading(true);

        // Se crea el objeto user a actualizar
        const updateUser: User = {
            id: id,
            full_name: fullName,
            username: username,
            email: email,
            password: password,
            // Con ayuda de ?? puedo asignar un valor por defecto
            birth_date: birthDate?.format('YYYY-MM-DD') ?? '',
            country: country ?? '',
            active: active,
            role: role,
            role_name: ''
        }

        await userService.Update(updateUser)
            .then(data => {
                if (data.status) {
                    showNotification('success', 'Success', 'The information has been updated successfully!');

                    navigate('/user/profile');
                }
                else {
                    // Notificacion
                    showNotification('error', 'Error', data.msg);

                    // Desactivar animacion
                    setLoading(false)
                }
            })
            .catch(error => {
                // Notificacion
                showNotification('error', 'Error', "An error ocurred when updating user");
                console.error(error);

                // Desactivar animacion
                setLoading(false)
            })

    }

    // Verificar si hay una sesion iniciada
    const verifyLoggedUser = async () => {

        // Se realiza peticion a la API para verificar la sesion
        await userService.Logged()
            .then(data => {
                if (data.status) {
                    // Se verifica si hay sesion
                    if (data.value == null) {
                        // Redirigir a la pagina principal
                        navigate('/')

                        // Notificacion
                        showNotification('error', 'Error', "You must be logged in to access the page!!");
                    }
                    else {
                        // Se asigna la respuesta al objeto
                        const user: User = data.value;

                        // Se asignan los datos al formulario
                        setUsername(user.username);
                        setFullName(user.full_name);
                        setEmail(user.email);
                        setBirthDate(dayjs(user.birth_date, 'YYYY-MM-DD'));
                        setCountry(user.country);

                        // Se asignan los datos restantes
                        setId(user.id);
                        setActive(user.active);
                        setRole(user.role);
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

    // Ordena la lista por orden alfabetico
    const countrySorted = countryList.sort((a, b) => a.value.localeCompare(b.value));

    // Metodos que se inicalizan al cargar la pagina
    useEffect(() => {
        verifyLoggedUser()
    }, [])

    return (
        <div className="container">
            <Card
                title="Account Settings"
                className="w-100 mt-5"
                actions={[
                    <Popconfirm
                        title="Delete the account"
                        description="Are you sure you want to delete the account?"
                        onConfirm={deleteAccount}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger type="primary"
                            icon={<DeleteOutlined />}
                        >Delete Account</Button>
                    </Popconfirm>,
                    <Button
                        type='primary'
                        icon={<SendOutlined />}
                        onClick={updateAccount}
                        loading={loading}
                    >Update Profile</Button>
                ]}
            >
                <Row className="mb-3">
                    <Col span={12}>Username</Col>
                    <Col span={12}>
                        <Input
                            value={username}
                            status={usernameError ? 'error' : ''}
                            placeholder="Username"
                            onChange={handleUsernameChanges}
                            prefix={<UserOutlined />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Name</Col>
                    <Col span={12}>
                        <Input
                            value={fullName}
                            status={fullNameError ? 'error' : ''}
                            placeholder="Name"
                            onChange={handleFullNameChanges}
                            prefix={<UserOutlined />}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={12}>Email</Col>
                    <Col span={12}>
                        <Input
                            value={email}
                            status={emailError ? 'error' : ''}
                            placeholder="Email"
                            onChange={handleEmailChanges}
                            prefix={<MailOutlined />}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row className="mb-3">
                    <Col span={12}>Password</Col>
                    <Col span={12} className="d-flex">
                        <Input.Password
                            value={password}
                            status={passwordError ? 'error' : ''}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<LockOutlined />}
                            onChange={handlePasswordChanges}
                        />
                        <Tooltip
                            title={
                                <div>
                                    <b>Minimun:</b> 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol
                                </div>
                            }
                        >
                            <Button style={{ marginLeft: 10 }} shape='circle'>
                                <InfoCircleOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Verify Password</Col>
                    <Col span={12}>
                        <Input.Password
                            value={confirmPassword}
                            status={confirmPasswordError ? 'error' : ''}
                            placeholder="Confirm Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<LockOutlined />}
                            onChange={handleConfirmPasswordChanges}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row className="mb-3">
                    <Col span={12}>Birth Date</Col>
                    <Col span={12}>
                        <DatePicker
                            // Validacion para dato nulo
                            value={birthDate && birthDate.isValid() ? birthDate : null}
                            status={birthDateError ? 'error' : ''}
                            className="w-100"
                            onChange={handleBirthDateChanges}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col span={12}>Country</Col>
                    <Col span={12}>
                        <Select
                            showSearch
                            placeholder="Select a country"
                            optionFilterProp="label"
                            onChange={handleCountryChange}
                            options={countrySorted}
                            className='w-100'
                            value={country}
                            status={countryError ? 'error' : ''}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}


export default AccountSettingsView;