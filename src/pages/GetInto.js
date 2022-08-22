import React, { useState } from "react";
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import {useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
const { Title, Text} = Typography;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 14,
    },
  };
export const GetInto = () => {
    useHideMenu(false);
    const [ usuario] = useState(getUsuarioStorage())
    let navigate = useNavigate();

    const onFinish = ({agente, escritorio}) => {
        console.log(usuario);
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);
        navigate("/Desktop", { replace: true });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if ( usuario.agente && usuario.escritorio) {
        return <Navigate to="/Desktop" replace={true} />
    }
    return(
        <>
        <Title level={2}>Ingresar</Title>
        <Text>Ingrese su Nombre y numero de escritorio</Text>
        <Divider/>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="Nombre del Agente"
                    name="agente"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese su nombre!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese su escritorio!',
                    },
                    ]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>

                <Form.Item
                    {...tailLayout}
                >
                    <Button type="primary" htmlType="submit"
                    shape="round">
                        <SaveOutlined/>
                    Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}