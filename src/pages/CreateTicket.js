import React, { useContext, useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SocketContext } from "../context/SocketContext";
import {useHideMenu } from '../hooks/useHideMenu'
const {Title, Text } = Typography;

export const CreateTicket = () => {
    useHideMenu(true);
    const [ ticket, setTicket] = useState(null);
    const { socket } = useContext(SocketContext);
    const newTicket = () => {
        socket.emit('solicitar-ticket', null, (ticket)=>{
            console.log(ticket);
            setTicket(ticket)
        });
    }
    return(
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <Title level={3}>
                        Presione el boton para un nuevo Ticket
                    </Title>
                    <Button
                    shape="round"
                    type="primary"
                    size="large"
                    onClick={newTicket}
                    icon={<DownOutlined/>}>
                        Nuevo Ticket
                    </Button>
                </Col>
            </Row>
            {
                ticket && (
                <Row style={{marginTop: 100}}>
                    <Col offset={6} span={14} align="center">
                        <Text level={2}>
                            Su  numero:
                        </Text>
                        <br/>
                        <Text type="success" style={{fontSize: 55}}>
                            {ticket.numero}
                        </Text>
                    </Col>
                </Row>
                )
            }
        </>
    )
}