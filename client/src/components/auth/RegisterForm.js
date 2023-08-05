import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import AlertMessage from '../layout/AlertMessage';
import {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';

const RegisterForm = () => {
 //Context
 const {registerUser} = useContext(AuthContext)

 //Local state
 const[registerForm, setRegisterForm] = useState({
  username:'',
  password:'',
  confirmpassword:''
 })
 const [alert,setAlert] = useState(null)

 const{username, password, confirmpassword} = registerForm

 const onChangeRegisterForm = event => setRegisterForm({...registerForm,[event.target.name]:event.target.value})
 const register = async event =>{
  event.preventDefault()
  if(password !== confirmpassword){
    setAlert({type:'danger',message:'Pass do not match'})
setTimeout(() => setAlert(null), 3000)
return
  }
  try{
const registerData = await registerUser(registerForm)
if(!registerData.success){
  setAlert({type:'danger',message:registerData.message})
  setTimeout(() => setAlert(null), 3000)
}
  }
  catch(error){

  }
 }

  return (<>
   <Form className='my-4' onSubmit={register}>
   <AlertMessage info={alert} />
    <Form.Group>
      <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeRegisterForm} />
    </Form.Group>
    <Form.Group>
      <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangeRegisterForm}/>
    </Form.Group>
    <Form.Group>
      <Form.Control type='password' placeholder='Confirm Pass' name='confirmpassword' required value={confirmpassword} onChange={onChangeRegisterForm}/>
    </Form.Group>
    <Button variant='success' type='submit'>Register</Button>
   </Form>
   <p>
   Already account
    <Link to='/login'>
      <Button variant='info' size='sm' className='ml-2'>
        Login
      </Button>
    </Link>
   </p></>
  )
}

export default RegisterForm