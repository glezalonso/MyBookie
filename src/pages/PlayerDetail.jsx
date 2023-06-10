import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlayer } from "../models/players.models"
import toast, {Toaster} from 'react-hot-toast'
import { Spinner, Container } from "react-bootstrap"
import Navigate from "./components/static/Navigate"

const PlayerDetail = () => {

    const { playerId } = useParams()
    const [ player, setPlayer ] = useState([])
    const [ loading, setLoading ]= useState(false)

    useEffect(() => {
        getPlayer(playerId)
        .then(data=> {
            setLoading(true)
            setPlayer(data.data)})
        .catch(() => toast.error('Failed to load player'))
        .finally(() => setLoading(false))
        
    },[playerId, loading])

    if(loading) return <Spinner animation="border" />

    return(
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container>
            <h1 className="h1">{player?.fullName}</h1>
         </Container>
        </>
    )
}

export default PlayerDetail