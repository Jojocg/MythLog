import axios from "axios"
import { BACK_API } from "."

export const removeOneGod = async (godId) => {
    const response = await axios.delete(`${BACK_API}/gods/${godId}`)
    return response.status
}