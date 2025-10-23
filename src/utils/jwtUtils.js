import { getCookies, setCookies } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/memberApi";
import axios from "axios";

const jwtAxios = axios.create();

/// jwt 인증 토큰 재발급 요청
const refreshJWT = async (accessToken, refreshToken) =>{

    const host = API_SERVER_HOST;
    const bearer = { headers: { Authorization: `Bearer ${accessToken}` } };

    const res = await axios.get(`${host}/api/v1/refresh?refreshToken=${refreshJWT}`, bearer);

    return res;

}


//인증 정보 쿠키에서 가져오기
const beforeReq = (config) =>{

    const member = getCookies('member');

    console.log('member : ', member);

    if(!member){
        console.log('Member not found');
    
        return Promise.reject({
            response: {data: {error : "REQUIRED_LOGIN"}}
        })
      
    }

    const { accessToken } = member;

    config.headers.Authorization = `Bearer ${accessToken}`;

    console.log("config.header :",config.headers);

    return config;

}

// pending,reject, fullfile
// 요청 처리 catch 할 때 용도


const requestFail = (error) =>{
    console.log('requestFail : ', error);
    // 에러를 잡아서 처리
    return Promise.reject(error);
}

const beforeRes = async (res) =>{
    console.log('------------------------------------------ beforeRes.res : ', res);

    const data = res.data;

    if(data || data.error == "ERROR_ACCESS_TOKEN"){ // 토큰이 만료된 경우
        const member = getCookies("member");
        const result = await refreshJWT(member.accessToken, member.refreshJWT);

        console.log("result : ", result);
        //토큰 실패시 재 발급 요청
        member.accessToken = result.accessToken;
        member.refreshToken = result.refreshToken;

        setCookies("member", JSON.stringify(member), 1);

        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return await axios(originalRequest);
    }
}

const responseFail = (error) =>{
    console.log('call responseFail');
    return Promise.reject(error);
}



jwtAxios.interceptors.request.use(beforeReq, requestFail);

export default jwtAxios;