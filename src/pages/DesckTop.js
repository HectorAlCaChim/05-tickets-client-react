import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import {useHideMenu } from '../hooks/useHideMenu'
import { Navigate, useNavigate } from "react-router-dom";
const {Title, Text } = Typography;
export const DesckTop = () => {
    useHideMenu(false);
    let navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const [ usuario] = useState(getUsuarioStorage());
    const [ ticket, setTicket] = useState(null);

    const salir = () => {
        localStorage.clear();
        navigate("/GetIn", { replace: true });
    }
    const nextTicket = () => {
        socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
            console.log(ticket)
            setTicket(ticket)
        });
    }
    if ( !usuario.agente || !usuario.escritorio) {
        return <Navigate to="/GetIn" replace={true} />
    }
    return(
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agente}</Title>
                    <Text>Ustede esta trabajando en el escritorio:</Text>
                    <Text type="success">{usuario.escritorio}</Text>
                </Col>
                <Col span={4} align="right">
                    <Button shape="round"
                        type="danger"
                        onClick={salir}>
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>
            <Divider />
            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Esta Atendiendo el ticket numero:</Text>
                            <Text 
                                style={{fontSize: 30 }}
                                type="danger">{ticket.numero}</Text>
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col offset={18} span={6} align="right">
                    <Button
                    shape="round"
                    type="primary"
                    onClick={nextTicket}>
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </>
    )
}