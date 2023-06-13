import { Modal, Form , Button, FormControl} from "react-bootstrap"
import { getTeams } from '../../../models/teams.models'
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast } from "react-hot-toast"
import { validateMatch } from "../../../helpers/validations"


const ModalMatches = ({match, modalShow, handleClose, setLoading, sportId, leagueId, seasonId, roundId,  action, type, setUpdate }) =>{
     const [ teams , setTeams ] = useState([])
   useEffect(() => {
         getTeams().then(data=> {
            setLoading(true)
            setTeams(data.data)})
            .catch(() => toast.error('Failed to load teams'))
            .finally(() => setLoading(false))

    },[setTeams,setLoading])

   

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
            date: match?.date?.split('T')[0] || '',
            teamHome:match?.local?._id || '',
            teamAway:match?.away?._id || '',
            round: roundId,
            league: leagueId,
            season: seasonId,
            status: match?.status || ''
        },
        validate: validateMatch,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit:  async (values) => {
                 action((!match?._id) ? values : match?._id, values)
                .then(() =>  toast.success(`It has been a success`))
                .catch(()=> toast.error('An error has occurred'))
                .finally(() => {
                setLoading(true)
                formik.resetForm()
                handleClose()
                
            })      
        }
    })

    const handleCloseUpdate = () => {
        formik.resetForm() 
        setUpdate(false)
        handleClose()
    }

    const filterBySport = teams?.filter(team => team.sport._id== sportId)
   
    return(
        <>
      
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} match</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Date :</Form.Label>
                        <FormControl {...formik.getFieldProps('date')} type="date" id="date" name="date"></FormControl>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Local team</Form.Label>
                        <Form.Select id="teamHome" name="teamHome" {...formik.getFieldProps('teamHome')}>
                            <option value={false} >Select the local team </option>
                            {filterBySport?.map(team=>(
                            <option key={team?._id} value={team?._id}>{team?.name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Away team:</Form.Label>
                        <Form.Select id="teamAway" name="teamAway" {...formik.getFieldProps('teamAway')}>
                            <option value={false}>Select the away team </option>
                            {filterBySport?.map(team=>(
                            <option key={team?._id} value={team?._id}>{team?.name}</option>
                        ))}
                        </Form.Select>
                        </Form.Group> 
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Activo</option>
                            <option value={false}>Desactivo</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Round :</Form.Label>
                        <FormControl {...formik.getFieldProps('round')} type="text" id="round" name="round" disabled></FormControl>
                        </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseUpdate()}>Close</Button>
                <Button variant="primary" type="submit">{type} match</Button>
            </Modal.Footer>
        </Form>
      </Modal>
        
        </>
    )

}

export default ModalMatches