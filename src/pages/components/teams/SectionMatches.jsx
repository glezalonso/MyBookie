import React, { useEffect, useState } from 'react'
import { getMatches } from '../../../services/matches'
import { toast } from 'react-hot-toast'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SectionMatches = ({ teamId, setLoading }) => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getMatches()
      .then(data => {
        setMatches(data.data)
      })
      .catch(() => toast.error('Failed to upload matches'))
      .finally(() => setLoading(false))
  }, [setLoading])

  const filterMatches = matches?.filter(match => match?.local?._id === teamId || match?.away?._id === teamId)

  return (
        <>
        <h4>Matches</h4>
            <Table responsive variant="dark" striped border={'1'}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>League</th>
                    <th>Season</th>
                    <th>Round</th>
                    <th>Status</th>
                    <th>Teams</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
            {(filterMatches?.length > 0)
              ? filterMatches?.map(match => (
            <tr key={match._id} >
             <td>{match?.date?.split('T')[0]}</td>
             <td>{match?.league?.league}</td>
             <td>{match?.season?.season}</td>
             <td>{match?.round?.round}</td>
             <td>{(match?.status) ? 'Abierto' : 'Cerrado'}</td>
             <td>{match?.local?.name} <strong> {match?.score?.map(score => score.local)}</strong> vs {match.away.name} <strong> {match?.score?.map(score => score.local)}</strong></td>
            <td><Link className="btn btn-info" to={`/sports/${match?.sport?._id}/leagues/${match?.league?._id}/seasons/${match?.season?._id}/rounds/${match?.round?._id}/matches/${match?._id}`}>Details</Link></td>
            </tr>
              ))
              : <tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}
             </tbody>
            </Table>
        </>
  )
}

export default SectionMatches
