import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTeam } from '../services/teams'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import SectionTeam from './components/teams/SectionTeam'
import SectionRoster from './components/teams/SectionRoster'
import SectionPlayers from './components/teams/SectionPlayers'
import SectionMatches from './components/teams/SectionMatches'

const TeamDetail = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(false)
  const { teamId } = useParams()

  useEffect(() => {
    getTeam(teamId)
      .then(data => setTeam(data.data))
      .catch(() => toast.error('Failed to load team'))
      .finally(() => setLoading(false))
  }, [teamId, loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
            <Col>
             <SectionTeam team={team} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SectionMatches teamId={teamId} setLoading={setLoading}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <SectionRoster team={team} setLoading={setLoading}/>
            </Col>
            <Col>
              <SectionPlayers team={team} setLoading={setLoading} />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default TeamDetail
