import { useState } from 'react'
import CommunityCommentEdit from "./CommunityCommentEdit"

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

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);

    const handleTextChange = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        fetch(`/api/communitycomments/${comment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({content: text})
        })
        .then(response => {
            if (response.ok) {
                return
            } 
            else {
                response.json().then(errors => console.log(errors))
            }
        })
    };

    function handleDeleteComment() {
        if (user_id === comment.user_id) {
            fetch(`/api/communitycomments/${comment.id}`, {
                method: 'DELETE',
            })
            deleteComment(comment.id)
        }
        else {
            console.error("You are not authorized to delete this comment")
        }
    }
    

    return (
            <div className='community-comments-container bg-red-300 p-3 rounded'>
                <p className='user'>{username}</p>
                <p className='created_at text-xs col-start-3'>{formatted_created_at}</p>
                {isEditing ? <input className="col-span-3 rounded border-black p-1" type="text" value={text} onChange={handleInputChange} onBlur={handleInputBlur} autoFocus /> : 
                <p className='col-span-3 rounded bg-gray-400 border-2 border-black p-1'>{text}</p>}
                {user_id === comment.user_id ? 
                <>
                <button onClick={handleTextChange} className='btn col-start-1 row-start-3 flex justify-center items-center border-2 rounded border-grey-500 m-1.5'>Edit</button>
                <button onClick={handleDeleteComment}className='btn col-start-3 row-start-3 flex justify-center items-center border-2 rounded border-grey-500 m-1.5'>Delete</button>
                </>
                : null
                }
            </div>
    )
}
export default CommunityCard