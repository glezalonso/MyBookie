import { useParams } from "react-router-dom"
import { getMatch } from "../models/matches.models"
import { useEffect, useState } from "react"
import toast, { Toaster} from "react-hot-toast"
import { Spinner,  Container } from "react-bootstrap"
import Navigate from "./components/static/Navigate"
import MatchContent from "./components/matches/MatchContent"


const MatchDetail = () => {
    const { sportId, leagueId, seasonId, roundId, matchId } = useParams()
    const [ match , setMatch ] = useState([])
    const [ loading, setLoading ]= useState(false)
    
    useEffect(() =>{
        getMatch(matchId)
        .then(data => {
            setLoading(true)
            setMatch(data.data)})
        .catch(() => toast.error('Failed to load match'))
        .finally(() => setLoading(false))
    },[matchId, loading])

   if(loading) return <Spinner animation="border" />

    return(
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container>
               <MatchContent key={matchId} match={match}  setLoading={setLoading} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId}/>
        </Container>
        </>
    )
} 

export default MatchDetail
