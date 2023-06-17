import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { verifyOTP } from '../../../services/users'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { validateOTP } from '../../../helpers/validations'

const VerifyOTP = () => {
  const { email } = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      OTP: ''
    },
    validate: validateOTP,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { email })
      verifyOTP(values)
        .then(data => {
          toast.success('Code OTP correct')
          setTimeout(() => {
            navigate(`resetPasword/${data.data}`)
          }, 1000
          )
        })
        .catch((error) => {
          console.log(error)
          toast.error('Code OTP incorrect')
          setTimeout(() => {
            formik.resetForm()
          }, 1000
          )
        })
    }
  })

  return (
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container className="mt-5 w-50 h-50 bg-dark text-light rounded p-4" >
            <h1 className='text-center'>Verify Code</h1>
            <Form className=" m-1 w-100" onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="OTP">Code OTP</Form.Label>
            <Form.Control {...formik.getFieldProps('OTP')} type="text" name="OTP" id="OTP" placeholder='Code OTP'/>
            </Form.Group>
            <Button variant="warning mt-2 float-right" type='submit'>Check code</Button>
            </Form>
        </Container>
       </>
  )
}
export default VerifyOTP
