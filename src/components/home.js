import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import { Grid } from '@material-ui/core';
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from 'src/firebase';

export default function Home() {

    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const treesRef = collection(database, "FamilyTrees");

    const [trees, setTrees] = useState([]);
    

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

    useEffect( () => {
        const q = query(treesRef, where("userId", "==", currentUser.email))
        console.log(currentUser.email);
        const getUsers = async () => {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
            })
            setTrees(querySnapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
          };
        getUsers();
    }, []);

    return (
        <div data-testid="homeTest"> 
        <Navbar/>
            <Card.Body className="mx-auto">
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Button data-testid="logoutTest" className="mx-auto" variant="link" onClick={handleLogout}>
                Log Out
                </Button>
            </Card.Body>
        <Grid container>
            {trees.map((tree) => {
                return (
                    <Link to="/create-tree">
                        <h1>{tree.familyTreeName}</h1>
                    </Link>
                )
            })}
        </Grid>        
        <Link variant="button" to="/create-tree" data-testid="create_tree_button">
            If you don't have a tree, create a Family Tree now!
        </Link>
        
        </div>
    )
}