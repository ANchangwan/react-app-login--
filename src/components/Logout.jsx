import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout(){
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const handleClick = () =>{
        
        dispatch(logout());
        navigator("/")
    }

    return (
        <>
            <h1>로그 아웃 페이지</h1>
            <button onClick={handleClick}>로그 아웃</button>
        </>
    )
}

export default Logout;