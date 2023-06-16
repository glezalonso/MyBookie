import React, { useEffect, useState } from 'react'
import { getRounds } from '../../../services/rounds'
import { toast, Toaster } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import TableRounds from '../rounds/TableRounds'

const SeasonRounds = ({ seasonId, sportId, leagueId, roundId, setLoading }) => {
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    getRounds()
      .then(data => setRounds(data.data))
      .catch(() => toast.error('Failed to load the rounds'))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
            <Col>
              <TableRounds rounds={rounds} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId} setLoading={setLoading}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}
export default SeasonRounds
