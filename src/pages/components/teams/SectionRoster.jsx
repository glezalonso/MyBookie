import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { removePlayer } from '../../../services/teams'
import toast from 'react-hot-toast'

const SectionRoster = ({ team, setLoading }) => {
  const handleRemove = (id, playerId, player) => {
    setLoading(true)
    removePlayer(id, { playerId, player })
      .then(() => toast.success('Removed player successfully'))
      .catch(() => toast.error('Failed player remove'))
      .finally(() => setLoading(false))
  }

  return (
        <>
            <h4 className="h4">Roster</h4>
            <Table responsive variant="dark" hover striped>
                <thead>
                    <tr>
                    <th>Player</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

            {(team?.players?.length > 0)
              ? team?.players?.map(player => (
                 <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemove(team?._id, player?.playerId, player?.player)} >Remove</Button></td></tr>
              ))
              : <tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}

             </tbody>
             </Table>
        </>
  )
}
export default SectionRoster
