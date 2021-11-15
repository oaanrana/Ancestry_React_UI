import React, {useState} from 'react';
import classNames from 'classnames';
import { ExtNode } from 'relatives-tree/lib/types';
import styles from './FamilyNode.module.css';
import { style } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

let width = {
  width: "fit-content"
}


export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style}) {

    const [isOpenAdd, setIsOpenAdd] = useState(false);


    function openAddPerson(){
      setIsOpenAdd(true);
    }

    function closeAddPerson() {
      setIsOpenAdd(false);
    }

    
    return (
      <div className={styles.root} style={style} title={node.id}>
        <PersonIcon className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,
            width
          )}
          onClick={openAddPerson}
          />
          <Dialog open={isOpenAdd} onClose={closeAddPerson}>
            <DialogTitle>{node.id} </DialogTitle>
          </Dialog>
      </div>
    );
  }
);