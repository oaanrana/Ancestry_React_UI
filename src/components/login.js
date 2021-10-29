import React from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import Home from "../components/home";
import {render} from 'react-dom';
import CustomizedDialogs from './dialog';
import SignUp from './signup';


const Login=()=>{

    //CSS Styles
    const paperStyle={padding :20, height:'70vh', width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}


    const history = useHistory();
    const navigateTo = () => {

        console.log("hey this should be working");
    }

    const routes = [
        {
            path: "/home",
            component: Home
        }
    ]


    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={navigateTo} type='submit' color='primary' style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account?
                    <CustomizedDialogs title="Sign Up">
                        <SignUp></SignUp>
                    </CustomizedDialogs>
                     
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;