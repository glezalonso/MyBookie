import React, { useEffect, useState } from 'react'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import { getPlayers } from '../services/players'
import TablePlayers from './components/players/TablePlayers'
import Navigate from './components/static/Navigate'

const Players = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPlayers()
      .then(data => setPlayers(data.data))
      .catch(() => toast.error('Failed to load players'))
      .finally(() => setLoading(false))
  }, [loading])

  if (loading) return <Spinner animation="border" />

  return (

        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
            <Col>
            <h3 className="h3 p-2">Players</h3>
            <TablePlayers players={players} setLoading={setLoading}/>
            </Col>
            </Row>
        </Container>
        </>
  )
}

export default Players
