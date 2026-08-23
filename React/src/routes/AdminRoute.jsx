import { Navigate } from "react-router-dom";


export default function AdminRoute({children}){


const user = JSON.parse(
    localStorage.getItem("user")
);



if(
!user ||
user.role?.toUpperCase() !== "ADMIN"
)
{
 return <Navigate to="/login"/>;
}



return children;


}