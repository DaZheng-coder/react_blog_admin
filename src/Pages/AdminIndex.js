/*
 * @Author: DaZheng
 * @Date: 2020-12-03 22:34:39
 * @LastEditors: g05047
 * @LastEditTime: 2020-12-03 22:50:47
 * @Description: file content
 */
 import React, {useState} from 'react'
 import { Layout, Menu, Breadcrumb } from 'antd';
 import '../static/css/AdminIndex.css'
 import {
   DesktopOutlined,
   PieChartOutlined,
   FileOutlined,
   TeamOutlined,
   UserOutlined,
 } from '@ant-design/icons';
 
 const { Header, Content, Footer, Sider } = Layout;
 const { SubMenu } = Menu;
 
function AdminIndex () {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
            <Menu.Item key="3">添加文章</Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            郑俊钦的博客管理系统
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>zhengjunqin.top ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex