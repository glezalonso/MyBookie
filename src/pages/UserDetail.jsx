import { useEffect, useState } from "react"
import {getUser} from '../models/users.models'
import { toast, Toaster } from "react-hot-toast"
import { Spinner } from "react-bootstrap"
import Navigate from "./components/static/Navigate"


const UserDetail = () => {
    const [ user , setUser ]= useState([])
    const [ loading, setLoading]= useState(false)

    useEffect(() => {
        getUser
        .then(data => {
            setLoading(true)
            setUser(data.data)
        })
        .catch(() => toast.error('Failed to load users'))
        .finally(() => setLoading(false))
    },[])

    if(loading) return <Spinner animation="border" />
   
    return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <h2 className="h2">{user?.fullName}</h2>
        
        </>
    )
}

export default UserDetail