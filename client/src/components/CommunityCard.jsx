import { useState } from 'react'

function CommunityCard({
    key, 
    content, 
    username,
    created_at, 
    updated_at, 
    deleteComment, 
    updateComment}) {
        function handleUpdateComment(updatedComment) {
            updateComment(updatedComment)
        }
        function handleDeleteComment() {
            fetch(`/api/communitycomments/${id}`, {
                method: 'DELETE',
            })
            deleteComment(id)
        }


    return (

        <li>
            
        </li>
    )
}

export default CommunityCard