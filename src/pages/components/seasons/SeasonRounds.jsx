import { useEffect, useState } from "react"
import { getRounds } from "../../../models/round.models"
import { toast, Toaster } from "react-hot-toast"
import { Container } from "react-bootstrap"
import TableRounds from "../rounds/TableRounds"


const SeasonRounds = ({seasonId, sportId, leagueId, roundId, setLoading}) => {
    const [ rounds, setRounds ]= useState([])

    useEffect(()=> {
        getRounds()
        .then(data => setRounds(data.data))
        .catch(() => toast.error('Failed to load the rounds'))
        .finally(() => setLoading(false))
    },[setLoading])

    return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container  fluid className="bg-dark text-white mt-1">
            <h4 className="h4">Rounds</h4>
        <TableRounds rounds={rounds} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId} setLoading={setLoading}/>
        </Container>
        </>
    )
}
export default SeasonRounds