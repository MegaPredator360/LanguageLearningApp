import React, { useState } from 'react';
import { Card, Divider, Button, Input, Space, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import userService from '../services/user-service';
import { Login } from '../interfaces/login-interface';
import { useNavigate } from 'react-router-dom';

const LoginView: React.FC = () => {

  // Navegador de paginas
  const navigate = useNavigate()

  // Formulario
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Controlar boardeado de errores de inputs
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Notificacion
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false)

  // Controlar el cambio de texto
  const handleEmailChanges = (e: any) => {
    setEmailValue(e.target.value);
    setEmailError(false)
  }

  const handlePasswordChanges = (e: any) => {
    setPasswordValue(e.target.value);
    setPasswordError(false)
  }

  // Se valida si los campos están con texto
  const validateForm = () => {

    let emptyInput: Boolean = false

    if (emailValue == '') {
      setEmailError(true)
      emptyInput = true
    }

    if (passwordValue == '') {
      setPasswordError(true)
      emptyInput = true
    }

    return emptyInput
  }

  // Submit para iniciar sesion
  const loginSubmit = async () => {

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

    // Se activa el icono de carga
    setLoading(true)

    // Se crea objeto Login
    const login: Login = {
      email: emailValue,
      password: passwordValue
    }

    // Se envia peticion
    await userService.Login(login).then(data => {
      if (data.status) {

        // Procesamiento de datos
        console.log(data.value);

        // Se desactiva el icono de carga
        setLoading(false)

        // Notificacion
        api['success']({
          message: 'Success',
          description: "You've logged in successfully!",
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

      }
    });
  }

  return (
    <>
      {contextHolder}
      <div className="topnav fixed-top">
        <div className="d-flex container">
          <button onClick={() => navigate('/home')} className="logo-text blank-button">LinguaLearn</button>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <Space direction="vertical" size={16}>
          <Card
            title="Login"
            style={{ width: 300 }}
            styles={{ header: { textAlign: 'center' } }}
          >
            <Input
              value={emailValue}
              onChange={handleEmailChanges}
              status={emailError ? 'error' : ''}
              placeholder="Email"
              suffix={<MailOutlined />}
            />
            <Input.Password
              placeholder="Password"
              value={passwordValue}
              status={passwordError ? 'error' : ''}
              onChange={handlePasswordChanges}
              style={{ marginTop: 16 }}
            />
            <Button
              type="primary"
              block
              onClick={loginSubmit}
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
            <Divider />
            <p className='text-center'>Don't have an account?</p>
            <Button
              type="default"
              block
              onClick={() => navigate('/register')}
              loading={loading}
            >
              Create an account
            </Button>
          </Card>
        </Space>
      </div>
    </>
  )
};

export default LoginView;