import { useState } from 'react'


function CommunityCommentEdit({content, updated_at, updateComment}) {
    const [newComment, setNewComment] = useState(content)

    function handleFormSubmit(e) {
        e.preventDefault()

        fetch(`/api/communitycomments/${comment.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newComment,
                updated_at
            })
        })
            .then((r) => r.json())
            .then((updated_comment) => updateComment(updated_comment))
    }
    return(
        <form className ="edit-message" onSubmit={handleFormSubmit}>
        <input 
         type="text"
         name="comment"
         value={newComment}
         onChange={(e) => setNewComment(e.target.value)}/>
         <input type="submit" value="Save"/>
         </form>
    )
}


export default CommunityCommentEdit

