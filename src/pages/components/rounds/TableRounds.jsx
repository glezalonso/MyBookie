import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table, Alert } from 'react-bootstrap'
import { deleteRound, updateRound, createRound } from '../../../services/rounds'
import toast from 'react-hot-toast'
import ModalRounds from './ModalRounds'
import ModalDelete from '../static/ModalDelete'

const TableRounds = ({ rounds, sportId, leagueId, seasonId, setLoading }) => {
  const [modalShow, setModalShow] = useState(false)
  const [round, setRound] = useState([])
  const [update, setUpdate] = useState(false)
  const [modalDelete, setModalDelete] = useState({ state: false, id: '' })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const handleCloseDelete = () => setModalDelete({ ...modalDelete, state: false })
  const handleShowDelete = (id) => setModalDelete({ state: true, id })

  const handleDelete = (id) => {
    setLoading(true)
    deleteRound(id)
      .then(() => toast.success('Deleted round successfully'))
      .catch(() => toast.error('Failed delete round'))
      .finally(() => {
        handleCloseDelete()
        setLoading(false)
      })
  }

  const handleUpdate = (data) => {
    handleShow()
    setRound(data)
    setUpdate(true)
  }
  const roundsBySeason = rounds?.filter(round => round?.season?._id === seasonId)

  return (
        <>
        <h3 className="h3 mt-2">Rounds</h3>
         <Button variant="warning mb-2" onClick={handleShow}>Create round</Button>
         {(!update)
           ? <ModalRounds round={round} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createRound} type={'Create'} setUpdate={setUpdate} seasonId={seasonId} />
           : <ModalRounds round={round} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateRound} type={'Edit'} setUpdate={setUpdate} seasonId={seasonId} /> }
       {(roundsBySeason?.length > 0)
         ? <Table responsive variant="dark" hover striped>
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
         <Link className="btn btn-info m-1" to={`/sports/${sportId}/leagues/${leagueId}/seasons/${seasonId}/rounds/${round?._id}`}>Details</Link>
        <Button variant="warning m-1" onClick={() => handleUpdate(round)}>Edit</Button>
        <Button variant="danger m-1" onClick={() => handleShowDelete(round?._id)}>Delete</Button>
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
export default TableRounds
