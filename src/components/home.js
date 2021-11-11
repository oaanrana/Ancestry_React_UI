import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

export default function Home() {

    const fitComponent = {
        width: "20px"
    }

    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push("/login");
        }
        catch {
            setError("Failed to log out");
        }
        
    }

    return (
        <> <Navbar/>
            <Card.Body className="mx-auto">
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/create-tree" className="btn btn-primary w-100 mt-3">Create a Family Tree</Link>
            </Card.Body>
        <div className="mx-auto">

            <Button className="mx-auto"variant="link" onClick={handleLogout}>
                Log Out
            </Button>


            </div>
        </>
    )

}