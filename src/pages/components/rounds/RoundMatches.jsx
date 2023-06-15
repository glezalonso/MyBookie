import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Container } from 'react-bootstrap'
import { getMatches } from '../../../services/matches'
import TableMatches from '../matches/TableMatches'

const RoundMatches = ({ sportId, leagueId, seasonId, roundId, setLoading }) => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getMatches()
      .then(data => setMatches(data.data))
      .catch(() => toast.error('Failed to load matches'))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
        <>
        <Toaster position="botton-center" reverseOrder={false} />
        <Container fluid className="bg-dark text-white mt-1">
            <h3 className="h3">Matches</h3>
         <TableMatches matches={matches} sportId={sportId} leagueId={leagueId} seasonId={seasonId} roundId={roundId} setLoading={setLoading} />
        </Container>
        </>
  )
}

export default RoundMatches
