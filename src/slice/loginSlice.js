import { createSlice } from "@reduxjs/toolkit";
import { setCookies } from "../utils/cookieUtil";

const initialState = {
    email : ''
}


const loginSlice = createSlice({

    name : "loginSlice", //slice 이름(디버깅 시 구분용)
    initialState: initialState, // 초기 상태
    reducers:{
        login: (state, action) =>{
            console.log('------------------------------- call login reducer');
            console.log("action : ", action);
            console.log("action.payload : ", action.payload);
            console.log("action.email : ", action.payload.email);
            // 쿠키에 사용자 정보를 저장한다.
            setCookies("member", JSON.stringify(action.payload), 1);
            //email 상태를 업데이트한다.
            // email = action.payload.email 상태 정보는 불변
            return {email: action.payload.email};
        }
    }
});

export const {login} = loginSlice.actions; // 액션 생성자 함수


export default loginSlice.reducer; // 리듀서