import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSport } from '../services/sports'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import SportLeagues from './components/sports/SportLeagues'

const SportDetail = () => {
  const { sportId } = useParams()
  const [sport, setSport] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSport(sportId)
      .then(data => setSport(data.data))
      .catch(() => toast.error('Failed to load sport'))
      .finally(() => setLoading(false))
  }, [sportId, loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3' >
             <header>
            <h1 className="h1">{sport?.sport}</h1>
            </header>
            <Row>
              <Col>
                <SportLeagues sportId={sportId} setLoading={setLoading} />
              </Col>
            </Row>

        </Container>
        </>
  )
}

export default SportDetail
