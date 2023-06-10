import { verifyLogin } from "../helpers/validations"
import { Toaster,toast} from "react-hot-toast"
import { useFormik} from 'formik'
import { login } from '../models/users.models'
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
    const auth = useAuthStore(state => state.setToken)
    const profile = useAuthStore(state=> state.setProfile)
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
            auth(res.data.token)
            profile(res.data.username)
            navigate('home')

          })
          .catch(err => {
            toast.error(`Could not log in!`)
            console.log(err)
            setTimeout(()=> {
                formik.resetForm()
                },3000
            )
            })     
        
        }
    })
    console.log(import.meta.env.VITE_CLIENT)

    return(
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container >
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label htmlFor="username">User</Form.Label>
            <Form.Control {...formik.getFieldProps('username')} type="text" name="username" id="username" />
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="password" >Password</Form.Label>
            <Form.Control {...formik.getFieldProps('password')} type="password" name="password" id="password" />
            </Form.Group>
            <Button variant="primary" type='submit'>Log in</Button>
            </Form>
        </Container>
       </>
    )
}
export default Login

