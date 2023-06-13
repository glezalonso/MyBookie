import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { getSeason } from "../models/seasons.models"
import toast, {Toaster} from 'react-hot-toast'
import { Spinner, Container} from "react-bootstrap"
import Navigate from "./components/static/Navigate"

import SeasonRounds from "./components/seasons/SeasonRounds"

const SeasonDetail = () => {
    const { seasonId, sportId, leagueId, roundId } = useParams()
    const [ season, setSeason ] = useState([])
    const [ loading, setLoading ]= useState(false)
   

    useEffect(() => {
        getSeason(seasonId)
        .then(data=> {
            setLoading(true)
            setSeason(data.data)})
        .catch(() => toast.error('Failed to load season'))
        .finally(() => setLoading(false))
        
    },[seasonId, loading])

    if(loading) return <Spinner animation="border" />
   
    return(
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container  fluid className="bg-dark text-white mt-1">
        <h1 className="h1"><strong>{season?.league?.league} </strong>{season?.season}</h1>
            <SeasonRounds seasonId={seasonId} sportId={sportId} leagueId={leagueId} roundId={roundId} />
         </Container>
        </>
    )
}

export default SeasonDetail