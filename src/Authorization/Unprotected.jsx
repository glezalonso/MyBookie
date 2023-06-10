import { Navigate, Outlet } from "react-router-dom"

const Unprotected = (props) => {
if(props.isLogged) return <Navigate to={'/home'}></Navigate>
else  return <Outlet></Outlet>
}

export default Unprotected