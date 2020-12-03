/*
 * @Author: DaZheng
 * @Date: 2020-12-03 21:02:06
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-03 22:02:43
 * @Description: file content
 */
import React, {useState} from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Icon, Button, Spin } from 'antd'

import '../static/css/Login.css';

import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';

function Login () {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="DaZheng blog System" bordered={true} style={{width: 400}}>
          <Input 
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br/><br/>
          <Input.Password 
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br/><br/>

          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login