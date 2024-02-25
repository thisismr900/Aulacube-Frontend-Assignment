import './styles.css';
import { useState } from 'react';
import Comment from './components/Comment';
import useNode from './hooks/useNode';
import { toast } from 'react-toastify';

// HARDCODED DATA
// const comments = {
//   id : 1,
//   items : [
//     {
//       id:1234567,
//       desc: "comment level 1",
//       items: [
//         {
//           id: 87654930,
//           desc: "comment level 2",
//           items : []
//         },
//         {
//           id: 48573309,
//           desc: "another comment level 2",
//           items : [
//             {
//               id: 94534753,
//               desc : "comment level 3",
//             }
//           ]
//         },
//       ]
//     },
//   ]
// }
const comments = {
  id : 1,
  items : [],
  level : 0
}

function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const [likedComments, setLikedComments] = useState([]);
  const {insertNode, editNode, deleteNode} = useNode();

  const handleInsertNode = (folderId, text, newLevel) => {
    // pass whole tree str : commentsData
    // insert new comment as node to commentId: folderId
    if(newLevel >3){
      toast.error("Max nesting allowed is 3");
      return;
    }
    const updatedStructure = insertNode(commentsData, folderId, text, newLevel);
    setCommentsData(updatedStructure);
  }

  const handleEditNode = (folderId, value) => {
    const updatedStructure = editNode(commentsData, folderId, value);
    setCommentsData(updatedStructure);
  }

  const handleDeleteNode = (folderId) => {
    const updatedStructure = deleteNode(commentsData, folderId);
    setCommentsData({...updatedStructure});
  }


  return (
    <div className="App">

      What's on your mind ?

      <div >
        <Comment 
          comment = {commentsData}        
          handleInsertNode = {handleInsertNode}
          handleEditNode = {handleEditNode}
          handleDeleteNode = {handleDeleteNode}
          likedComments={likedComments}
          setLikedComments={setLikedComments}
          />
      </div>
    </div>
  );
}

export default App;
