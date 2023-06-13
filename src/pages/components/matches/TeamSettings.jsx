import { Button } from "react-bootstrap"

const TeamSettings = ({match, handleRemoveLineUp, type}) => {
    return (
        <>
        {(type === 'local')
         ?
            <div>
                <h6 className="h6">{match?.local?.name}</h6>
                <div style={{ border: 'solid'}}>
                <h7 className="h7">Lineup</h7>
                {match?.lineup?.map(local => local?.local?.map(player => (
                <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></li>
                )))}
                </div>
            </div>

            :
            <div>
                <h6 className="h6">{match?.away?.name}</h6>
                <div style={{ border: 'solid'}}>
                    <h7 className="h7">Lineup</h7>
                    {match?.lineup?.map(away => away?.away?.map(player => (
                    <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'away')}>Remove from lineup</Button></li>

                    )))}
                </div>
            </div>
             
}
        </>
    )
}
export default TeamSettings