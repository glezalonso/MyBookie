import React, { useEffect, useState } from 'react'
import { getPlayers } from '../../../services/players'
import { addPlayer } from '../../../services/teams'
import toast from 'react-hot-toast'
import { Button, Table, Alert, FormControl } from 'react-bootstrap'

const SectionPlayers = ({ team, setLoading }) => {
  const [players, setPlayers] = useState([])
  const [dataFilter, setDataFilter] = useState('')

  useEffect(() => {
    getPlayers()
      .then(data => setPlayers(data.data))
      .catch(() => toast.error('failed to load players'))
      .finally(() => setLoading(false))
  }, [setLoading])

  const handleAdd = (id, playerId, player) => {
    setLoading(true)
    addPlayer(id, { playerId, player })
      .then(() => toast.success('added player successfully'))
      .catch(() => toast.error('failed to add player'))
      .finally(() => setLoading(false))
  }
  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const playerBySport = players?.filter(player => player?.sport?._id === team?.sport?._id)

  const filter = playerBySport.filter(player => {
    if (dataFilter) {
      return player?.fullName?.toLowerCase().includes(dataFilter.toLowerCase())
    } else {
      return player
    }
  }
  )

  return (
        <>
            <h1 className="h4 static">All players</h1>
            <FormControl placeholder='Search Player...' id='player' name='player' value={dataFilter} onChange={(event) => handleOnChange(event)} />
            <Table responsive variant="dark" hover striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
            {(filter.length > 0)
              ? filter?.map(player => (
            <tr key={player?._id}><td>{player?.fullName}</td><td> <Button variant="warning" onClick={() => handleAdd(team?._id, player?._id, player?.fullName)}>Add</Button></td></tr>
              ))
              : <tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}
            </tbody>
           </Table>
        </>
  )
}

export default SectionPlayers
