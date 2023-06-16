import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSeason } from '../services/seasons'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import Navigate from './components/static/Navigate'

import SeasonRounds from './components/seasons/SeasonRounds'

const SeasonDetail = () => {
  const { seasonId, sportId, leagueId, roundId } = useParams()
  const [season, setSeason] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSeason(seasonId)
      .then(data => setSeason(data.data))
      .catch(() => toast.error('Failed to load season'))
      .finally(() => setLoading(false))
  }, [seasonId, loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
        <h1 className="h1"><strong>{season?.league?.league} </strong>{season?.season}</h1>
          <Row>
              <Col>
                 <SeasonRounds seasonId={seasonId} sportId={sportId} leagueId={leagueId} roundId={roundId} setLoading={setLoading} />
              </Col>
          </Row>

         </Container>
        </>
  )
}

export default SeasonDetail
