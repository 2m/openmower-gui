import {NotificationInstance} from "antd/es/notification/interface";
import {useEffect, useState} from "react";
import {WheelTick} from "../types/ros.ts";
import {useWS} from "../hooks/useWS.ts";
import {Col, Row, Statistic} from "antd";

export function WheelTicksComponent(props: { api: NotificationInstance }) {
    const [wheelTicks, setWheelTicks] = useState<WheelTick>({})
    const ticksStream = useWS<string>(() => {
            props.api.info({
                message: "Wheel Ticks Stream closed",
            })
        }, () => {
            props.api.info({
                message: "Wheel Ticks Stream connected",
            })
        },
        (e) => {
            setWheelTicks(JSON.parse(e))
        })
    useEffect(() => {
        ticksStream.start("/api/openmower/subscribe/ticks",)
        return () => {
            ticksStream.stop()
        }
    }, []);
    return <Row gutter={[16, 16]}>
        <Col lg={8} xs={24}><Statistic title="Rear Left" value={wheelTicks?.WheelTicksRl}/></Col>
        <Col lg={8} xs={24}><Statistic title="Rear Right" value={wheelTicks?.WheelTicksRr}/></Col>
        <Col lg={8} xs={24}><Statistic title="Rear Left Direction" value={wheelTicks?.WheelDirectionRl}/></Col>
        <Col lg={8} xs={24}><Statistic title="Rear Right Direction" value={wheelTicks?.WheelDirectionRr}/></Col>
    </Row>;
}