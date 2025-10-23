import { Link, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Item from './components/Item'
import Logout from './components/Logout'
import LogIn from './components/LogIn'
import './App.css'
import { useSelector } from 'react-redux';




function App() {
  // 상태 조회를 사용하기 위해서는 useSelector 사용
  const email = useSelector(state => state.loginSlice.email);

  return (
    <>
      <div>
        <Link to={'/'}>홈</Link>&nbsp;&nbsp;
        {
          email ? <span style={{margin:"5px"}}><Link to={'/item'}>상품조회</Link></span>:<></>
        } 
        {/* {
          <span style={{margin:"5px"}}><Link to={'/item'}>상품조회</Link></span>
        } */}
        {
          email ? <span><Link to="/logout">로그 아웃</Link></span> : <span><Link to="/login">로그인</Link></span>
        }
        
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}


export default App
