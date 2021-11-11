import React, {useState} from 'react';
import classNames from 'classnames';



const styles = require('./FamilyNode.css');
const style = CSS;

export const Gender = {
  male: "male",
  female: "female"
}
export const RelType = {
  blood:"blood",
  married: "married",
  divorced:"divorced",
  adopted: "adopted",
  half: "half"
}
export const FamilyType = {
  root: "root",
  child: "child",
  parent: "parent"
}

const Node = {
  id: String,
  gender: Gender,
  parents: [],
  children: [],
  siblings: [],
  spouses: [],
  placeholder: Boolean
}

export default function FamilyNode() {

  const node = Node;
  const [isRoot, setIsRoot] = useState(false);

    function onSubClick(id) {
        return id;
    }

    return (
      <div className={styles.root} style={style} title={node.id}>
        <div
        className={styles.inner, styles[node.gender], isRoot && styles.isRoot}
        />
        {node.hasSubTree && (
          <div
            onClick={() => onSubClick(node.id)}
            className={styles.sub}
          />
        )}
      </div>
    );
}