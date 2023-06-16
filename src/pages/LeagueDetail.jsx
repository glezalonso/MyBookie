import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import { getLeague } from '../services/leagues'
import Navigate from './components/static/Navigate'
import LeagueSeasons from './components/leagues/LeagueSeasons'

function LeagueDetail () {
  const { leagueId, sportId } = useParams()
  const [league, setLeague] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLeague(leagueId)
      .then((data) => setLeague(data.data))
      .catch(() => toast.error('Failed to load league'))
      .finally(() => setLoading(false))
  }, [loading, leagueId])

  if (loading) return <Spinner animation="border" />

  return (
    <>
      <Navigate />
      <Toaster position="botton-center" reverseOrder={false} />
      <Container className='w-100 mt-3'>
        <h1 className="h1">
          <strong>
            {league?.league}
          </strong>
        </h1>
        <Row>
            <Col>
              <LeagueSeasons leagueId={leagueId} sportId={sportId} setLoading={setLoading} />
            </Col>
        </Row>

      </Container>
    </>
  )
}
export default LeagueDetail
