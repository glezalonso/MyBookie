import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRound } from '../services/rounds'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Col, Row } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import RoundMatches from './components/rounds/RoundMatches'

const RoundDetail = () => {
  const { roundId, sportId, leagueId, seasonId } = useParams()
  const [round, setRound] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRound(roundId)
      .then(data => setRound(data.data))
      .catch(() => toast.error('Failed to load round'))
      .finally(() => setLoading(false))
  }, [roundId, loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
        <h2 className="h2">{round?.season?.season}<strong> / {round?.round} </strong></h2>
        <Row>
          <Col>
            <RoundMatches sportId={sportId} leagueId={leagueId} seasonId={seasonId} round={round} roundId={roundId} setLoading={setLoading}/>
          </Col>
        </Row>
        </Container>
        </>
  )
}

export default RoundDetail
