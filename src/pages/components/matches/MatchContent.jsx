import {Row , Button, Alert, Table} from "react-bootstrap"
import { addLineUp, removeLineUp } from "../../../models/matches.models"
import toast, { Toaster} from 'react-hot-toast'
import MatchSettings from "./MatchSettings"
import ModalScore from "./ModalScore"
import { useState } from "react"


const MatchContent = ({match, setLoading, roundId}) => {
    
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
         
           <Table responsive variant="dark" striped >

            <tbody>
               
            <tr><td>Date</td><td>{match?.date}</td></tr>
            <tr><td>League </td><td>{match?.league?.league}</td></tr>
            <tr><td>Season</td><td>{match?.season?.season}</td></tr>
            <tr><td>Round</td><td>{match?.round?.round}</td></tr>
            <tr><td>Status</td><td>{(match?.status)?  <Alert variant="success h-25">Abierto</Alert>:<Alert  variant="danger  h-25">Cerrado</Alert>}</td></tr>
            <tr><td>Stadium</td><td>{match?.local?.stadium}</td></tr>
            <tr>
                <td><strong>Local </strong>{match?.local?.name}</td><td><strong>{match?.score?.map(score => score?.local)}</strong></td>
             </tr>
             <tr>
                <td><strong>Away </strong>{match?.away?.name}</td><td><strong>{match?.score?.map(score => score?.away)}</strong></td>
             </tr>
            </tbody>
             </Table>
             <center>{(match?.status) && <Button variant='warning mb-2' onClick={() => handleShow()}>Place score</Button> }</center>
            <ModalScore modalShow={modalShow} handleClose={handleClose} matchId={match?._id} setLoading={setLoading}/>
            <Row>
            {(match?.status) && <MatchSettings  match={match} handleRemoveLineUp={handleRemoveLineUp} handleAddLineUp={handleAddLineUp} roundId={roundId} setLoading={setLoading}/> }
            </Row>
        
        </>
    )
}
export default MatchContent