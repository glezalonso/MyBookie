import React, { useEffect, useState } from 'react'
import { getLeagues } from '../../../services/leagues'
import TableLeagues from '../leagues/TableLeagues'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'

const SportLeagues = ({ sportId, setLoading }) => {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    getLeagues()
      .then(data => setLeagues(data.data))
      .catch(() => toast.error('Failed to load leagues'))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
            <Col>
            <h3 className="h3">Leagues</h3>
            <TableLeagues leagues={leagues} sportId={sportId} setLoading={setLoading} />
            </Col>
          </Row>
       </Container>
        </>
  )
}

export default SportLeagues
