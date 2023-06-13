import { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import { getTeam} from "../models/teams.models"
import toast, { Toaster } from "react-hot-toast"
import { Container, Spinner, Row} from "react-bootstrap"
import Navigate from "./components/static/Navigate"
import SectionTeam from "./components/teams/SectionTeam"
import SectionRoster from "./components/teams/SectionRoster"
import SectionPlayers from "./components/teams/SectionPlayers"
import SectionMatches from "./components/teams/SectionMatches"

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
        <Container fluid className="bg-dark text-white mt-1">
            <SectionTeam team={team} />
            <SectionMatches teamId={teamId} setLoading={setLoading}/>
                <Row>
                    <SectionRoster  team={team} setLoading={setLoading}/>
                    <SectionPlayers team={team} setLoading={setLoading} />
                </Row>
            </Container>
        </>
    )

}

export default TeamDetail