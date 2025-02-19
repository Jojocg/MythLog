import axios from "axios"
import { BACK_API } from "."

export const createNewGod = async (requestBody) => {
    const newGod = await axios.post(`${BACK_API}/gods`, requestBody)
    return newGod.data
}