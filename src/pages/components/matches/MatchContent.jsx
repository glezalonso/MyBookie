import {Row, Button, Alert} from "react-bootstrap"
import { addLineUp, removeLineUp } from "../../../models/matches.models"
import toast, { Toaster} from 'react-hot-toast'
import MatchSettings from "./MatchSettings"
import ModalScore from "./ModalScore"
import { useState } from "react"


const MatchContent = ({match, team, setLoading, roundId}) => {
    
    const [ modalShow, setModalShow ]= useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)
    
    const handleAddLineUp = (id, playerId, player, type) =>{
       
        addLineUp(id,{playerId, player, type})
        .then(() =>toast.success(`Added to lineup successfully`))
        .catch(() =>toast.error(`Failed add to lineup`))
        .finally(() =>setLoading(true))
       
    } 
 
    const handleRemoveLineUp = (id,playerId, player, lineId, type) => {
        
         removeLineUp(id, { playerId, player, lineId, type })
        .then(()=> toast.success('Removed from lineup successfully'))
        .catch(() => toast.error('Failed remove from lineup'))
        .finally(() =>setLoading(true))
    }
  
    return(
        <>
         <Toaster position="botton-center" reverseOrder={false} />
            <h3 className="h3">{match?.teams?.map(team => (
            <span key={team?._id}><strong>{team?.local?.name}</strong> vs <strong>{team?.away?.name}</strong></span>
            ))} <span> {(match?.status)?  <Alert variant="warning">Abierto</Alert>:<Alert variant="warning">Cerrado</Alert>}</span></h3>
            {(match?.status) && <Button variant='success' onClick={() => handleShow()}>Place score</Button> }
            <ModalScore modalShow={modalShow} handleClose={handleClose} matchId={match?._id} setLoading={setLoading}/>
            <Row>
            {(match?.status) && <MatchSettings team={team} match={match} handleRemoveLineUp={handleRemoveLineUp} handleAddLineUp={handleAddLineUp} roundId={roundId} setLoading={setLoading}/> }
            </Row>
        
        </>
    )
}
export default MatchContent