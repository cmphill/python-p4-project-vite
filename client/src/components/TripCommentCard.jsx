import { useState } from 'react'

function TripCommentCard({data,}) {
    const user_id = "not gonan work"
    console.log(data);
    const { content, created_at} = data
    const username = data.users.username
    // {
    // comment,
    // user_id, 
    // content, 
    // username,
    // created_at, 
    // updated_at, 
    // deleteComment, 
    // updateComment}
    
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



    function handleDeleteComment() {
        if (user_id === data.user_id) {
            fetch(`/api/communitycomments/${data.id}`, {
                method: 'DELETE',
            })
            deleteComment(data.id)
        }
        else {
            console.error("You are not authorized to delete this comment")
        }
    }
    

    return (
            <div className='trip-info-comments-container bg-red-400 p-3 rounded'>
                <p className='user text-gray-800'>{username}</p>
                <p className='created_at text-xs col-start-3 text-gray-800'>{formatted_created_at}</p>
                <p className='col-span-3 rounded bg-gray-200 text-gray-800 border-2 border-black p-1'>{content}</p>
                {user_id === data.user_id ? 
                <>
                <button onClick={handleDeleteComment} className='btn1 text-gray-800 col-start-3 row-start-3 flex justify-center items-center border-2 rounded border-gray-800 m-1.5'>Delete</button>
                </>
                : null
                }
            </div>
    )
}
export default TripCommentCard