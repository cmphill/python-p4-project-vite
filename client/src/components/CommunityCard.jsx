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
    
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formatted_created_at = formatter.format(new Date (created_at));
        
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
            <div className='community-comments-container bg-red-300 p-3 rounded'>
                <p className='user'>{username}</p>
                <p className='created_at col-start-3'>{formatted_created_at}</p>
                <p className='col-span-3 rounded bg-gray-400 border-2 border-black p-1'>{content}</p>
                <button className='btn col-start-1 row-start-3 flex justify-center items-center border-2 rounded border-grey-500 m-1.5'>Update</button>
                <button className='btn col-start-3 row-start-3 flex justify-center items-center border-2 rounded border-grey-500 m-1.5'>Delete</button>
            </div>
    )
}
export default CommunityCard