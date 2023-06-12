import { Button } from "react-bootstrap"
const Roaster = ( {match, roster, handleAddLineUp } ) => {
    return(
        <>
         <div style={{ border: 'solid'}}>
                <h6 className="h6">Roster</h6>
                {roster?.map(players=> players.players?.map(player => (
                    <li key={player.playerId}>{player.player}<Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, 'away')}>Add to lineup</Button></li>
                )))}
            </div>
        </>
    )
}

export default Roaster