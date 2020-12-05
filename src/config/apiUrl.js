/*
 * @Author: DaZheng
 * @Date: 2020-12-04 14:41:55
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-05 12:01:19
 * @Description: file content
 */
//  let ipUrl = 'http://127.0.0.1:7001/admin/'
let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', //检查用户名密码
  getTypeInfo: ipUrl + 'getTypeInfo', //获得文章类别信息
  addArticle: ipUrl + 'addArticle', //添加文章
  updateArticle: ipUrl + 'updateArticle', //修改文章
  getArticleList: ipUrl + 'getArticleList', //获取文章列表
  delArticle: ipUrl + 'delArticle/' //删除文章
}

export default servicePath
