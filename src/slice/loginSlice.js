import { bindActionCreators, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookies, removeCookie, getCookies } from "../utils/cookieUtil";
import { postLogin } from "../api/memberApi";

const initialState = {
    email : ''
}

const loadMemberCookie = () =>{
    const member = getCookies("member");

    return member;
}

// 비동기 액션 생성 함수
export const postLoginAsync = createAsyncThunk("loginSlice/postLoginAsync",
    // 비동기 작업을 처리하는 로직
    async (loginParams) => {
        const res = await postLogin(loginParams);
        console.log('res : ', res);
        return res;   // Promise 객체
    }

);


const loginSlice = createSlice({

    name: 'loginSlice',
    initialState: loadMemberCookie() || initialState,
    reducers: {
        login: (state, action) => {
            console.log('----------------- call login reducer');
            console.log("action : ", action);
            console.log("action.payload : ", action.payload);
            console.log("action.email : ", action.payload);
            //쿠키에 사용자 정보를 저장한다.
            setCookies("member", JSON.stringify(action.payload), 1);
            //email 상태를 업데이트한다.
            // email = action.payload.email; 상태 정보는 불변
            return { email: action.payload.email }
        },
        logout: (state, action) => {
            console.log('---------------- call logout reducer');
            console.log("action : ", action);
            //쿠키에 사용자 정보를 삭제한다.
            removeCookie("member");

            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLoginAsync.pending, (state, action) => {
            console.log('call pending');
            console.log("action : ", action);
        })
            .addCase(postLoginAsync.fulfilled, (state, action) => {
                console.log('call fulfilled');
                console.log("action : ", action);
                console.log('action.payload : ', action.payload);   // API 서버 응답 데이터
                if (!action.payload.error) {
                    setCookies('member', action.payload, 1);
                }
                return action.payload; // 리덕스 스토어에 있는 email 상태가 업데이트 된다.

            })
            .addCase(postLoginAsync.rejected, (state, action) => {
                console.log('call rejected');
                console.log("action : ", action);
            })
    }
});


export const {login, logout} = loginSlice.actions; // 액션 생성자 함수 



export default loginSlice.reducer; // 리듀서