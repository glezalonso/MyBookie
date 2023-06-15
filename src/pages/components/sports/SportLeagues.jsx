import React, { useEffect, useState } from 'react'
import { getLeagues } from '../../../services/leagues'
import TableLeagues from '../leagues/TableLeagues'
import toast, { Toaster } from 'react-hot-toast'
import { Container } from 'react-bootstrap'

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
        <Container fluid className="bg-dark text-white mt-1">
           <h1 className="h1">Leagues</h1>
            <TableLeagues leagues={leagues} sportId={sportId} setLoading={setLoading} />
       </Container>
        </>
  )
}

export default SportLeagues
