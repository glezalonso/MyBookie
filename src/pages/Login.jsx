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
            setTimeout(()=> {
                navigate('home')
                },5000
            )
           

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
  

    return(
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container className=" bg-dark ml-5 mt-5 p-5 rounded w-75 " >
            <h1><center><strong>Mi Bookie</strong></center></h1>
            <Form  onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label htmlFor="username">User</Form.Label>
            <Form.Control  {...formik.getFieldProps('username')} type="text" name="username" id="username" />
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="password" >Password</Form.Label>
            <Form.Control {...formik.getFieldProps('password')} type="password" name="password" id="password" />
            </Form.Group>
            <Button variant="warning w-100 mt-3" type='submit'>Log in</Button>
            </Form>
        </Container>
       </>
    )
}
export default Login

