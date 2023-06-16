import React, { useEffect, useState } from 'react'
import Navigate from './components/static/Navigate'
import { getTeams } from '../services/teams'
import { toast, Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import TableTeams from './components/teams/TableTeams'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTeams()
      .then(data => setTeams(data.data))
      .catch(() => toast.error('Failed to load teams'))
      .finally(() => setLoading(false))
  }, [loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate></Navigate>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className=" w-100 mt-3">
          <Row><Col>
          <h3 className="h3 p-2">Teams</h3>
              <TableTeams teams={teams} setLoading={setLoading}/>
          </Col></Row>
       </Container>
        </>
  )
}
export default Teams
