import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { getSports } from '../../../models/sport.models'
import { convertToBase64 } from '../../../helpers/converters'
import { toast } from 'react-hot-toast'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { validateTeam } from '../../../helpers/validations'

const ModalTeams = ({ team, modalShow, handleClose, setLoading, action, type, setUpdate }) => {
  const [sports, setSports] = useState(null)
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
      name: team?.name || '',
      stadium: team?.stadium || '',
      status: team?.status || '',
      sport: team?.sport?._id || ''
    },
    validate: validateTeam,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true)
      values = await Object.assign(values, { poster: team?.poster || file || '' })
      action((!team?._id) ? values : team?._id, values)
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
                <Modal.Title>{type} team</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Team</Form.Label>
                        <FormControl {...formik.getFieldProps('name')} type="text" id="name" name="name"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Stadium</Form.Label>
                        <FormControl {...formik.getFieldProps('stadium')} type="text" id="stadium" name="stadium"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poster</Form.Label>
                        <FormControl type="file" id="poster" name="poster" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false} >Select the sport his belong to</option>
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
                <Button variant="warning" onClick={() => handleCloseUpdate()}>Close</Button>
                <Button variant="dark" type="submit">{type} team</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalTeams
