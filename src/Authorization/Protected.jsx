import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import  decode from 'jwt-decode'

const Protected = (props) => {
const token = useAuthStore(state => state.token) 
const logOut = useAuthStore(state=> state.logOut) 
 
if(!props.isLogged) {
    return <Navigate to={'/'}></Navigate>
}
else if(token && Date.now() >= decode(token).exp * 1000 ) {
    logOut()
}
else{
    return <Outlet></Outlet>
}

}

export default Protected