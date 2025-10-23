import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slice/loginSlice';

// 스토어 구성
const store = configureStore ({
    reducer: { 
		'loginSlice': loginSlice  // 상태 관리를 위해서 리듀서를 여기에 등록한다.
    }      
});

export default store;