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
       
            <Col className="border border-secondary">
            <h3><center><strong>Local team settings</strong></center></h3>
            <br />
            <h5 className="h5">LineUp</h5>
           <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'local'}/>
           <h5 className="h5">Roster</h5>
           <Roaster match={match} roster={rostLocal} handleAddLineUp={handleAddLineUp} type={'local'}/>
            </Col>
            <Col className="border border-secondary">
            <h3><center><strong>Away team settings</strong></center></h3>
            <br />
            <h5 className="h5">LineUp</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'away'}/>
            <h5 className="h5">Roster</h5>
            <Roaster match={match} roster={rostAway} handleAddLineUp={handleAddLineUp} type={'away'}/>
            </Col>
            
        </>
    )
}

export default MatchSettings