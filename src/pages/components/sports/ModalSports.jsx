import { Modal, Form , Button } from "react-bootstrap"
import { useState } from "react"
import { useFormik } from "formik"
import { toast } from 'react-hot-toast'
import { convertToBase64 } from "../../../helpers/converters"
import { validateSport } from "../../../helpers/validations"


const ModalSports = ({ sport, modalShow, handleClose, setLoading, action, type, setUpdate}) =>{
    const [ file , setFile ]= useState()
    
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            sport: sport?.sport || '',
            description:sport?.description || ''
        },
        validate: validateSport,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit:  async (values) => {
            values = await Object.assign(values,{  poster : sport?.poster || file || ''})
            action((!sport?._id) ? values : sport?._id, values)
            .then(()=> toast.success(`It has been a success`))
            .catch(()=> toast.error(`An error has occurred`))
            .finally(() => {
                formik.resetForm()
                handleClose()
                setLoading(true)
            })
            
           
        }
    })
    
    const onUpload = async event => {
        const base64 = await convertToBase64(event.target.files[0])
        setFile(base64)
    }
    const handleCloseUpdate = () => {
        formik.resetForm() 
        setUpdate(false)
        handleClose()
    }

    return(
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} sport</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <Form.Control {...formik.getFieldProps('sport')} type="text" id="sport" name="sport" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                            <Form.Control {...formik.getFieldProps('description')} type="text" id="description" name="description"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poster</Form.Label>
                        <Form.Control type="file" id="poster" name="poster" onChange={onUpload}></Form.Control>
                    </Form.Group>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="primary" type="submit">{type} sport</Button>
            </Modal.Footer>
        </Form>
      </Modal>
        
        </>
    )

}

export default ModalSports