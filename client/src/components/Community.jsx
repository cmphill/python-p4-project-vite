import {useEffect, useState} from 'react';
import CommunityCardList from './CommunityCardList';
import CommunityComment from './CommunityComment';
function Community() {
    return (
        <div>
        <h1>testing</h1>
        <CommunityCardList />
        <CommunityComment />
        </div>
    );

}

export default Community;



// class CommunityComment(db.Model, SerializerMixin):
//     __tablename__ = 'community_comments'

//     id = db.Column(db.Integer, primary_key=True)
//     content = db.Column(db.String, nullable=False)
//     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
//     created_at = db.Column(db.DateTime, server_default=db.func.now())
//     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
//     @validates("content")
//     def validate_content(self, key, value):
//         if len(value) < 0 and len(value) > 500:
//             raise ValueError("Content must be between 0 and 500 characters")
//         return value

//     serialize_rules = ("-users.community_comments","-users.trip_comments","-users._password_hash",)

// api.add_resource(TripComments, '/tripcomments', endpoint="tripcomments")
// api.add_resource(TripCommentById, "/tripcomments/<int:id>", endpoint="tripcommentById")
// api.add_resource(CommunityComments, '/communitycomments', endpoint="communitycomments")
// api.add_resource(CommunityCommentById, '/communitycomments/<int:id>', endpoint="communitycommentById")