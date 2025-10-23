
import jwtAxios from "../utils/jwtUtils";

export const API_SERVER_HOST = "http://localhost:9000";

const prefix = `${API_SERVER_HOST}/api/v1`;

console.log('prefix : ', prefix);

export const getItems = async () => {

    const res = await jwtAxios.get(`${prefix}/items`);

    console.log("res", res);

    return res;

}