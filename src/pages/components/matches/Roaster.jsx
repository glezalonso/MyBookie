import { Button, Table, Alert} from "react-bootstrap"
const Roaster = ( {match, roster, handleAddLineUp, type } ) => {
    return(
        <>
        <Table  responsive variant="dark" striped>
            <thead>
             <tr>
                <th>Player</th>
                <th>Action</th>
             </tr>
        </thead>
        <tbody>
                {(roster.length > 0) ? roster?.map(players=> players.players?.map(player => (
                    <tr key={player.playerId}><td>{player.player}</td><td><Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, type)}>Add to lineup</Button></td></tr>
                ))):<tr><td><Alert variant="info">There is no information to show!</Alert></td></tr>}
         </tbody>
        </Table>
        </>
    )
}

export default Roaster