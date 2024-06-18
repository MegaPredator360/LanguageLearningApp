import React from 'react';
import { Card, Divider, Button, Input, Space, Flex, Checkbox, Form} from 'antd';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-utilities.css';
import { UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';  
import userService from '../Services/userService';
import { Login } from '../Interfaces/loginInterface';



const LoginView: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const handleEmailChanges =(e: any)=>{
    setInputValue(e.target.value);
  }

  const handlePasswordChanges =(e: any)=>{
    setPasswordValue(e.target.value);
  }

  const loginSubmit = async()=>{
    const login: Login = {
      email: inputValue,
      password: passwordValue
    }
    await userService.Login(login).then(data => {
      if(data.status){
        console.log(data.value);
      }
      else{
        console.error(data.msg);
      }
    });
  }
 
  return(    
  <div className='d-flex justify-content-center align-items-center vh-100'>
    <Space direction="vertical" size={16}>
    <Card title={<div style={{textAlign:'center'}}>Login</div>} style={{ width: 300}}>
     
    <Input value={inputValue} onChange={handleEmailChanges} placeholder="Email" suffix={<UserOutlined />} />
    <br />
    <br />
    <Input.Password placeholder="Password" value={passwordValue} onChange={handlePasswordChanges} />
    <br />
    <br />
    <Button type="primary" block onClick={loginSubmit}>
      Login
    </Button>
    </Card>
  </Space>
  </div>)
};

export default LoginView;