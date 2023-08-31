import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"


export default function CreateTripComment({ user, trip }) {
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({})

    const formSchema = yup.object().shape({
        content: yup.string().min(1, "Must contain text").max(500, "May not exceed 500 characters").required("Required"),
    })

    const formik = useFormik({
        initialValues: {
            content: "",
            user_id: user.id,
            trip_id: trip.trip_id
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('posting comment:', values)
            fetch('api/tripcomments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            }).then( res => {
                if (res.ok) {
                    res.json().then(post => setBody(post))
                    }
                
                else {
                    res.json().then(errors => {
                        console.log('we\'ve sprung an error')
                        setErrors(errors.message)
                        console.log(errors)
                     })
                 }
            })
        }
    })
    return (
        <div className="TripComment">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" id="content" rows="3" onChange={formik.handleChange} value={formik.values.content}></textarea>
                    {formik.errors.content && formik.touched.content && <div className="error">{formik.errors.content}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}


















// class TripComment(db.Model, SerializerMixin):
//     __tablename__ = 'trip_comments'

//     id = db.Column(db.Integer, primary_key=True)
//     content = db.Column(db.String, nullable=False)
//     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
//     trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))
//     created_at = db.Column(db.DateTime, server_default=db.func.now())
//     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

//     @validates("content")
//     def validate_content(self, key, value):
//         if len(value) < 0 and len(value) > 500:
//             raise ValueError("Content must be between 0 and 500 characters")
//         return value

//     serialize_rules = ("-users.trip_comments", "-trips.trip_comments","-users.signups", "-trips.signups",)
//     @validates("content")
//     def validate_content(self, key, value):
//         if len(value) < 0 and len(value) > 500:
//             raise ValueError("Content must be between 0 and 500 characters")
//         return value

//     serialize_rules = ("-users.trip_comments", "-trips","-users.signups","-users._password_hash","-users.community_comments",)

// api.add_resource(TripComments, '/tripcomments', endpoint="tripcomments")
// api.add_resource(TripCommentById, "/tripcomments/<int:id>", endpoint="tripcommentById")