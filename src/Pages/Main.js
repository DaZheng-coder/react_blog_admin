/*
 * @Author: DaZheng
 * @Date: 2020-12-03 21:02:11
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-03 21:31:39
 * @Description: file content
 */
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'

function Main() {
  return (
    <Router>
       <Route path="/login/" exact component={Login} />
    </Router>
  )
}

export default Main