import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, FormControl, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import ModalTeams from './ModalTeams'
import ModalDelete from '../static/ModalDelete'
import { deleteTeam, updateTeam, createTeam } from '../../../services/teams'

const TableTeams = ({ teams, setLoading }) => {
  const [modalShow, setModalShow] = useState(false)
  const [team, setTeam] = useState([])
  const [update, setUpdate] = useState(false)
  const [dataFilter, setDataFilter] = useState('')
  const [modalDelete, setModalDelete] = useState({ state: false, id: '' })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const handleCloseDelete = () => setModalDelete({ ...modalDelete, state: false })
  const handleShowDelete = (id) => setModalDelete({ state: true, id })

  const handleDelete = (id) => {
    setLoading(true)
    deleteTeam(id)
      .then(() => toast.success('Deteled team successfully '))
      .catch(() => toast.error('Failed team delete'))
      .finally(() => {
        handleCloseDelete()
        setLoading(false)
      })
  }

  const handleUpdate = (data) => {
    handleShow()
    setTeam(data)
    setUpdate(true)
  }
  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const filter = teams.filter(team => {
    if (dataFilter) {
      return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    } else {
      return team
    }
  }
  )

  return (
        <>
        <div className='mx-2'>
        <Button className="btn btn-warning mb-2" onClick={handleShow} >Create team</Button>
        <FormControl className="mb-3"placeholder='Search Team...' id='team' name='team' value={dataFilter} onChange={(event) => handleOnChange(event)} />
        </div>
        {(!update)
          ? <ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createTeam} type={'Create'} setUpdate={setUpdate} />
          : <ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateTeam} type={'Edit'} setUpdate={setUpdate} /> }
         {(filter.length > 0)
           ? <Table responsive variant="dark bordered" hover >
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
        <Link className="btn btn-info mx-1" to={`/teams/${team?._id}`}>Details</Link>
        <Button className="mx-1" variant="warning" onClick={() => handleUpdate(team)}>Edit</Button>
        <Button className="mx-1" variant="danger" onClick={() => handleShowDelete(team?._id)}>Delete</Button>

         </td>
        </tr>
        ))}
         </tbody>

        </Table>
           : <Alert variant="info sm">There is no information to show!</Alert>}
        <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete} />
        </>
  )
}

export default TableTeams
