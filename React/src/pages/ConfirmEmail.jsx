import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/api";

export default function ConfirmEmail(){

const [params] = useSearchParams();
const [message,setMessage]=useState("جاري التأكيد...");


useEffect(()=>{

confirm();

},[]);


const confirm = async()=>{

try{

const userId=params.get("userId");
const token=params.get("token");


console.log("USER ID:", userId);
console.log("TOKEN:", token);


const res = await API.get(
`/auth/confirm-email?userId=${userId}&token=${encodeURIComponent(token)}`
);


setMessage(res.data);

}
catch(err){

console.log(err.response?.data || err);

setMessage("حدث خطأ أثناء تأكيد البريد");

}

};


return(

<div>

<h1>
{message}
</h1>

</div>

)

}