import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { deleteLeague, createLeague, updateLeague } from '../../../models/leagues.models'
import ModalLeagues from './ModalLeagues'
import ModalDelete from '../static/ModalDelete'

const TableLeagues = ({ leagues, sportId, setLoading }) => {
  const [modalShow, setModalShow] = useState(false)
  const [league, setLeague] = useState([])
  const [update, setUpdate] = useState(false)
  const [modalDelete, setModalDelete] = useState({ state: false, id: '' })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const handleCloseDelete = () => setModalDelete({ ...modalDelete, state: false })
  const handleShowDelete = (id) => setModalDelete({ state: true, id })

  const handleDelete = (id) => {
    setLoading(true)
    deleteLeague(id)
      .then(() => toast.success('Deleted league successfully'))
      .catch(() => toast.error('Failed delete league'))
      .finally(() => {
        handleCloseDelete()
        setLoading(false)
      })
  }

  const handleUpdate = (data) => {
    handleShow()
    setLeague(data)
    setUpdate(true)
  }

  const leagueBySport = leagues?.filter(league => league?.sport?._id === sportId)

  return (
        <>
         <Button variant="warning mb-2" onClick={handleShow}>Create league</Button>
        {(!update)
          ? <ModalLeagues league={league} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createLeague} type={'Create'} setUpdate={setUpdate} />
          : <ModalLeagues league={league} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateLeague} type={'Edit'} setUpdate={setUpdate} /> }

        {(leagues.length > 0)
          ? <Table responsive variant="dark" striped>
        <thead>
            <tr>
                <th>League</th>
                <th>Description</th>
                <th>Sport</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {leagueBySport?.map(league => (
        <tr key={league._id} >
         <td>{league?.league}</td>
         <td>{league?.description}</td>
         <td>{league?.sport?.sport}</td>
         <td>
        <Link className="btn btn-info m-1" to={`/sports/${sportId}/leagues/${league?._id}`}>Details</Link>
        <Button variant="warning m-1" onClick={() => handleUpdate(league)} >Edit</Button>
        <Button variant="danger m-1" onClick={() => handleShowDelete(league?._id)}>Delete</Button>
        </td>
        </tr>
        ))}
         </tbody>
        </Table>
          : <Alert variant="info">there is no information to show!</Alert>}
          <ModalDelete modalDelete={modalDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete} />
        </>
  )
}
export default TableLeagues
