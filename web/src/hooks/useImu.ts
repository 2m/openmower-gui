import {useEffect, useState} from "react";
import {Imu} from "../types/ros.ts";
import {useWS} from "./useWS.ts";

export const useImu = () => {
    const [imu, setImu] = useState<Imu>({})
    const imuStream = useWS<string>(() => {
            console.log({
                message: "IMU Stream closed",
            })
        }, () => {
            console.log({
                message: "IMU Stream connected",
            })
        },
        (e) => {
            setImu(JSON.parse(e))
        })
    useEffect(() => {
        imuStream.start("/api/openmower/subscribe/imu",)
        return () => {
            imuStream.stop()
        }
    }, []);
    return imu;
};