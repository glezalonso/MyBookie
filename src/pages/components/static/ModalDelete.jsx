import React from 'react'
import { Modal, Button } from 'react-bootstrap'
const ModalDelete = ({ modalDelete, handleCloseDelete, handleDelete }) => {
  return (
            <>
              <Modal className="text-dark"
        show={modalDelete.state}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        the information will be completely erased
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseDelete()}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(modalDelete.id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
            </>
  )
}
export default ModalDelete
