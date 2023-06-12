import { useParams } from "react-router-dom"
import { getRound, } from "../models/round.models"
import { useEffect, useState } from "react"
import toast, { Toaster} from "react-hot-toast"
import { Spinner, Container } from "react-bootstrap"
import Navigate from "./components/static/Navigate"

import RoundMatches from "./components/rounds/RoundMatches"


const RoundDetail = () => {

    const { roundId, sportId, leagueId, seasonId } = useParams()
    const [ round , setRound] = useState([])
    const [ loading, setLoading ]= useState(false)
  
    useEffect(() =>{
        getRound(roundId)
        .then(data => {
            setLoading(true)
            setRound(data.data)})
        .catch(() => toast.error('Failed to load round'))
        .finally(() => setLoading(false))
    },[roundId, loading])

    if(loading) return <Spinner animation="border" />

   
    return(
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container>
        <h1 className="h1">{round?.round}<strong> {round?.league?.league}</strong></h1>
        <RoundMatches sportId={sportId} leagueId={leagueId} seasonId={seasonId} round={round} roundId={roundId} />
        </Container>
        </>
    )
} 

export default RoundDetail
