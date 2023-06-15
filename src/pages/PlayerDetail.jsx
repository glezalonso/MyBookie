import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlayer } from '../models/players.models'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Card } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import avatar from '../assets/team.png'

const PlayerDetail = () => {
  const { playerId } = useParams()
  const [player, setPlayer] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPlayer(playerId)
      .then(data => setPlayer(data.data))
      .catch(() => toast.error('Failed to load player'))
      .finally(() => setLoading(false))
  }, [playerId, loading])

  if (loading) return <Spinner animation="border" />

  return (
      <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container fluid className="bg-dark text-white mt-1">
          <Card className=" bg-dark text-white text-center">
            <Card.Header>Player</Card.Header>
          <center><Card.Img variant="top" style={{ width: '100px', height: '100px' }} src={player?.photo || avatar } /></center>
          <Card.Body>
            <Card.Title>{player?.fullName}</Card.Title>
              <Card.Text>
              <span><strong>Position:</strong> {player?.position} </span>
             <span><strong>Sport: </strong> {player?.sport?.sport}</span>
        </Card.Text>
         </Card.Body>

    </Card>
    </Container>
    </>
  )
}

export default PlayerDetail
