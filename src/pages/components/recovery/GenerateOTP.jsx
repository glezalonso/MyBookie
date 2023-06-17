import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { generateOTP } from '../../../services/users'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { validateEmail } from '../../../helpers/validations'

const GenerateOTP = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: validateEmail,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      generateOTP(values)
        .then(() => {
          toast.success('Email sended')
          setTimeout(() => {
            navigate(`verifyOTP/${values.email}`)
          }, 1000
          )
        })
        .catch(() => {
          toast.error('Fail to send email')
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
            <h1 className='text-center'>Reset Password</h1>
            <Form className=" m-1 w-100" onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="email">Email</Form.Label>
            <Form.Control {...formik.getFieldProps('email')} type="email" name="email" id="email" placeholder='Please enter you email to send a code'/>
            </Form.Group>
            <Button variant="warning mt-2 float-right" type='submit'>Recovery</Button>
            </Form>
        </Container>
       </>
  )
}
export default GenerateOTP
