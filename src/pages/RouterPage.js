import React, { useContext, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Route, Routes, } from 'react-router-dom'
import { GetInto } from './GetInto';
import { CreateTicket } from './CreateTicket';
import { Tail } from './Tail';
import { DesckTop } from './DesckTop';
import { UIContext } from '../context/UIContext';
const { Header, Sider, Content } = Layout;

export const RouterPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { ocultarMenu }= useContext(UIContext);

    return(
        <Layout style={{height: '100vh'}}>
            <Sider collapsedWidth={0} breakpoint='md' hidden={ocultarMenu} >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/GetIn">
                        Ingresar
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to="/Tail">
                        Cola de tikets
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <Link to="/Create">
                        Crear Ticket
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >
                <Routes>
                    <Route path="/GetIn" element={<GetInto/>} />
                    <Route path="/Tail" element={<Tail/>} />
                    <Route path="/Create" element={<CreateTicket/>} />
                    <Route path="/Desktop" element={<DesckTop/>} />
                </Routes>
            </Content>
        </Layout>
    </Layout>
    )
}