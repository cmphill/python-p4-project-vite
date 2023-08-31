import CommunityCard from "./CommunityCard";

export default function CommunityCardList({
    user_id,
    comments,
    deleteComment,
    updateComment,
    }) {

    return (
        <div className="community-card-list flex flex-col items-center gap-3">
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
        </div>
    )
}

