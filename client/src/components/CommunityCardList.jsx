import CommunityCard from "./CommunityCard";

function CommunityCardList({
    user_id,
    comments,
    deleteComment,
    updateComment,
    }) {

    console.log(comments);
    return (
        <div className="community-card-list">
            <ul>
                {comments.map((comment) => (
                    <CommunityCard
                        comment={comment}
                        user_id={user_id}
                        key={comment.id}
                        content={comment.content}
                        username={comment.users.username}
                        created_at={comment.created_at}
                        updated_at={comment.updated_at}
                        deleteComment={() => deleteComment(comment.id)}
                        updateComment={() => updateComment(comment.id)}
                    />
                ))}
            </ul>

        
        </div>
    )
}

export default CommunityCardList;