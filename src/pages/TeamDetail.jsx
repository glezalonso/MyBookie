import { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import { getTeam} from "../models/teams.models"
import toast, { Toaster } from "react-hot-toast"
import SectionPlayers from "./components/teams/SectionPlayers"
import { Container, Image, Spinner, Row, Col, Button, Alert} from "react-bootstrap"
import Navigate from "./components/static/Navigate"
import SectionRoster from "./components/teams/SectionRoster"


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
                    <SectionRoster  team={team} setLoading={setLoading}/>
                    <SectionPlayers team={team} setLoading={setLoading} />
                </Row>
            </Container>
        </>
    )

}

export default TeamDetail