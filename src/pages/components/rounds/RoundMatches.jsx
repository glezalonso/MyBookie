import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import { getMatches } from '../../../services/matches'
import TableMatches from '../matches/TableMatches'

const RoundMatches = ({ sportId, leagueId, seasonId, roundId, setLoading }) => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getMatches()
      .then(data => setMatches(data.data))
      .catch(() => toast.error('Failed to load matches'))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
            <Row>
              <Col>
              <TableMatches matches={matches} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId} setLoading={setLoading} />
              </Col>
            </Row>
        </Container>
        </>
  )
}

export default RoundMatches
