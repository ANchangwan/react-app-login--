import { useEffect, useState } from "react";

import { createSearchParams, useNavigate } from "react-router-dom";
import { getItems } from "../api/ItemApi";

function Item(){
    const [ items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
      getItems()
        .then((data) =>{
            console.log('data : ', data);
            setItems(data);
        })
        .catch((ex) =>{
            const errorMsg = ex.response.data.error; 
            console.log("itemjs errormsmg: ",errorMsg)
            const searchParams = createSearchParams({error : errorMsg}).toString();

            if(errorMsg === "REQUIRED_LOGIN"){
                alert("you must login");
                navigate({
                    pathname: "/login",
                    search: `?${searchParams}`,
                }); //
            }
        })  
    },[]);
    return (
        <>
            <h1>상품 목록 조회</h1>
            {
                items.map((item) =>{
                    return (<div id={item.id}>
                        <span style={{margin:"2px"}}>{item.id}</span>
                        <span style={{margin:"2px"}}>{item.name}</span>
                    </div>)
                })
            }

        </>
    )
}
export default Item;