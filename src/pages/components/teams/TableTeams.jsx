import { Link } from "react-router-dom"
import { Table, Button, FormControl } from "react-bootstrap"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import ModalTeams from "./ModalTeams"
import { deleteTeam, updateTeam, createTeam } from "../../../models/teams.models"

const TableTeams = ({teams, setLoading}) => {

    const [ modalShow, setModalShow ]= useState(false)
    const [ team, setTeam ] = useState([])
    const [ update , setUpdate] = useState(false)
    const [ dataFilter, setDataFilter] = useState('')

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        deleteTeam(id)
        .then(() => toast.success('Deteled team successfully '))
        .catch(()=> toast.error('Failed team delete'))
        .finally(() => setLoading(true))  
    }

    const handleUpdate = (data) => {
        handleShow()
        setTeam(data)
        setUpdate(true)
    }
    const handleOnChange = ( event ) => { 
        setDataFilter(event.target.value)
    }

    const filter = teams.filter( team => {
        if(dataFilter)  {
           return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
        }else {
       return team
        }}
        )
     

    return(
        <>
        <Button className="btn btn-warning" onClick={handleShow} >Create team</Button> 
        <div>
            <FormControl placeholder='Search Team...' id='team' name='team' value={dataFilter} onChange={(event) => handleOnChange(event)} />
        </div>
        {(!update)
        ?<ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createTeam} type={'Create'} setUpdate={setUpdate} />
        :<ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateTeam} type={'Edit'}  setUpdate={setUpdate} /> }
        <Table responsive>
        <thead>
            <tr>
                <th>Team</th>
                <th>Stadium</th>
                <th>Sport</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {filter?.map(team => (
        <tr key={team._id} >
         <td>{team?.name}</td>
         <td>{team?.stadium}</td>
         <td>{team?.sport?.sport}</td>
         <td>
        <Link className="btn btn-dark" to={`/teams/${team?._id}`}>Details</Link>
        <Button variant="warning" onClick={() => handleUpdate(team)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(team?._id)}>Delete</Button>
         </td>
        </tr>
        ))}
         </tbody>
        </Table>
       
        </>
    )
}

export default TableTeams