import { Modal, Form , Button, FormControl } from "react-bootstrap"
import { getLeagues } from "../../../models/leagues.models"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast } from "react-hot-toast"
import { validateSeason } from "../../../helpers/validations"


const ModalSeasons = ({season, modalShow, handleClose, setLoading, leagueId, action, type, setUpdate}) =>{
  
    const[ leagues, setLeagues ] = useState([])
 
    useEffect(() => {
        getLeagues().then(data=> {
            setLoading(true)
            setLeagues(data.data)})
            .catch(() => toast.error('Failed to load the leagues'))
            .finally(() => setLoading(false))
    },[setLoading])
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
            season: season?.season || '',
            description: season?.description || '',
            status: season?.status || '',
            league: leagueId || ''
        },
        validate: validateSeason,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
             action((!season?._id) ? values : season?._id, values)
            .then(() => toast.success(`It has been a success`))
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
    
    const leagueBySport = leagues.filter(leagues => leagues?._id == leagueId)

    return(
        <>
        <Modal show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} season</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Season name</Form.Label>
                        <FormControl {...formik.getFieldProps('season')} type="text" id="season" name="season"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <FormControl {...formik.getFieldProps('description')} type="text" id="description" name="description"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Desactivate</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>League:</Form.Label>
                        <Form.Select id="league" name="league" {...formik.getFieldProps('league')} disabled>
                            <option  value={false}>Select the league</option>
                        {leagueBySport?.map(league =>(
                            <option key={league?._id} value={league?._id}>{league?.league}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>CLose</Button>
                <Button variant="primary" type="submit">{type} league</Button>
            </Modal.Footer>
        </Form>
      </Modal>
        
        </>
    )

}

export default ModalSeasons