import { Col } from "react-bootstrap"
import { getTeams}  from '../../../models/teams.models'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import TeamSettings from "./TeamSettings"
import Roaster from "./Roaster"

const MatchSettings = ({ match , handleRemoveLineUp , handleAddLineUp, setLoading}) => {
    const [ teams, setTeams ] = useState([])

    useEffect(() => {
        getTeams()
        .then(data => {
            setLoading(true)
            setTeams(data.data)})
        .catch(() => toast.error(' Failed to load teams'))
        .finally(() => setLoading(false))

    },[setLoading])
    
    const rostLocal = teams?.filter(team => team._id == match?.local?._id)
    const rostAway = teams?.filter(team => team._id == match?.away?._id)
 
    return (
        <>
            <Col>
           <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'local'}/>
           <Roaster match={match} roster={rostLocal} handleAddLineUp={handleAddLineUp}/>
            </Col>
            <Col>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'away'}/>
            <Roaster match={match} roster={rostAway} handleAddLineUp={handleAddLineUp}/>
            </Col>
            
        </>
    )
}

export default MatchSettings