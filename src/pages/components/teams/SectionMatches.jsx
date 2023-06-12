import { useEffect, useState } from "react"
import { getMatches } from '../../../models/matches.models'
import { toast } from "react-hot-toast"
import { Alert, Table} from 'react-bootstrap'

const SectionMatches = ({teamId, setLoading}) => {
    const [ matches ,setMatches] = useState([])

    useEffect(()=> {
        getMatches()
        .then(data => {
            setLoading(true)
            setMatches(data.data)} )
        .catch(() => toast.error('Failed to upload matches'))
        .finally(() => setLoading(false))
    },[setLoading])

    const filterMatches = matches.filter( match => match?.local?._id == teamId || match?.away?._id == teamId)
  
    return( 
        <>
        <div style={{border : "solid"}}>
        <h4>Matches</h4> 
            <Table responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Round</th>
                    <th>Status</th>
                    <th>Teams</th>
                    
                </tr>
            </thead>
            <tbody>
            {filterMatches?.map(match => (
            <tr key={match._id} >
             <td>{match?.date?.split('T')[0]}</td>
             <td>{match?.round?.round}</td>
             <td>{(match?.status) ? 'Abierto' : 'Cerrado'}</td>
             <td>{match?.local?.name} <strong> {match?.score?.map(score => score.local)}</strong> vs {match.away.name} <strong> {match?.score?.map(score => score.local)}</strong></td>
            </tr>
            ))}
             </tbody>
            </Table>
         
        </div>
        
        </>
    )
}

export default SectionMatches