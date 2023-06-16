import React, { useEffect, useState } from 'react'
import Navigate from './components/static/Navigate'
import { getMatches } from '../services/matches'
import { toast } from 'react-hot-toast'
import { Alert, Container, Table, Row, Col } from 'react-bootstrap'
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
  console.log(matchesToday)
  return (
        <>
        <Navigate />
        <Container className='w-100 mt-3' >
          <Row>
            <Col>
        <h3 className="h3 m-2">Matches Today</h3>
          {(matchesToday.length > 0)
            ? <Table responsive variant="dark" hover striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>League</th>
                <th>Season</th>
                <th>Round</th>
                <th>Local</th>
                <th>Away</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {matchesToday?.map(match => (
                <tr key={match?._id}>
                  <td>{match?.date}</td>
                  <td>{match?.league?.league}</td>
                  <td>{match?.season?.season}</td>
                  <td>{match?.round?.round}</td>
                  <td>{match?.local.name}<strong> {match?.score?.map(score => score?.local)}</strong></td>
                  <td> {match?.away?.name}<strong> {match?.score?.map(score => score?.away)}</strong></td>
                  <td>{(match?.status) ? <span className='text-success'>Abierto</span> : <span className='text-danger'>Cerrado</span>}</td>
                  <td><Link className='btn btn-info p-2' to={`/sports/${match?.sport?._id}/leagues/${match?.league?._id}/seasons/${match?.season?._id}/rounds/${match?.round?._id}/matches/${match?._id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
            : <Alert variant="info">There is no information to show!</Alert>}
            </Col>
            </Row>
        </Container>
        </>
  )
}

export default Home
