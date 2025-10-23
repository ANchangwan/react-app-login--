
import { Cookies } from "react-cookie";

const cookie = new Cookies();

// 쿠키 생성
export const setCookies = (name, value, days) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  cookie.set(name, value, { expires, path: "/" });
};


// 쿠키 정보 조회
export const getCookies = (name) =>{
    return cookie.get(name);
}

// 쿠키 삭제 -> 로그 아웃
export const removeCookie = (name, path = '/') => {
  cookie.remove(name, { path });
};