import { useState } from 'react'

function CommunityCard({user, comment}) {

    return (

        <div className="community-card">
            <span>{user.username}</span>
            <span>{comment.created_at}</span>
            <p>{comment.updated_at}</p>
            <p>{comment.body}</p>


        </div>
    )
}

export default CommunityCard