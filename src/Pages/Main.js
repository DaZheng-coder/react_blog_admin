/*
 * @Author: DaZheng
 * @Date: 2020-12-03 21:02:11
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-03 22:49:00
 * @Description: file content
 */
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main() {
  return (
    <Router>
       <Route path="/login/" exact component={Login} />
       <Route path="/index/" exact component={AdminIndex} />
    </Router>
  )
}

export default Main