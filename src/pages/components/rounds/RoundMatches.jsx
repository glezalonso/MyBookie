import { useEffect, useState } from "react"
import toast, { Toaster} from "react-hot-toast"
import { Spinner, Container } from "react-bootstrap"
import { getMatches } from '../../../models/matches.models'
import TableMatches from "../matches/TableMatches"


const RoundMatches = ({ sportId, leagueId, seasonId, roundId}) => {
    const [ matches, setMatches ] = useState([])
    const [ loading, setLoading]= useState(false)
 
    useEffect(() =>{ 
        getMatches()
        .then(data=> {
            setLoading(true)
            setMatches(data.data)
        })
        .catch(()=> toast.error('Failed to load matches'))
        .finally(()=> setLoading(false) ) 
    },[loading])
   
   
    if(loading) return <Spinner animation="border" />  
    
    return(
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container  fluid className="bg-dark text-white mt-1">
            <h3 className="h3">Matches</h3>
         <TableMatches  matches={matches} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId} setLoading={setLoading} />
        </Container>
        
        </>
    )
} 

export default RoundMatches
