import React, { useEffect, useRef, useState } from 'react'
import Action from './Action';
import { TiArrowSortedDown } from "react-icons/ti"; 
import { TiArrowSortedUp } from "react-icons/ti";        
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import { toast } from "react-toastify";

const Comment = (
    { 
        comment,
        handleInsertNode,
        handleEditNode,
        handleDeleteNode,
        likedComments,
        setLikedComments,


    }) => {
    const [input,setInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [expand, setExpand] = useState(false);
    const inputRef = useRef(null);

    
    useEffect(()=>{
        inputRef?.current?.focus(); 
    },[editMode])

    const handleAddComment = () => {
        if(editMode){
            handleEditNode(comment.id, inputRef?.current?.innerText);
            setEditMode(false);
        }
        else{
            // console.log("Current level:",comment.level);
            let newLevel = (comment.level) +1;
            // console.log("New level:",newLevel);

            setExpand(true);//comments will be visible
            handleInsertNode(comment.id, input,newLevel);
            setShowInput(false);
            setInput("");
        }    


    }
    const handleNewComment = ()=> {
        
        setShowInput(true);
        setExpand(!expand);
    }

    const handleDelete = () =>{
        handleDeleteNode(comment.id);
    }
    const likeHandler = () =>{
        if(likedComments.includes(comment.id)){
            // already liked: unlike it
            setLikedComments( (prev)=> prev.filter((cmtId)=> (cmtId !== comment.id)))
            toast.warning("Like Removed!");
        }
        else{
            //make this comment liked
            if(likedComments.length === 0)
                setLikedComments([comment.id]);
            else
                setLikedComments( (prev)=> [...prev, comment.id]);
            toast.success("Liked Successfully!");
        }
    }



  return (
    <div >
        <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
            {comment.id === 1 ? 
            (
                <div className='flex flex-col'>
                    <textarea
                        type="text"
                        className='inputContainer__input first_input resize rounded-md max-w-[10/12]'
                        autoFocus
                        value={input}
                        onChange={(e)=> setInput(e.target.value)}
                        placeholder='...enter Text'
                    />
                    <div className='w-fit ml-auto mt-3'>
                        <Action 
                            className="reply comment"
                            btnText="POST"
                            handleClick={handleAddComment}
                        />
                    </div>
                    <div className='flex flex-row items-end'>
                        <span>Replies</span>
                        <div>

                        </div>
                    </div>
                </div>
            )
            :(
                <>
                    <span 
                        style={{wordWrap:"break-word"}}
                        contentEditable={editMode}
                        suppressContentEditableWarning = {editMode}
                        ref = {inputRef}
                        >
                            {comment.desc}
                    </span>
                    <div style={{display:"flex", marginTop:"5px"}}>
                        {
                            editMode ? (
                            <>
                                <Action 
                                    className={"reply"} 
                                    btnText={"SAVE"}
                                    handleClick={handleAddComment}    
                                />
                                <Action 
                                    className={"reply"} 
                                    btnText={"CANCEL"}
                                    handleClick={() =>{
                                        if(inputRef?.current){
                                            inputRef.current.innerText = comment.desc;
                                        }
                                        setEditMode(false);
                                    } }
                                />
                            </>
                            ):
                            (
                                <>
                                <Action 
                                    className={"reply"} 
                                    btnText={
                                        <div className='flex gap-x-1'>
                                        {
                                            expand ? (
                                                <TiArrowSortedDown/>
                                            ):
                                            (
                                                <TiArrowSortedUp />
                                            )
                                        }REPLY
                                        </div>
                                    }
                                    handleClick={handleNewComment}                                    
                                />
                                <Action 
                                    className={"reply"} 
                                    btnText={"EDIT"}
                                    handleClick={() =>{
                                        setEditMode(true);
                                    } }
                                />
                                <Action 
                                    className={"reply"} 
                                    btnText={"DELETE"}
                                    handleClick={handleDelete}
                                />
                                 <div  className="rounded-full bg-white w-[30px] h-[30px] 
                                flex justify-center "
                                >
                                    <button onClick={likeHandler}>
                                        {likedComments.includes(comment.id) ? (
                                            <FcLike fontSize="1 rem "  />
                                            ) : (
                                                <FcLikePlaceholder fontSize="1 rem" className='white' />
                                            )}
                                    </button>
                                </div>


                                
                            </>
                            )
                        }
                    </div>
                </>
            )}
        </div>
        
        <div style={{ display: expand ? "block":"none",paddingLeft : 25}}>
            {
                showInput ? 
                (
                    <div className='inputContainer'>
                        <input
                            type='text' 
                            className='inputContainer__input'
                            autoFocus
                            onChange={(e)=>{setInput(e.target.value)}}
                        />
                        <Action 
                            className="reply" 
                            btnText="REPLY"
                            handleClick={handleAddComment}
                        />
                        <Action 
                            className="reply" 
                            btnText="CANCEL"
                            handleClick={()=>{
                                setShowInput(false)
                                if(comment?.items?.length === 0)
                                    setExpand(false);
                            }}
                        />
                    </div>
                ):(<div></div>)
            }
            {
                comment?.items?.map((cmnt) => {
                    return <Comment 
                            key={cmnt.id} 
                            comment={cmnt}
                            handleInsertNode={handleInsertNode}
                            handleEditNode={handleEditNode}
                            handleDeleteNode={handleDeleteNode}
                            likedComments = {likedComments}
                            setLikedComments = {setLikedComments}
                        />
                })
                }
        </div>
        


    </div>
  )
}

export default Comment