import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { closeMatch } from '../../../services/matches'

const ModalScore = ({ modalShow, handleClose, matchId, setLoading }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      local: '',
      away: ''
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setLoading(true)
      closeMatch(matchId, values)
        .then(() => toast.success('Placed score succesfully'))
        .catch(() => toast.error('Failed to place score'))
        .finally(() => {
          formik.resetForm()
          handleClose()
          setLoading(false)
        })
    }
  })

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Place score</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Local :</Form.Label>
                        <FormControl {...formik.getFieldProps('local')} type="number" id="local" name="local"></FormControl>
                        </Form.Group>
                        <Form.Label>Away :</Form.Label>
                        <FormControl {...formik.getFieldProps('away')} type="number" id="away" name="away"></FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                <Button variant="primary" type="submit">Place score</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalScore
