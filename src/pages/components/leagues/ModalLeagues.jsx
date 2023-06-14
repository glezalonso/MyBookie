import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { getSports } from '../../../models/sport.models'
import { convertToBase64 } from '../../../helpers/converters'
import toast from 'react-hot-toast'
import { validateLeague } from '../../../helpers/validations'

const ModalLeagues = ({ league, modalShow, handleClose, setLoading, action, type, setUpdate }) => {
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
      league: league?.league || '',
      description: league?.description || '',
      sport: league?.sport?._id
    },
    validate: validateLeague,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true)
      values = await Object.assign(values, { poster: league?.poster || file || '' })
      action((!league?._id) ? values : league?._id, values)
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
        <Modal className ="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} league</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>League</Form.Label>
                        <FormControl {...formik.getFieldProps('league')} type="text" id="league" name="league"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <FormControl {...formik.getFieldProps('description')} type="text" id="description" name="description"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poster</Form.Label>
                        <FormControl type="file" id="poster" name="poster" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false} >Select sport</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="primary" type="submit">{type} league</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalLeagues
