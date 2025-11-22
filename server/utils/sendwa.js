import axios from "axios";
import { logger } from "../configs/logger";
import { ENV } from "../configs/env";

export const sendWa = async (handhone, message) => {
    try{
        const response = await axios.post(ENV.wablas.apihost, {
            handhone, message
        }, {
            headers: {
                "Authorization": ENV.wablas.token
            }
        })
        console.log("WA SEND: " + response.data)
        return response
    }catch(error){
        logger.error(`send Wa Error: ${error.message}`)
    }
}