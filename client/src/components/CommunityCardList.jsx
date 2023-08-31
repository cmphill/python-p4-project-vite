import CommunityCard from "./CommunityCard";

function CommunityCardList() {
    return (
        <div className="community-card-list">
            {.map(card => (
                <CommunityCard key={community.id} user={user} body={body} comment={comment} />
            ))}
        </div>
    )
}

export default CommunityCardList;