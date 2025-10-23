import { getCookies, setCookies } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/memberApi";
import axios from "axios";

// JWT 인증 토큰 재발급 요청
const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST;

    const heaer = { headers: { 'Authorization': `Bearer ${accessToken}` } };

    const res = await axios.get(`${host}/api/v1/refresh?refreshToken=${refreshToken}`, heaer);

    console.log('res : ', res);

    return res.data;

}


const jwtAxios = axios.create();


const beforeReq = (config) => {

    console.log('-------------------------- beforeReq');

    const member = getCookies('member');

    console.log('member : ', member);

    if (!member) {
        console.log('Member not found');
        return Promise.reject({
            response: { data: { error: "REQUIRED_LOGIN" } }

        })
    }

    const { accessToken } = member;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config
}


const requestFail = (error) => {

    console.log('requestFail : ', error);

    return Promise.reject(error);
}

// 서버에서 응답된 데이터
const beforeRes = async (res) => {

    const data = res.data;

    if (data && data.error == "ERROR_ACCESS_TOKEN") {  // 토큰이 만료된 경우

        console.log("----------------------call beforeRes");

        const member = getCookies("member");

        console.log('old accessToken : ', member.accessToken);

        const result = await refreshJWT(member.accessToken, member.refreshJWT);

        console.log('new accessToken : ', result.accessToken);

        console.log('result : ', result);

        member.accessToken = result.accessToken;
        member.refreshToken = result.refreshToken;

        setCookies("member", JSON.stringify(member), 1); // 1일

        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);

    }

    return data;
}


const responseFail = (error) => {
    console.log('call responseFail');
    return Promise.reject(error);
}


jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;