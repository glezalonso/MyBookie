import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert } from 'react-bootstrap'
import { deleteMatch, updateMatch, createMatch } from '../../../services/matches'
import { toast } from 'react-hot-toast'
import ModalMatches from './ModalMatches'
import ModalDelete from '../static/ModalDelete'

const TableMatches = ({ matches, sportId, leagueId, seasonId, roundId, setLoading }) => {
  const [modalShow, setModalShow] = useState(false)
  const [match, setMatch] = useState([])
  const [update, setUpdate] = useState(false)
  const [modalDelete, setModalDelete] = useState({ state: false, id: '' })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)
  const handleCloseDelete = () => setModalDelete({ ...modalDelete, state: false })
  const handleShowDelete = (id) => setModalDelete({ state: true, id })

  const handleDelete = (id) => {
    setLoading(true)
    deleteMatch(id)
      .then(() => toast.success('Deleted match successfully'))
      .catch(() => toast.error('Failed delete match'))
      .finally(() => {
        handleCloseDelete()
        setLoading(false)
      })
  }

  const handleUpdate = (data) => {
    handleShow()
    setMatch(data)
    setUpdate(true)
  }

  const matchesByRound = matches?.filter(match => match?.round?._id === roundId)

  return (
        <>
        <h3 className="h3 mt-2">Matches</h3>
        <Button className="btn btn-warning mb-2" onClick={handleShow} >Create match</Button>
         {(!update)
           ? <ModalMatches match={match} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={createMatch} type={'Create'} setUpdate={setUpdate} sportId={sportId} roundId={roundId} leagueId={leagueId} seasonId={seasonId}/>
           : <ModalMatches match={match} modalShow={modalShow} handleClose={handleClose} setLoading={setLoading} action={updateMatch} type={'Edit'} setUpdate={setUpdate} sportId={sportId} roundId={roundId} leagueId={leagueId} seasonId={seasonId}/> }
         {(matches.length > 0)
           ? <Table responsive variant="dark" hover striped>
        <thead>
            <tr>
                <th>Date</th>
                <th>League</th>
                <th>Season</th>
                <th>Round</th>
                <th>Status</th>
                <th>Teams</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {matchesByRound?.map(match => (
        <tr key={match._id} >
         <td>{match?.date?.split('.')[0]}</td>
         <td>{match?.league?.league}</td>
         <td>{match?.season?.season}</td>
         <td>{match?.round?.round}</td>
         <td>{(match?.status) ? 'Abierto' : 'Cerrado'}</td>
         <td>{match?.local?.name}<strong> {match?.score?.map(score => score?.local)}</strong> vs {match?.away?.name}<strong> {match?.score?.map(score => score?.away)}</strong></td>
         <td>
         <Link className="btn btn-info m-1" to={`/sports/${sportId}/leagues/${leagueId}/seasons/${seasonId}/rounds/${roundId}/matches/${match?._id}`}>Details</Link>
        <Button variant="warning m-1" onClick={() => handleUpdate(match)}>Edit</Button>
        <Button variant="danger m-1" onClick={() => handleShowDelete(match?._id)}>Delete</Button>
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
export default TableMatches
