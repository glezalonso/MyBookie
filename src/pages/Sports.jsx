import React, { useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container } from 'react-bootstrap'
import { getSports } from '../models/sport.models'
import Navigate from './components/static/Navigate'
import TableSports from './components/sports/TableSports'

const Sports = () => {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSports()
      .then(data => setSports(data.data))
      .catch(() => toast.error('Failed to load sports'))
      .finally(() => setLoading(false))
  }, [loading])

  if (loading) return <Spinner animation="border" />

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container fluid className="bg-dark text-white mt-1">
            <h2 className="h2">Sport </h2>
             <TableSports sports={sports} setLoading={setLoading} />
        </Container>
        </>
  )
}

export default Sports
