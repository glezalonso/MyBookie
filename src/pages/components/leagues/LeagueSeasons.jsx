import React, { useEffect, useState } from 'react'
import { getSeasons } from '../../../models/seasons.models'
import toast, { Toaster } from 'react-hot-toast'
import { Container } from 'react-bootstrap'
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
        <Container fluid className="bg-dark text-white mt-1">
            <TableSeasons seasons={seasons} leagueId={leagueId} sportId={sportId} setLoading={setLoading} />
        </Container>
        </>
  )
}

export default LeagueSeasons
