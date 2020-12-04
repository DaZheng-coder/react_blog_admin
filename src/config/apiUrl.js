/*
 * @Author: DaZheng
 * @Date: 2020-12-04 14:41:55
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-04 19:05:02
 * @Description: file content
 */
//  let ipUrl = 'http://127.0.0.1:7001/admin/'
let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', //检查用户名密码
  getTypeInfo: ipUrl + 'getTypeInfo', //获得文章类别信息
}

export default servicePath
