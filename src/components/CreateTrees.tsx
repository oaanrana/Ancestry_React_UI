import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@mui/material/Button";
import ReactFamilyTree from 'react-family-tree'; 
import { Node, ExtNode, Gender, Relation, RelType } from 'relatives-tree/lib/types';
import Navbar from './Navbar';
import FamilyNodes from './FamilyNodes';
import averageTree from 'relatives-tree/samples/average-tree.json';
import styles from './Tree.module.css';
import { render } from '@testing-library/react';
import classNames from 'classnames';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {database} from "../firebase";
import {collection, query, where, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';


type Source = Array<Node>;

let family_tree_array: Source = [];

export default function CreateTree(title: string) {

    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const [nodes, setNodes] = useState<Source>(family_tree_array);
    const [rootId, setRootId] = useState();
    const [myId, setmMyId] = useState();
    const [treeName, setTreeName] = useState("");
    const [openName, setOpenName] = useState(false);
    const treesRef = collection(database, "FamilyTrees");

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [siblings, setSiblings] = useState("");
    const [parents, setParents] = useState("");
    const [children, setChildren] = useState("");
    const [spouse, setSpouse] = useState("");
    const usersCollectionRef = collection(database, "users");
    
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const WIDTH = 70;
    const HEIGHT = 80;

    async function handleGoHome() {
        history.push("/");
    }

    function openNameEditor(){
      setOpenName(true);
    }

    function closeNameEditor() {
      setTreeName("");
      setOpenName(false);
    }

    function handleNameChange() {
      setOpenName(false);
    }

    function openAddPerson(){
      setIsOpenAdd(true);
    }

    function closeAddPerson() {
      setIsOpenAdd(false);
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log(siblings);
      console.log(children);

      // this means we have a submissions

      let parentArray: Relation[] = getRelations(parents.split(","));

      let siblingsArray: Relation[] = getRelations(siblings.split(","));

      let spousesArray: Relation[] = [{
        "id": spouse,
        "type": RelType.married
      }];

      if (spouse === "") {
        spousesArray = [];
      }
      let childrenArray: Relation[] = getRelations(children.split(","));
      let gender_obj;;
      if (gender === "Male" || gender === "male") {
        gender_obj = Gender.male;
      }
      else {
        gender_obj = Gender.female;
      }

      if (name && gender) {
          let person: Node = {
            "id": name.trim(),
            "gender": gender_obj,
            "parents": parentArray,
            "siblings": siblingsArray,
            "spouses": spousesArray,
            "children": childrenArray
          }

          family_tree_array.push(person);
          console.log(family_tree_array);
          editRelations(person);
          setNodes([]);
          setRootId(family_tree_array[0].id);
          setmMyId(family_tree_array[0].id);
          setNodes(family_tree_array);
      }

      setChildren("");
      setSiblings("");
      setParents("");
      setGender("");
      setSpouse("");
      setIsOpenAdd(false);
    }

    function editRelations(person: Node) {
      console.log(person);
      editParents(person.parents, person);
      editSiblings(person.siblings, person);
      editChildren(person.children, person);
      editSpouse(person.spouses, person);
    }

    function editParents(parents: Relation[], person: Node) {

      for (let i = 0; i < parents.length; i++) {
        let id = parents[i].id

        for (let j = 0; j < family_tree_array.length; j++) {
          // we've found the relation, now time to edit.
          if (family_tree_array[j].id === id) {
            let obj: Relation = {
              id: person.id,
              type: RelType.blood
            } 
            family_tree_array[j].children.push(obj);
          }
        }
      }
    }

    function editSiblings(siblings: Relation[], person: Node) {
      for (let i = 0; i < siblings.length; i++) {
        let id = siblings[i].id

        for (let j = 0; j < family_tree_array.length; j++) {
          // we've found the relation, now time to edit.
          if (family_tree_array[j].id === id) {
            let obj: Relation = {
              id: person.id,
              type: RelType.blood
            } 
            family_tree_array[j].siblings.push(obj);
          }
        }
      }
    }


    function editChildren(children: Relation[], person: Node) {
      for (let i = 0; i < children.length; i++) {
        let id = children[i].id

        for (let j = 0; j < family_tree_array.length; j++) {
          // we've found the relation, now time to edit.
          if (family_tree_array[j].id === id) {
            let obj: Relation = {
              id: person.id,
              type: RelType.blood
            } 
            family_tree_array[j].parents.push(obj);
          }
        }
      }
    }

    function editSpouse(spouses: Relation[], person: Node) {
      for (let i = 0; i < spouses.length; i++) {
        let id = spouses[i].id

        for (let j = 0; j < family_tree_array.length; j++) {
          // we've found the relation, now time to edit.
          if (family_tree_array[j].id === id) {
            let obj: Relation = {
              id: person.id,
              type: RelType.married
            } 
            family_tree_array[j].spouses.push(obj);
          }
        }
      }
    }

    /**
     * This method needs to go through the parents array, and create objects for each, 
     * then return a relation array back
     */
    function getRelations(relations: Array<string>) {
      let array: Relation[] = [
      ];

      if (relations[0] === "") {
        return array;
      }
      // iterate through parents and create an object of this format
      // trim leading and trailing whitespace
      for (let i = 0; i < relations.length; i++) {

        let obj: Relation = {
          id: relations[i].trim(),
          type: RelType.blood
        }
        array.push(obj);
      }
      return array;
    }

    /**
     * This function will be saving the tree and sending it to the firebase database
     */
    const saveTree = async () => {
      // const user = doc(database, "users", currentUser.email);
      // await addDoc(usersCollectionRef, nodes);
    }

    useEffect( () => {
      const q = query(treesRef, where("userId", "==", currentUser.email), where("familyTreeName", "==", title));
      const loadTree = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs.at(0));
      }
      loadTree();
    }, [nodes, family_tree_array])

    return (
        <div className={classNames(styles.root)}>
          <Navbar/>

          {treeName && <h2>{treeName}</h2>}
            <Button onClick={handleGoHome}>
                    Go Back to home
            </Button>
            <Button onClick={openAddPerson}>
                    Add Person
            </Button>
            <Button onClick={saveTree}>
              Save Tree
            </Button>
            <Button onClick={openNameEditor}> Name your family tree </Button>
          <Dialog open={openName} onClose={closeNameEditor}>
            <DialogContent>
                <TextField
                onChange = {(e) => setTreeName(e.target.value)}
                autoFocus
                margin="dense"
                label="Family Tree name"
                type="name"
                fullWidth
                variant="standard"> 
                </TextField> 
            </DialogContent>
            <DialogActions>
              <Button onClick={closeNameEditor}>Cancel</Button>
              <Button
              onClick={handleNameChange}
              type="submit"
              >Submit </Button>
            </DialogActions>
            </Dialog>
          <Dialog open={isOpenAdd} onClose={closeAddPerson} onSubmit={handleSubmit}> 
            <DialogTitle>Add Person to Family Tree </DialogTitle>
            <DialogContent>
                <DialogContentText fontStyle="bold">
                  Please only add relations if they currently exist on the tree.
                </DialogContentText>
                <DialogContentText fontStyle="bold">
                  Note: please do not add duplicate names. If there are duplicate names in your family, modify the names so they are unique. (Ex: Allen S. and Allen J.)                </DialogContentText>
                <TextField
                onChange = {(e) => setName(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
              />

              
              <TextField
                onChange = {(e) => setGender(e.target.value)}
                autoFocus
                margin="dense"
                id="gender"
                label="Gender"
                fullWidth
                variant="standard"
              />

              <TextField
                onChange = {(e) => setSiblings(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Siblings (separate by comma)"
                fullWidth
                variant="standard"
              />

              <TextField
                onChange = {(e) => setParents(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Parents (only enter two)"
                fullWidth
                variant="standard"
              />


              <TextField
                onChange = {(e) => setSpouse(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Spouse (only enter one)"
                fullWidth
                variant="standard"
              />


              <TextField
                onChange = {(e) => setChildren(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Children (separate by comma)"
                fullWidth
                variant="standard"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={closeAddPerson}>Cancel</Button>
              <Button 
              onClick={handleSubmit}
              type="submit"
              >Submit </Button>
            </DialogActions>
          </Dialog>

          <div className={styles.wrapper}>
            <ReactFamilyTree
              nodes={nodes as Node[]}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={classNames(styles.tree, styles)}
              renderNode={(node: ExtNode) => (
                <FamilyNodes
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  onSubClick={setRootId}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                    // float:"left",
                    left: `${317}px`,
                    top: `${20}px`
                  }}
                />
              )}
            />
          </div>
        </div>
    )
}