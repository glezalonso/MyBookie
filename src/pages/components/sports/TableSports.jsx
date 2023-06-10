import { Link } from 'react-router-dom'
import { Table, Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { deleteSport, updateSport, createSport } from "../../../models/sport.models"
import ModalSports from './ModalSports'
import { useState } from 'react'

const TableSports = ({ sports, setLoading } ) => {

    const [ modalShow, setModalShow ]= useState(false)
    const [ sport, setSport ] = useState([])
    const [ update , setUpdate] = useState(false)
    
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        deleteSport(id)
        .then(() => toast.success('Deleted sport successfully'))
        .catch(()=> toast.error('Failed sport delete'))
        .finally(() =>  setLoading(true))  
    }
    const handleUpdate = (data) => {
        handleShow()
        setSport(data)
        setUpdate(true)
    }
    return(
        <>
         <Button variant="warning" onClick={handleShow}> Create sport</Button>
        {(!update)
        ?<ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createSport} type={'Create'} setUpdate={setUpdate} />
        :<ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateSport} type={'Edit'}  setUpdate={setUpdate} /> }
        {(sports.length > 0) ? 
        <Table responsive>
        <thead>
            <tr>
                <th>Sport</th>
                <th>Description</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {sports?.map(sport => (
        <tr key={sport?._id} >
         <td>{sport?.sport}</td>
         <td>{sport?.description}</td>
         <td>
        <Link  className="btn btn-secondary" to={`/sports/${sport?._id}`}>Details</Link>
         <Button variant="warning" onClick={() => handleUpdate(sport)}>Edit</Button>
         <Button variant="danger" onClick={() => handleDelete(sport?._id)}>Delete</Button></td>
        </tr>
        ))}
         </tbody>
        </Table>
          : <Alert variant="info sm">There is no information to show!</Alert>} 
        </>
    )
}
 export default TableSports