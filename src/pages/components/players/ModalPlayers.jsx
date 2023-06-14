import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { getSports } from '../../../models/sport.models'
import { useFormik } from 'formik'
import { convertToBase64 } from '../../../helpers/converters'
import { toast } from 'react-hot-toast'
import { validatePlayer } from '../../../helpers/validations'

const ModalPlayers = ({ player, modalShow, handleClose, setLoading, action, type, setUpdate }) => {
  const [sports, setSports] = useState([])
  const [file, setFile] = useState()

  useEffect(() => {
    getSports()
      .then(data => setSports(data.data))
      .catch(() => toast.error('Failed to load sports'))
      .finally(() => setLoading(false))
  }, [setLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: player?.fullName || '',
      position: player?.position || '',
      sport: player?.sport?._id || '',
      status: player?.status || ''
    },
    validate: validatePlayer,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true)
      values = await Object.assign(values, { photo: player?.photo || file || '' })
      action((!player?._id) ? values : player?._id, values)
        .then(() => toast.success('It has been a success'))
        .catch(() => toast.error('An error has occurred'))
        .finally(() => {
          formik.resetForm()
          handleClose()
          setLoading(false)
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

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} player</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Fullname</Form.Label>
                        <FormControl {...formik.getFieldProps('fullName')} type="text" id="fullName" name="fullName"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Position</Form.Label>
                        <FormControl {...formik.getFieldProps('position')} type="text" id="position" name="position"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <FormControl type="file" id="photo" name="photo" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false}>Select sport</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

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
                <Button variant="primary" type="submit">{type} player</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalPlayers
