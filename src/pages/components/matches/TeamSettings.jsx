import { Button } from "react-bootstrap"

const TeamSettings = ({match, handleRemoveLineUp, type}) => {
    return (
        <>
        {(type === 'local')
         ?
            <div>
                <h3 className="h3">{match?.local?.name} <strong>{match?.local?.stadium}</strong> <span>{match?.score?.local}</span></h3>
                <div style={{ border: 'solid'}}>
                <h6 className="h6">Lineup</h6>
                {match?.lineup?.map(local => local?.local?.map(player => (
                <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></li>
                )))}
                </div>
            </div>

            :
            <div>
                <h3 className="h3">{match?.away?.name} <strong>{match?.away?.stadium}</strong> <span>{match?.score?.away}</span></h3>
                <div style={{ border: 'solid'}}>
                    <h6 className="h6">Lineup</h6>
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