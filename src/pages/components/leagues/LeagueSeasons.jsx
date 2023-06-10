import { useEffect, useState } from "react"
import { getSeasons } from '../../../models/seasons.models'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container } from "react-bootstrap"
import TableSeasons from '../seasons/TableSeasons'

const LeagueSeasons = ({leagueId, sportId}) => {
    const [ seasons, setSeasons ] = useState([])
    const [ loading, setLoading ] = useState(false)
   
    useEffect(() => {
        getSeasons()
        .then( data => {
            setLoading(true)
            setSeasons(data.data)})
        .catch(() => toast.error('Failed to load seasons'))
        .finally(()=> setLoading(false))
    },[loading])

    if(loading) return <Spinner animation="border" />
    
    return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container>
            <h4 className="h4">Season history </h4>
            <TableSeasons  seasons={seasons} leagueId={leagueId} sportId={sportId} setLoading={setLoading}  />
        </Container>
        </>
    )
}

export default LeagueSeasons