import axios from "axios"
import { BACK_API } from "."

export const updateGod = async (godId, requestBody) => {
    const updatedGod = await axios.put(`${BACK_API}/gods/${godId}`, requestBody)
    return updatedGod.data
}