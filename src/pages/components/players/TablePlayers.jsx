import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, FormControl } from 'react-bootstrap'
import { deletePlayer, updatePlayer, createPlayer } from '../../../services/players'
import ModalPlayers from './ModalPlayers'
import ModalDelete from '../static/ModalDelete'
import toast from 'react-hot-toast'

const TablePlayers = ({ players, setLoading }) => {
  const [modalShow, setModalShow] = useState(false)
  const [player, setPlayer] = useState([])
  const [update, setUpdate] = useState(false)
  const [dataFilter, setDataFilter] = useState('')
  const [modalDelete, setModalDelete] = useState({ state: false, id: '' })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const handleCloseDelete = () => setModalDelete({ ...modalDelete, state: false })
  const handleShowDelete = (id) => setModalDelete({ state: true, id })

  const handleDelete = (id) => {
    setLoading(true)
    deletePlayer(id)
      .then(() => toast.success('Deleted player successfully'))
      .catch(() => toast.error('Failed delete player'))
      .finally(() => setLoading(false))
  }

  const handleUpdate = (data) => {
    handleShow()
    setPlayer(data)
    setUpdate(true)
  }

  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const filter = players.filter(player => {
    if (dataFilter) {
      return player?.fullName?.toLowerCase().includes(dataFilter.toLowerCase())
    } else {
      return player
    }
  }
  )

  return (
        <>
        <div className='mx-2'>
            <Button variant="warning mb-2" onClick={handleShow}>Create player</Button>
            <FormControl className='mb-3' placeholder='Search Player...' id='player' name='player' value={dataFilter} onChange={(event) => handleOnChange(event)} />
        </div>
        {(!update)
          ? <ModalPlayers player={player} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createPlayer} type={'Create'} setUpdate={setUpdate} />
          : <ModalPlayers player={player} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updatePlayer} type={'Edit'} setUpdate={setUpdate} /> }

        {(filter.length > 0)
          ? <Table responsive variant="dark" hover striped>
        <thead>
            <tr>
                <th>Fullname</th>
                <th>Position</th>
                <th>Sport</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {filter?.map(player => (
        <tr key={player._id} >
         <td>{player?.fullName}</td>
         <td>{player?.position}</td>
         <td>{player?.sport?.sport}</td>
         <td>
            <Link className="btn btn-info mx-1 " to={`/players/${player?._id}`}>Details</Link>
            <Button variant="warning mx-1 " onClick={() => handleUpdate(player)}>Edit</Button>
            <Button variant="danger mx-1 " onClick={() => handleShowDelete(player._id)}>Delete</Button>
            </td>
        </tr>
        ))}
         </tbody>
        </Table>
          : <Alert variant="info">There is no information to show!</Alert>}
        <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete} />
        </>
  )
}
export default TablePlayers
