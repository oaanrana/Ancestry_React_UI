import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import calcTree from 'relatives-tree';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import ReactFamilyTree from 'react-family-tree'; 
import { Node, ExtNode } from 'relatives-tree/lib/types';
import FamilyNode from './FamilyNode';
import Navbar from './Navbar';

const styles = require('./FamilyNode.css');


const source = [
    {
      "id": "jsyRsE5sr",
      "gender": "male",
      "parents": [],
      "siblings": [],
      "spouses": [
        {
          "id": "pdRwdtR54",
          "type": "married"
        }
      ],
      "children": []
    },
    {
      "id": "pdRwdtR54",
      "gender": "female",
      "parents": [],
      "siblings": [],
      "spouses": [
        {
          "id": "jsyRsE5sr",
          "type": "married"
        }
      ],
      "children": []
    }
  ]


export default function CreateTree() {

    const history = useHistory();
    const [nodes, setNodes] = useState(source);
    const [rootId, setRootId] = useState(source[0].id);
    const [myId, setmMyId] = useState(source[0].id);
    const WIDTH = 70;
    const HEIGHT = 80;


    function handleGoHome() {
        history.push("/");
    }

    function handleAddPerson() {
        //
    }

    let center = {
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
      }

    return (
        <div>
          <Navbar/>
            <Button variant="link" onClick={handleGoHome}>
                    Go Back to home
            </Button>
            <Button variant="button" onClick={handleAddPerson}>
                    Add Person
            </Button>
            {console.log(nodes)}
            {console.log(rootId)}
            <ReactFamilyTree 
                nodes={nodes}
                rootId={rootId}
                width={70}
                height={80}
                className={styles.tree}
                renderNode={(node) => (
                  <FamilyNode
                    key={node.id}
                    node={node}
                    isRoot={node.id === rootId}
                    onSubClick={setRootId}
                    style={{
                      width: WIDTH,
                      height: HEIGHT,
                      transform: `translate(${node.left * (70 / 2)}px, ${node.top * (80 / 2)}px)`,
                    }}
                  />
                  )}
            />
        </div>
    )
}
