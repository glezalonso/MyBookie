import { useEffect, useState } from "react"
import Navigate from "./components/static/Navigate"
import { getTeams } from '../models/teams.models'
import { toast, Toaster } from "react-hot-toast"
import { Alert, Spinner,Container } from "react-bootstrap"
import TableTeams from "./components/teams/TableTeams"

const Teams = () => {
    const [ teams, setTeams ]= useState([])
    const [ loading, setLoading]= useState(false)
   
    useEffect(() => {
        getTeams()
        .then(data=> setTeams(data.data))
        .catch(() => toast.error('Failed to load teams'))
        .finally(()=> setLoading(false))
    },[loading])

    if(loading) return <Spinner animation="border" />  

    return (
        <>
        <Navigate></Navigate>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container  fluid className="bg-dark text-white mt-1">
            <h1 className="h1">Teams</h1>
            
            {(teams?.length > 0)
            ? <TableTeams teams={teams} setLoading={setLoading}/> 
            :<Alert variant="info">There is no information to show!</Alert>}
            
       </Container>
        </>
    )
}
export default Teams