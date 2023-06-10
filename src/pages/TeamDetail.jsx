import { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import { getTeam, removePlayer} from "../models/teams.models"
import toast, { Toaster } from "react-hot-toast"
import GridPlayers from "./components/teams/GridPlayers"
import { Container, Image, Spinner, Row, Col, Button, Alert} from "react-bootstrap"
import Navigate from "./components/static/Navigate"


const TeamDetail = () => {
    const [ team, setTeam ] = useState([])
    const [ loading, setLoading ]= useState(false)
    const { teamId } = useParams()
   
    useEffect(() => {
        getTeam(teamId)
        .then(data=> {
            setLoading(true)
            setTeam(data.data)})
        .catch(() => toast.error('Failed to load team'))
        .finally(()=> {
            setLoading(false)})
    },[teamId,loading])

    const handleRemove = (id, playerId, player) => {
       removePlayer(id, { playerId, player })
       .then(()=> toast.success('Removed player successfully'))
       .catch(() => toast.error('Failed player remove'))
       .finally(() => setLoading(true))
       }
     
    if(loading) return <Spinner animation="border" />  
  
    return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container>
            <div>
            <h1 className="h1">{team?.name}</h1><div>
            <Image src={team?.poster} alt={team?.name} />
            </div>
            <p>Stadium: {team?.stadium}</p>
            <span> Sport: {team?.sport?.sport}</span>
            </div>
        <Row>
            <Col style={{border: 'solid'}} >
            <h1 className="h1">Roaster</h1>
            <ul>
            {(team?.players?.length > 0 ) ? team?.players?.map(player => (
                 <li key={player?.playerId}>{player?.player}<Button variant="danger" onClick={() => handleRemove(teamId, player?.playerId, player?.player)} >Remove</Button></li>
             )):<Alert variant="info">There is no information to show!</Alert>}
             </ul>
            </Col>
             <GridPlayers teamId={teamId} setLoading={setLoading} team={team} />
            </Row>
            </Container>
        </>
    )

}

export default TeamDetail