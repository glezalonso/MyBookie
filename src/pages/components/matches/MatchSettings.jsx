import {  Button, Col } from "react-bootstrap"
import { getTeams}  from '../../../models/teams.models'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const MatchSettings = ({ match , handleRemoveLineUp , handleAddLineUp, setLoading}) => {
    const [ teams, setTeams ] = useState([])

    useEffect(() => {
        getTeams()
        .then(data => {
            setLoading(true)
            setTeams(data.data)})
        .catch(() => toast.error(' Failed to load teams'))
        .finally(() => setLoading(false))

    },[setLoading])
    
    const rostLocal = teams?.filter(team => team._id == match?.local?._id)
    const rostAway = teams?.filter(team => team._id == match?.away?._id)
    rostAway?.map(ejercicio => console.log(ejercicio))
    return (
        <>
            <Col>
           <div> 
            <h3 className="h3">{match?.away?.name} <strong>{match?.away?.stadium}</strong> <span>{match?.score?.away}</span></h3>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Lineup</h6>
                {match?.lineup?.map(away => away?.away?.map(player => (
                    <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'away')}>Remove from lineup</Button></li>

                )))}
            </div>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Roster</h6>
                {rostAway?.map(players=> players.players?.map(player => (
                    <li key={player.playerId}>{player.player}<Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, 'away')}>Add to lineup</Button></li>
                )))}
            </div>

           </div>
            </Col>
            <Col>
            <div>
            <h3 className="h3">{match?.local?.name} <strong>{match?.local?.stadium}</strong> <span>{match?.score?.local}</span></h3>
            <div style={{ border: 'solid'}}>
                <h6 className="h6">Lineup</h6>
                {match?.lineup?.map(local => local?.local?.map(player => (
                <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></li>

                )))}
            </div>
            <div style={{ border: 'solid'}}> 
                <h6 className="h6">Roster</h6>
                {rostLocal?.map(players =>  players?.players?.map(player => (
                    <li key={player.playerId}>{player.player}<Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, 'local')}>Agregar</Button></li>
                )))}
            </div>
            
            </div>
            </Col>
            
        </>
    )
}

export default MatchSettings