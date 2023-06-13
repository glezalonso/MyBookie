import { Link } from 'react-router-dom'
import { Table, Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { deleteUser, register, updateUser } from '../../../models/users.models'
import ModalUsers from './ModalUsers'
import ModalDelete from '../static/ModalDelete'
import { useState } from 'react'

const TableUsers = ({ users, setLoading } ) => {

    const [ modalShow, setModalShow ]= useState(false)
    const [ user, setUser ] = useState([])
    const [ update , setUpdate] = useState(false)
    const [ modalDelete, setModalDelete] = useState({state: false, id: ''})
    
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)
    const handleCloseDelete = () => setModalDelete({...modalDelete ,state :false})
    const handleShowDelete = (id) => setModalDelete({state: true , id:id})
    

    const handleDelete = (id) => {
        deleteUser(id)
        .then(() => toast.success('Deleted sport successfully'))
        .catch(()=> toast.error('Failed sport delete'))
        .finally(() =>  setLoading(true))  
    }
    const handleUpdate = (data) => {
        handleShow()
        setUser(data)
        setUpdate(true)
    }
    return(
        <>
         <Button className="btn btn-warning mb-2" onClick={handleShow}> Create user</Button>
        {(!update)
        ?<ModalUsers user={user} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={register} type={'Create'} setUpdate={setUpdate} />
        :<ModalUsers user={user} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateUser} type={'Edit'}  setUpdate={setUpdate} /> }
        {(users.length > 0) ? 
        <Table responsive variant="dark" striped>
        <thead >
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Fullname</th>
                <th>Rol</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {users?.map(user => (
        <tr key={user?._id} >
         <td>{user?.username}</td>
         <td>{user?.email}</td>
         <td>{user?.fullName}</td>
         <td>{(user?.isAdmin) ? <span>Admin</span> : <span>User</span>}</td>
         <td>
        <Link  className="btn btn-info m-1" to={`/users/${user?._id}`}>Details</Link>
         <Button variant="warning m-1" onClick={() => handleUpdate(user)}>Edit</Button>
         <Button variant="danger m-1" onClick={() => handleShowDelete(user?._id)}>Delete</Button></td>
        </tr>
        ))}
         </tbody>
        </Table>
          : <Alert variant="info sm">There is no information to show!</Alert>} 
           <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete}  />
        </>
    )
}
 export default TableUsers