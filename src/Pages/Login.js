/*
 * @Author: DaZheng
 * @Date: 2020-12-03 21:02:06
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-04 15:43:18
 * @Description: file content
 */
import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'

import axios from 'axios'
import servicePath from '../config/apiUrl'

import '../static/css/Login.css';

import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';

function Login (props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {}, [])

  const checkLogin = () => {
    setIsLoading(true)
    if (!userName) {
      message.error('用户名不能为空')
      return false
    } else if (!password) {
      message.error('密码不能为空')
      return false
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true //前后端共享session
    }).then(
      res => {
        setIsLoading(false)
        if (res.data.data === '登陆成功') {
          localStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    )
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