import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'

const TeamSettings = ({ match, handleRemoveLineUp, type }) => {
  return (
        <>
        {(type === 'local')
          ? <Table responsive variant="dark" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {(match?.lineup?.length > 0)
                  ? match?.lineup?.map(local => local?.local?.map(player => (
                <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></td></tr>
                  )))
                  : <tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}
               </tbody>
            </Table>

          : <Table responsive variant="dark" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(match?.lineup?.length > 0)
                      ? match?.lineup?.map(away => away?.away?.map(player => (
                    <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'away')}>Remove from lineup</Button></td></tr>

                      )))
                      : <tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}
              </tbody>
                </Table>

}
        </>
  )
}
export default TeamSettings
