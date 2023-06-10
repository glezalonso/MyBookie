import { useEffect, useState } from "react"
import { getPlayers } from "../../../models/players.models"
import { addPlayer } from "../../../models/teams.models"
import toast from 'react-hot-toast'
import { Col, Button } from "react-bootstrap"

const GridPlayers = ({teamId , team, setLoading}) => {
    const [players, setPlayers] = useState([])
 
    useEffect(() =>{
     getPlayers()
     .then(data => {
        setLoading(true)
        setPlayers(data.data)})
    .catch(() => toast.error('failed to load players'))
    .finally(() => setLoading(false))  
    },[setLoading])
    
    
    const handleAdd = (id , playerId, player) =>{
     addPlayer(id, { playerId, player })
     .then(() => toast.success('added player successfully'))
     .catch(() => toast.error('failed to add player'))
     .finally(() => setLoading(true))
       
    }

    const playerBySport = players?.filter(player => player?.sport?._id == team?.sport?._id)
    return(
        <>
        <Col style={{border: 'solid'}}>
            <h1 className="h4">All players</h1>
            { playerBySport?.map(player => (
                <li key={player?._id}>{player?.fullName} <Button variant="primary" onClick={()=>handleAdd(teamId, player._id, player?.fullName)}>Add</Button></li>
            ))}
           
        </Col >
        </>
    )
}

export default GridPlayers