import { useEffect, useState } from "react"
import {  Container, Spinner} from "react-bootstrap"
import toast, { Toaster } from "react-hot-toast"
import { getPlayers} from '../models/players.models'
import TablePlayers from "./components/players/TablePlayers"
import Navigate from "./components/static/Navigate"

const Players = () => {
    const [ players, setPlayers ] = useState([])
    const [ loading, setLoading]= useState(false)
   
    useEffect(() =>{
       
            getPlayers()
            .then(data => {
                setLoading(true)
                setPlayers(data.data)})
            .catch(() => toast.error('Failed to load players'))
            .finally(() => setLoading(false))
            
    },[loading])

    if(loading) return <Spinner animation="border" />

    return( 
     
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container  fluid className="bg-dark text-white mt-1">
            <h1 className="h1">Players</h1>
            <TablePlayers players={players} setLoading={setLoading}/> 
        </Container>
        </>
    )
}

export default Players