/*
 * @Author: DaZheng
 * @Date: 2020-12-03 22:57:43
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-05 22:48:32
 * @Description: file content
 */
import React, { useState, useEffect, useReducer } from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'

import servicePath from '../config/apiUrl'
const { Option } = Select
const { TextArea } = Input

function AddArticle (props) {

  // eslint-disable-next-line
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  // eslint-disable-next-line
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  // eslint-disable-next-line
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  // eslint-disable-next-line
  const [showDate,setShowDate] = useState()   //发布日期
  // eslint-disable-next-line
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  // eslint-disable-next-line
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  // eslint-disable-next-line
  const [selectedType,setSelectType] = useState('选择类型') //选择的文章类别

  useEffect( () => {
    getTypeInfo()
    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, [])

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data == '没有登录') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      }
    ) 
  }

  const selectTypeHandler = (value) => {
    console.log('选择的值---->', value)
    setSelectType(parseInt(value) + 1 + '')
  }

  const saveArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('文章简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    } else if (selectedType === '选择类型') {
      message.error('请选择类型')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-', '/')
    dataProps.addTime = (new Date(dateText).getTime() / 1000)

    if (articleId == 0) {
      dataProps.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.insertId)
          if (res.data.isSuccess) {
            message.success('文章添加成功')
          } else {
            message.success('文章添加失败')
          }
        }
      )
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.isSuccess) {
            message.success('文章修改成功')
          } else {
            message.error('修改失败')
          }
        }
      )
    }
  }

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true
    }).then(
      res => {
        let articleInfo = res.data.data[0]
        console.log('获取的文章数据---->', articleInfo)
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.article_content)
        let html = marked(articleInfo.article_content)
        setMarkdownContent(html)
        setIntroducemd(articleInfo.introduce)
        let tmpInt = marked(articleInfo.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(articleInfo.addTime)
        setSelectType(articleInfo.typeId)
      }
    )
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span="20">
              <Input 
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={e => setArticleTitle(e.target.value)}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea 
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{__html: markdownContent}}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span="24">
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br/>
            </Col>
            <Col span="24">
              <br/>
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              ></TextArea>
              <br/><br/>
              <div className="introduce-html"
                dangerouslySetInnerHTML = {{__html: '文章简介：' + introducehtml}}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle