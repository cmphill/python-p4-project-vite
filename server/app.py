#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource, Api
from datetime import datetime
# Local imports
from config import app, api, db

# Add your model imports
from models import User,Trip, Signup, TripComment, CommunityComment

api = Api(app)
# Views go here!


@app.before_request
def check_if_logged_in():
    open_access_list=[
        "login", "logout", "check_session", "communitycomments","tripbyid", "users", "userbyid", "trips"
    ]

    if (request.endpoint) not in open_access_list and (not session.get("user_id")):
        return {"error": "app before req 401 Unauthorized"}, 401
    # else: 
    #     return {"message" : session.get("user_id")}, 200

class Index(Resource):
    def get(self):
        return make_response('<h1>Phase 4 Project Server</h1>', 200)

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return users, 200
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        password_confirmation = data["password_confirmation"]
        age = data["age"]
        location = data["location"]
        personal_bio = data["bio"]
        image_url = data["image_url"]

        if username and password == password_confirmation and age and location:
            newUser = User(username=username, age=int(age),location=location,personal_bio=(personal_bio if personal_bio else ""), image_url=image_url, distance_traveled=0)
            newUser.password_hash = password
            db.session.add(newUser)
            db.session.commit()
            session["user_id"] = newUser.id

            return newUser.to_dict(rules=('-_password_hash',)), 201
        else:
            return {'error': 'Could not create new user'}, 422

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Could not find user'}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                for attr in request.get_json():
                    setattr(user, attr, request.get_json()[attr])

                db.session.add(user)
                db.session.commit()
                return user.to_dict(rules=('-_password_hash',)), 200
            
            except:
                return {'error': 'Could not update user'}, 422
        else:
            return {'error': 'Could not find user'}, 404
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Could not find user'}, 404




class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Could not find user'}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                for attr in request.get_json():
                    setattr(user, attr, request.get_json()[attr])

                db.session.add(user)
                db.session.commit()
                return user.to_dict(rules=('-_password_hash',)), 200
            
            except:
                return {'error': 'Could not update user'}, 422
        else:
            return {'error': 'Could not find user'}, 404
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Could not find user'}, 404

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return user.to_dict(), 200
    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        # need to work on patch funcionality
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 200
api.add_resource(UserById, '/users/<int:id>')

class Trips(Resource):
    def get(self):
        trips = [t.to_dict() for t in Trip.query.all()]
        
        for t in trips:
            u = User.query.filter_by(id=t["owner_id"]).first()
            t["owner_name"] = u.username

        return trips, 200
    def post(self):
        data = request.get_json()
        name = data['name']
        decsription = data['description']
        location = data['location']
        distance = data['distance']
        time_start = data['time_start']
        time_end = data['time_end']
        image_url = data['image_url']
        owner_id = session.get("user_id")
        

        if image_url and owner_id and name and decsription and time_start and time_end and location and distance:
            newTrip = Trip(
                name = name,
                description = decsription,
                owner_id = owner_id,
                location = location,
                distance = int(distance),
                time_start = datetime.strptime(time_start, "%Y-%m-%d %H:%M:%S.%f"),
                time_end = datetime.strptime(time_end, "%Y-%m-%d %H:%M:%S.%f"),
                image_url = image_url
            )
            db.session.add(newTrip)
            db.session.commit()

            newSignup = Signup(user_id = owner_id, trip_id = newTrip.id)

            db.session.add(newSignup)
            db.session.commit()

            return newTrip.to_dict(), 201


class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter_by(id=id).first()
        if trip:
            return trip.to_dict(), 200
        else:
            return {'error': 'Could not find trip'}, 404
    def patch(self, id):
        trip = Trip.query.filter_by(id=id).first()
        if trip:
            try:
                for attr in request.get_json():
                    setattr(trip, attr, request.get_json()[attr])

                db.session.add(trip)
                db.session.commit()
                return trip.to_dict(), 200
            
            except:
                return {'error': 'Could not update trip'}, 422
        else:
            return {'error': 'Could not find trip'}, 404
    def delete(self, id):
        trip = Trip.query.filter_by(id=id).first()
        if trip:
            db.session.delete(trip)
            db.session.commit()

            return '', 204
        else:
            return {'error': 'Could not find trip'}, 404


class Signups(Resource):
    def get(self):
        signups = [s.to_dict() for s in Signup.query.all()]
        return signups, 200

class SignupById(Resource):
    def get(self, id):
        singup = Signup.query.filter_by(id=id).first()
        if singup:
            return singup.to_dict(), 200
        else:
            return {'error': 'Could not find signup'}, 404

class TripComments(Resource):
    def get(self):
        comments = [c.to_dict() for c in TripComment.query.all()]
        return comments, 200

class TripCommentById(Resource):
    def get(self, id):
        comment = TripComment.query.filter_by(id=id).first()
        if comment:
            return comment.to_dict(), 200
        else:
            return {"error": "Could not find comment"}, 404
    def patch(self, id):
        comment = TripComment.query.filter_by(id=id).first()
        if comment:
            try:
                for attr in request.get_json():
                    setattr(comment, attr, request.get_json()[attr])
                    db.session.add(comment)
                    db.session.commit()
                    return comment.to_dict(), 200
            except:
                return {"error": "Could not update comment"}, 422
        else:
            return {"error": "Could not find comment"}, 404

class CommunityComments(Resource):
    def get(self):
        comments = [c.to_dict() for c in CommunityComment.query.all()]
        return comments, 200
    def post(self):
        data = request.get_json()
        print(data)
        user_id = data["user_id"]
        content = data["comment"]
        if user_id and content:
            newComment = CommunityComment(user_id=user_id, content=content)

            db.session.add(newComment)
            db.session.commit()

            return newComment.to_dict(), 201
        else: 
            return {"error": "Could not create a new comment"}, 422

class CommunityCommentById(Resource):
    def get(self, id):
        comment = CommunityComment.query.filter_by(id=id).first()
        if comment:
            return comment.to_dict(), 200
        else:
            return {'error': 'Could not find community comment'}, 404
    
    def patch(self, id):
        comment = CommunityComment.query.filter_by(id=id).first()
        if comment:
            data = request.get_json()
            try: 
                for attr in request.get_json():
                    setattr(comment, attr, request.get_json()[attr])
                db.session.add(comment)
                db.session.commit()

                return comment.to_dict(), 202
            except:
                return {'error': 'Could not update community comment'}, 422
        else:
            return {'error': 'Could not find community comment'}, 404
    
    def delete(self, id):
        comment = CommunityComment.query.filter_by(id=id).first()
        if comment:
            db.session.delete(comment)
            db.session.commit()

            return "", 204
        else:
            return {'error': 'Could not find community comment'},

class CheckSessions(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter_by(id=session.get("user_id")).first()

            return user.to_dict(rules=("-_password_hash",)), 200
        return {}, 401
    
class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        user = User.query.filter_by(username=username).first()
        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(rules=("-password_hash",)), 200
        return {"error": "401 Unautorized"}, 401
    
class Logout(Resource):
    def delete(post):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        return {"Error": "Unauthorize"}


api.add_resource(Index, '/', endpoint="index")
api.add_resource(Users, '/users', endpoint="users") # THIS IS WHERE USER SIGNUP TOO
api.add_resource(UserById, '/users/<int:id>', endpoint="userById")
api.add_resource(Trips, '/trips', endpoint="trips")
api.add_resource(TripById, '/trips/<int:id>', endpoint="tripbyid")
api.add_resource(Signups, '/signups', endpoint="signups")
api.add_resource(SignupById, '/signups/<int:id>', endpoint="signupbyid")
api.add_resource(TripComments, '/tripcomments', endpoint="tripcomments")
api.add_resource(TripCommentById, "/tripcomments/<int:id>", endpoint="tripcommentbyid")
api.add_resource(CommunityComments, '/communitycomments', endpoint="communitycomments")
api.add_resource(CommunityCommentById, '/communitycomments/<int:id>', endpoint="communitycommentbyid")
api.add_resource(CheckSessions, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")





if __name__ == '__main__':
    app.run(port=5555, debug=True)

