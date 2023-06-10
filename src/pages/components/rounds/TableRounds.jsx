import { Link } from 'react-router-dom'
import { Button, Table, Alert } from 'react-bootstrap'
import { deleteRound, updateRound, createRound } from '../../../models/round.models'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ModalRounds from './ModalRounds'

const TableRounds = ({ rounds, sportId ,leagueId ,seasonId, setLoading}) => {

    const [ modalShow, setModalShow ]= useState(false)
    const [ round , setRound ]= useState([])
    const [ update , setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        deleteRound(id)
        .then(() => toast.success('Deleted round successfully'))
        .catch(()=> toast.error('Failed delete round'))
        .finally(() =>  setLoading(true))  
    }

    
    const handleUpdate = (data) => {
        handleShow()
        setRound(data)
        setUpdate(true)
    }
    const roundsBySeason = rounds?.filter( round => round?.season?._id == seasonId) 
    
    return(
        <>
         <Button variant="warning" onClick={handleShow}>Create round</Button>
         {(!update)
        ?<ModalRounds round={round} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createRound} type={'Create'} setUpdate={setUpdate} seasonId={seasonId} />
        :<ModalRounds round={round} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateRound} type={'Edit'}  setUpdate={setUpdate} seasonId={seasonId} /> }
       {(rounds.length > 0)  ?
        <Table>
            <thead>
                <tr>
                <th>Round</th>
                <th>Round number</th>
                <th>Season</th>
                <th>Status</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
        {roundsBySeason?.map(round => (
        <tr key={round?._id} >
         <td>{round?.round}</td>
         <td>{round?.roundNumber}</td>
         <td>{round?.season?.description}</td>
         <td>{(round?.status) ? 'Open' : 'Close'}</td>
         <td>
         <Link className="btn btn-dark" to={`/sports/${sportId}/leagues/${leagueId}/seasons/${seasonId}/rounds/${round?._id}`}>Details</Link>
        <Button variant="warning" onClick={() => handleUpdate(round)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(round?._id)}>Delete</Button>
         </td>
        </tr>
        ))}
         </tbody>
        </Table>
         : <Alert variant="info">there is no information to show!</Alert>}
        </>
    )
}
 export default TableRounds