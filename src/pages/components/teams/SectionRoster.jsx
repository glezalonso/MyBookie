import { Col, Alert, Button } from "react-bootstrap"
import { removePlayer } from "../../../models/teams.models"
import toast from 'react-hot-toast'
const SectionRoster = ({team, setLoading }) => {

     const handleRemove = (id, playerId, player) => {
       removePlayer(id, { playerId, player })
       .then(()=> toast.success('Removed player successfully'))
       .catch(() => toast.error('Failed player remove'))
       .finally(() => setLoading(true))
       }
      
    return (
        <>
         <Col style={{border: 'solid'}} >
            <h4 className="h4">Roster</h4>
            <ul>
            {(team?.players?.length > 0 ) ? team?.players?.map(player => (
                 <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemove(team?._id, player?.playerId, player?.player)} >Remove</Button></li>
             )):<Alert variant="info">There is no information to show!</Alert>}
             </ul>
            </Col>
        </>
    )
}
export default SectionRoster