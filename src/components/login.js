import React, {useState, useRef} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { Form } from "react-bootstrap"
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useAuth } from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";


export default function Login() {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const marginTop = { marginTop: 5 };

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(event) {

        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            console.log("this is the email: "+ emailRef.current.value);
            console.log("this is the password: "+ passwordRef.current.value);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        }

        catch { 
            setError("failed to sign in")
        }
        setLoading(false);
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Log In</h2>
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button onSubmit={handleSubmit} disabled={loading} type='submit' variant='contained' color='primary' style={marginTop}>Log In</Button>
                </Form>
            </Paper>
        </Grid>
    )
}