import React from 'react';
import { Card, Divider, Button, Input, Space, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userService from '../Services/userService';
import { Login } from '../Interfaces/loginInterface';

const LoginView: React.FC = () => {

  // Formulario
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  // Controlar boardeado de errores de inputs
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

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
          <Card title={<div style={{ textAlign: 'center' }}>Login</div>} style={{ width: 300 }}>
            <Input
              value={emailValue}
              onChange={handleEmailChanges}
              status={emailError ? 'error' : ''}
              placeholder="Email"
              suffix={<UserOutlined />}
            />
            <br />
            <br />
            <Input.Password
              placeholder="Password"
              value={passwordValue}
              status={passwordError ? 'error' : ''}
              onChange={handlePasswordChanges}
            />
            <br />
            <br />
            <Button type="primary" block onClick={loginSubmit}>
              Login
            </Button>
            <Divider />
            <p className='text-center'>Don't have an account?</p>
            <Button type="default" block>
              Create an account
            </Button>
          </Card>
        </Space>
      </div>
    </>
  )
};

export default LoginView;