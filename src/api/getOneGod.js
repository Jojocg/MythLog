import axios from "axios"
import { BACK_API } from "."

export const fetchOneGod = async (godId) => {
    const god = await axios.get(`${BACK_API}/gods/${godId}`)
    return god.data
}