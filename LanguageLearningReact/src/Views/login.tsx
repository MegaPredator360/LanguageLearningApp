import React, { useState } from 'react';
import { Card, Divider, Button, Input, Space, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import userService from '../Services/user-service';
import { Login } from '../Interfaces/login-interface';
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

    // Se crea objeto Login
    const login: Login = {
      email: emailValue,
      password: passwordValue
    }

    // Se envia peticion
    await userService.Login(login).then(data => {
      if (data.status) {
        console.log(data.value);
      }
      else {
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