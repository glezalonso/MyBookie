import { Link } from 'react-router-dom'
import { Table, Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { deleteSport, updateSport, createSport } from "../../../models/sport.models"
import ModalSports from './ModalSports'
import ModalDelete from '../static/ModalDelete'
import { useState } from 'react'

const TableSports = ({ sports, setLoading } ) => {

    const [ modalShow, setModalShow ]= useState(false)
    const [ sport, setSport ] = useState([])
    const [ update , setUpdate] = useState(false)
    const [ modalDelete, setModalDelete] = useState({state: false, id: ''})
    
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)
    const handleCloseDelete = () => setModalDelete({...modalDelete ,state :false})
    const handleShowDelete = (id) => setModalDelete({state: true , id:id})
    

    const handleDelete = (id) => {
        setLoading(true)
        deleteSport(id)
        .then(() => toast.success('Deleted sport successfully'))
        .catch(()=> toast.error('Failed sport delete'))
        .finally(() => { 
            handleCloseDelete()
            setLoading(false)})  
    }
    const handleUpdate = (data) => {
        handleShow()
        setSport(data)
        setUpdate(true)
    }
    

    return(
        <>
         <Button variant="warning mb-2" onClick={handleShow}> Create sport</Button>
        {(!update)
        ?<ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createSport} type={'Create'} setUpdate={setUpdate} />
        :<ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateSport} type={'Edit'}  setUpdate={setUpdate} /> }
        {(sports.length > 0) ? 
        <Table responsive variant="dark" striped>
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
        <Link  className="btn btn-info m-1" to={`/sports/${sport?._id}`}>Details</Link>
         <Button variant="warning m-1" onClick={() => handleUpdate(sport)}>Edit</Button>
         <Button variant="danger m-1" onClick={() => handleShowDelete(sport?._id)}>Delete</Button></td>
        </tr>
        ))}
         </tbody>
        </Table>
          : <Alert variant="info sm">There is no information to show!</Alert>} 
           <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} setLoading={setLoading} handleDelete={handleDelete}  />
        </>
    )
}
 export default TableSports