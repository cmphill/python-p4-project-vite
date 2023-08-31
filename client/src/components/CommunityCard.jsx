import { useState } from 'react'

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
            <button>Delete</button>
            <button>Update</button>
        </div>
    )
}
export default CommunityCard