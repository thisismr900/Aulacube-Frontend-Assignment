import { toast } from "react-toastify";

const useNode = () => {
    const insertNode = function (tree, targetCommentId, text, newLevel){
        console.log("inserting comment at level:",newLevel);
       
        if(tree.id === targetCommentId){
            const currLevel = tree.level;
            if(currLevel >= 3)
            {
                toast.error("Only 3 level Comment allowed! ");
                return tree;
            }
            tree.items.push({
                id: new Date().getTime(),
                desc: text,
                items:[],
                like:false,
                level : newLevel,
            });
        return tree;
        }
        
        let updatedStructure = [];
        updatedStructure = tree?.items?.map((obj)=>{
            return insertNode(obj, targetCommentId, text);
        })
        return {...tree, items:updatedStructure};
    }
    
    
    const editNode = function (tree, targetCommentId, text, commentLiked){
        if(tree.id === targetCommentId){
            tree.desc = text;
            tree.like = commentLiked;
            return tree;
        }
        tree?.items?.map((obj)=>{
            return editNode(obj, targetCommentId, text);
        })
        return {...tree, }
    }
    
    
    const deleteNode = function (tree, id){
        for(let i=0; i<tree.items.length; i++){
            const currentItem = tree.items[i];
            if(currentItem.id === id){
                tree.items.splice(i,1);
                return tree;
            }
            else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    }
    
  return {insertNode, editNode, deleteNode};
}

export default useNode;