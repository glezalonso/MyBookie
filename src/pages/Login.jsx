import React from 'react'
import { verifyLogin } from '../helpers/validations'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { login } from '../services/users'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
  const auth = useAuthStore(state => state.setToken)
  const profile = useAuthStore(state => state.setProfile)
  const isAdmin = useAuthStore(state => state.setIsAdmin)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: verifyLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      login(values)
        .then(res => {
          toast.success('Log in successfully')
          auth(res.data.token)
          profile(res.data.username)
          isAdmin(res.data.isAdmin)
          setTimeout(() => {
            navigate('home')
          }, 5000
          )
        })
        .catch(() => {
          toast.error('Could not log in!')
          setTimeout(() => {
            formik.resetForm()
          }, 3000
          )
        })
    }
  })

  return (
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container className="mt-5  bg-dark text-light rounded p-4" >
       <p className='alert alert-info  text-center'>Versión: username: admin, password: 12345678</p>
            <h1 className='text-center'>Mi Bookie</h1>
            <Form className=" m-1 w-100" onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="username">User</Form.Label>
            <Form.Control {...formik.getFieldProps('username')} type="text" name="username" id="username" placeholder='Username'/>
            </Form.Group>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="password" >Password</Form.Label>
            <Form.Control {...formik.getFieldProps('password')} type="password" name="password" id="password" placeholder='Password' />
            </Form.Group>
            <Form.Group>
            <Form.Label className='mt-1' ><Link to={'recovery'}>Forget your password?</Link></Form.Label>
            </Form.Group>
            <Button variant="warning mt-2 float-right" type='submit'>Log in</Button>

            </Form>
        </Container>
       </>
  )
}
export default Login
