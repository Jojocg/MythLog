import axios from "axios"
import { BACK_API } from "."

export const fetchGods = async () => {
    const gods = await axios.get(`${BACK_API}/gods`)
    return gods.data
}