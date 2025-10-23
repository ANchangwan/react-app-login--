
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 생성
export const setCookies = (name, value, days) => {

    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);
    cookies.set(name, value, { expires: expires, path: '/' });

}


// 쿠키 정보 조회
export const getCookies = (name) => {
    return cookies.get(name);
}

// 쿠키 삭제 -> 로그 아웃
export const removeCookie = (name, path = '/') => {
    cookies.remove(name, { path: path });
}