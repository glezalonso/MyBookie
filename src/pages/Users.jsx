import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/users'
import { toast, Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import Navigate from './components/static/Navigate'
import TableUsers from './components/Users/TableUsers'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
            <Row>
              <Col>
                <TableUsers users={users} setLoading={setLoading} />
              </Col>
            </Row>
        </Container>
        </>
  )
}

export default Users
