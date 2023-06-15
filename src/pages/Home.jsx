import React, { useEffect, useState } from 'react'
import Navigate from './components/static/Navigate'
import { getMatches } from '../models/matches.models'
import { toast } from 'react-hot-toast'
import { Alert, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import formatedDate from '../utils/formatedDate'

const Home = () => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getMatches()
      .then(data => setMatches(data.data))
      .catch(() => toast.error('Failed to load matches'))
      .finally()
  }, [])

  const date = formatedDate()
  const matchesToday = matches?.filter(match => match?.date?.split('T')[0] === date)

  return (
        <>
        <Navigate></Navigate>
        <Container fluid className="bg-dark text-white mt-1 mb-2">
        <h3 className="h3">Matches Today</h3>
          {(matchesToday.length > 0)
            ? <Table responsive variant="dark" striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>League</th>
                <th>Season</th>
                <th>Round</th>
                <th>Match</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {matchesToday?.map(match => (
                <tr key={match?._id}><td>{match?.date}</td><td>{match?.league?.league}</td><td>{match?.season?.season}</td><td>{match?.round?.round}</td><td>{match?.local.name} vs {match?.away?.name}</td><td>{(match?.status) ? <span>Abierto</span> : <span>Cerrado</span>}</td><td><Link className='btn btn-info' to={`/sports/${match?.sport?._id}/leagues/${match?.league?._id}/seasons/${match?.season?._id}/rounds/${match?.round?._id}/matches/${match?._id}`}>Details</Link></td></tr>
              ))}
            </tbody>
          </Table>
            : <Alert variant="info">There is no information to show!</Alert>}
        </Container>
        </>
  )
}

export default Home
