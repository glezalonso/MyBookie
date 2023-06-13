import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button, Table, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { deleteSeason, createSeason, updateSeason } from '../../../models/seasons.models'
import ModalSeasons from './ModalSeasons'
import ModalDelete from '../static/ModalDelete'

const TableSeasons= ({ seasons, leagueId, sportId, setLoading} ) => {
    const [ modalShow, setModalShow ]= useState(false)
    const [ season, setSeason ] = useState([])
    const [ update , setUpdate] = useState(false)
    const [ modalDelete, setModalDelete] = useState({state: false, id: ''})

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)
    const handleCloseDelete = () => setModalDelete({...modalDelete ,state :false})
    const handleShowDelete = (id) => setModalDelete({state: true , id:id})


    const handleDelete = (id) => {
        deleteSeason(id)
        .then(() => {
            toast.success('Deleted season successfully')
            setLoading(true)
            setModalShow(false)})
        .catch(() => toast.error('Failed season delete'))
        .finally(() => {setLoading(true)})   
    }

    const handleUpdate = (data) => {
        handleShow()
        setSeason(data)
        setUpdate(true)
    }

    const seasonsBySport = seasons?.filter(season => season?.league?._id == leagueId)
    return(
        <>
                 <Button variant="warning" onClick={handleShow}>Create season</Button>
                {(!update)
                ?<ModalSeasons season={season} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createSeason} type={'Create'} setUpdate={setUpdate} leagueId={leagueId} />
                :<ModalSeasons season={season} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateSeason} type={'Edit'}  setUpdate={setUpdate} leagueId={leagueId} /> }
            { (seasons.length > 0) ?
            <Table>
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Description</th>
                        <th>League</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
        {seasonsBySport?.map(season => (
        <tr key={season._id} >
         <td>{season?.season}</td>
         <td>{season?.description}</td>
         <td>{season?.league?.league}</td>
         <td>
        <Link className="btn btn-dark" to={`/sports/${sportId}/leagues/${leagueId}/seasons/${season?._id}`}>Details</Link>
        <Button variant="warning" onClick={() => handleUpdate(season)}>Edit</Button>
        <Button variant="danger" onClick={() => handleShowDelete(season?._id)}>Delete</Button>
         </td>
        </tr>
        ))}
         </tbody>
            </Table>
             : <Alert variant="info">there is no information to show!</Alert>}
            <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete}  />
        </>
    )
}
 export default TableSeasons