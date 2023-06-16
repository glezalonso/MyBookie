import React, { useEffect, useState } from 'react'
import { getSeasons } from '../../../services/seasons'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import TableSeasons from '../seasons/TableSeasons'

const LeagueSeasons = ({ leagueId, sportId, setLoading }) => {
  const [seasons, setSeasons] = useState([])

  useEffect(() => {
    getSeasons()
      .then(data => setSeasons(data.data))
      .catch(() => toast.error('Failed to load seasons'))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
              <Col>
              <TableSeasons seasons={seasons} leagueId={leagueId} sportId={sportId} setLoading={setLoading} />
              </Col>
          </Row>

        </Container>
        </>
  )
}

export default LeagueSeasons
