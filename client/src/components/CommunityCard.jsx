import { useState } from 'react'
import EditCommunityComment from ''

function CommunityCard({
    comment,
    user_id, 
    content, 
    username,
    created_at, 
    updated_at, 
    deleteComment, 
    updateComment}) {
        
        
    function handleUpdateComment(updatedComment) {
        if (user_id === comment.user_id) {
            <EditCommunityComment updateComment={updateComment} id={comment.id} content={content} updated_at={updated_at}/>
            updateComment(updatedComment)
        }
        else {
            error("You are not authorized to update this comment")
        }
    }
    function handleDeleteComment() {
        if (user_id === comment.user_id) {
            fetch(`/api/communitycomments/${id}`, {
                method: 'DELETE',
            })
            deleteComment(id)
        }
        else {
            error("You are not authorized to delete this comment")
        }
    }
    

    return (

        <div>
            <span className='user'>{username}</span>
            <span className='created_at'>{created_at}</span>
            <p>{content}</p>
            <button onClick={handleDeleteComment}>Delete</button>
            <button onClick={handleUpdateComment}>Update</button>
        </div>
    )
}
export default CommunityCard