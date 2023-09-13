import React , {useState,useContext} from 'react'
import {Box,TextField,Button,styled , Typography} from '@mui/material';  // Box is similar to Div in Html 
import {API} from "../service/api.js";
import { DataContext } from '../context/DataProvider.js';
import { useNavigate } from 'react-router-dom';
// for outer box of login page
const Component = styled(Box)`width : 400px;
margin:auto;
margin-top : 64px;
box-shadow: 5px 2px 5px 2px  rgb(0, 0, 0, 0.6)`    // Box is material UI component so u can write css like this but for html elements 


// for blog-image
const Image = styled("img")({   // for html element you can write css like this while using material UI
    width:100,
    display:'flex',
    margin:'auto',
    paddingTop:'50px'
})

// for login & create Account button 
const Wrapper = styled(Box)`
padding:25px 35px;
display : flex;
flex-direction: column;
&> div {                                                // to add css to child form parents
    margin-top : 5px;
}
`

// login Button
const LoginButton = styled(Button)`
    // background:#FB641B;
    height : 48px;
`

// SingUp Button
const SignUpButton = styled(Button)`
    text-transform : none;
    background:#fff;
    color : #2874f0;
    height : 48px;
    box-shadow: 0 2px 4px 0  rgb(0, 0, 0, 20%);
    margin-top : 5px;
    font-size : 15px;
`

const Error = styled(Typography)`
        font-size:10px;
        color:#ff6161;
        line-height:0;
        margin-top:10px;
        font-weight:600;
`
const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
const signUpValues = {
    name:"",
    email :"",
    password:""
}
const LoginValues = {
 
    email :"",
    password:""
}

export default function Login(props) {

    const [Account , toggleaccount] = useState('login');        // for showing login or signUp page
    const [signup, setSignup] = useState(signUpValues);     // singup info of user
    const [login, setLogin] = useState(LoginValues);     // login info of user

    const[error , setError] = useState("")  // show error while geting signup error

    const { setAccount} = useContext(DataContext);

    let navigate = useNavigate();
      // function to change signUp or Login state variable .. i.e {Account}
    const toggleSignUp = () =>{                   
        Account === 'login'?toggleaccount('signUp'):toggleaccount('login'); 
    }


    // taking signup values
    const onInputChange = (e) =>{     
        setSignup({...signup , [e.target.name]: e.target.value});   // ...signup is used to append over its data insted removing it 
    }
        // login values
    const onValueChange = (e) =>{
        setLogin({...login , [e.target.name]: e.target.value}); 
    }
    // calling api 
    const signupUser = async()=>{
        try {
            let response = await API.userSignup(signup);
            console.log('API Response:', response);
            if (response.isSuccess) {
              setError("");
              setSignup(signUpValues);
              toggleaccount('login');
            } else {
              setError("Something went wrong. Please try again later.");
            }
          } catch (error) {
            // console.error('Error in signupUser:', error);
            setError("An error occurred while signing up. Please try again later.");
          }
    }

    const loginUser = async() =>{
        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
              setError("");   
              sessionStorage.setItem('accessToken',response.data.accessToken);
              sessionStorage.setItem('refreshToken',response.data.refreshToken);
              setAccount({name:response.data.name , email:response.data.email});
            props.isUserAuthenticated(true);
              navigate('/');
         } else {
              setError("Invalid Credentials.");
            }
          } catch (error) {
            // console.error('Error in signupUser:', error);
            setError("An error occurred while signing up. Please try again later.");
          }

    }
  return (
    <Component>
        <Box>
            <Image src={imageURL} alt = "login" />
            {
                Account === 'login'?    // using turnary operator
            // for login
                    <Wrapper>
                        <TextField id="standard-basic" label="email" value={login.email} variant="standard" name = "email" type="email" onChange={onValueChange}/>
                        <TextField id="standard-basic" label="Password" variant="standard" value={login.password} type='password'  name ='password'  onChange={onValueChange} />

                        
                    {error && <Error>{error}</Error>} {/* Show error */}


                        <LoginButton variant="contained" style={{marginTop :'30px'}} onClick={loginUser}>Login</LoginButton>
                        <Typography  style={{marginTop :'7px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>OR</Typography>
                        <SignUpButton onClick={toggleSignUp} >Create an Account</SignUpButton>
                    </Wrapper>
            :
                // for sign Up
                <Wrapper>
                    <TextField id="standard-basic" onChange={onInputChange} value = {signup.name} name = "name" label="Enter Name" variant="standard"  type='text'/>   { /* name is used to differenciate the onChange function */}
                    <TextField id="standard-basic" onChange={onInputChange} value = {signup.email} name = "email" label="Enter email" variant="standard"  type='email'/>
                    <TextField id="standard-basic" onChange={onInputChange} value = {signup.password} name = "password" label="Enter Password" variant="standard" type='password' />


                    {error && <Error>{error}</Error>}

                    <SignUpButton  onClick={signupUser} style={{marginTop :'17px'}} >SignUP</SignUpButton>
                    <Typography  style={{marginTop :'7px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>OR</Typography>
                    <LoginButton variant="contained" style={{marginTop :'15px' , textTransform:'none'}} onClick={toggleSignUp}>Already have an Account?</LoginButton>
                </Wrapper>

            }
        </Box>
    </Component>
  )
}
