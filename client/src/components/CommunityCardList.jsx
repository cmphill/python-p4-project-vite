import CommunityCard from "./CommunityCard";

function CommunityCardList({
    comments,
    deleteComment,
    updateComment,
}) {
    return (
        <div className="community-card-list">
            <ul>
                {comments.map((comment) => (
                    <CommunityCard
                        key={comment.id}
                        content={comment.content}
                        username={comment.user.username}
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