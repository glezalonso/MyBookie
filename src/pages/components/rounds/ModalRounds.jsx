import { Modal, Form , Button, FormControl } from "react-bootstrap"
import { getSeasons } from "../../../models/seasons.models"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast } from "react-hot-toast"
import { validateRound } from "../../../helpers/validations"

const ModalRounds = ({ round ,modalShow, handleClose, setLoading, action, type, setUpdate, seasonId }) =>{
  
    const[ seasons, setSeasons ] = useState([])

    useEffect(() => {
        getSeasons()
        .then( data => setSeasons(data.data))
        .catch(() => toast.error('Failed to load seasons'))
        .finally(() => setLoading(false))
    },[setLoading])
    
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            round: round?.round || '',
            roundNumber:round?.roundNumber || '',
            season: seasonId || '',
            status: round?.status || ''
        },
        validate: validateRound,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            setLoading(true)
             action((!round?._id) ? values : round?._id, values)
             .then(()=> toast.success(`It has been a success`))
                .catch(()=> toast.error('An error has occurred'))
                .finally(() => {
                formik.resetForm()
                handleClose()
                setLoading(false)
            })      
        }
    })

    const handleCloseUpdate = () => {
        formik.resetForm() 
        setUpdate(false)
        handleClose()
    }

 

    return(
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} round</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Round name</Form.Label>
                        <FormControl {...formik.getFieldProps('round')} type="text" id="round" name="round"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Round number</Form.Label>
                        <FormControl {...formik.getFieldProps('roundNumber')} type="number" id="roundNumber" name="roundNumber"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Season:</Form.Label>
                        <Form.Select id="season" name="season" {...formik.getFieldProps('season')} disabled>
                            <option  value={false}>Select the season</option>
                        {seasons?.map(season =>(
                            <option key={season?._id} value={season?._id}>{season?.season}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Desactivate</option>
                        </Form.Select>
                    </Form.Group>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="primary" type="submit">{type} round</Button>
            </Modal.Footer>
        </Form>
      </Modal>
        
        </>
    )

}

export default ModalRounds