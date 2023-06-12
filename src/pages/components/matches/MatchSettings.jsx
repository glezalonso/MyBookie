import {  Button, Col } from "react-bootstrap"

const MatchSettings = ({team, match , handleRemoveLineUp , handleAddLineUp}) => {

    return (
        <>
            <Col>
           <div> 
            <h3 className="h3">{team?.away?.name} <strong>{team?.away?.stadium}</strong> <span>{match?.score[0]?.away}</span></h3>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Lineup</h6>
                {match?.lineup?.map(away => away?.away?.map(player => (
                    <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'away')}>Remove from lineup</Button></li>

                )))}
            </div>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Roaster</h6>
                {team?.away?.players?.map(player => (
                    <li key={player.playerId}>{player.player}<Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, 'away')}>Add to lineup</Button></li>
                ))}
            </div>

           </div>
            </Col>
            <Col>
            <div>
            <h3 className="h3">{team?.local?.name} <strong>{team?.local?.stadium}</strong> <span>{match?.score[0]?.local}</span></h3>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Lineup</h6>
                {match?.lineup?.map(local => local?.local?.map(player => (
                <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></li>

                )))}
            </div>
            <div style={{ border: 'solid'}}> 
                <h6 className="h6">Plantilla</h6>
                {team?.local?.players?.map(player => (
                    <li key={player.playerId}>{player.player}<Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, 'local')}>Agregar</Button></li>
                ))}
            </div>
            
            </div>
            </Col>
            
        </>
    )
}

export default MatchSettings