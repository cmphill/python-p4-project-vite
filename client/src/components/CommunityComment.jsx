import { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

function CommunityComment({ addComment, user_id, user }) {
  
    const [errors, setErrors] = useState({})

    const formSchema = yup.object().shape({
        comment: yup.string().max(500, 'maxium 500 characters').required("Must enter a comment"),
    });

    const formik = useFormik({
        initialValues: {
        comment: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        fetch("/api/communitycomments", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: values.comment,
                user_id: user_id
            }),
        }).then(res => {
            if (res.ok) {
                res.json().then(values => addComment(values))
                formik.resetForm()
                }
            else {
            res.json().then(errors => {
                console.log("we've got errors")
                setErrors(errors.message)
                console.log(errors)
            })
            }
        })
            
        },
    });


  return (
    <div className="community-comment-form">
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label className="font-bold" htmlFor="comment">New Comment</label>
                <br />
                <textarea style={{resize: "none", width: "20vw"}} className="rounded border-2 border-black" type="text" rows="3" name="comment" placeholder="comment" value={formik.values.comment} onChange={formik.handleChange} />
                {formik.errors.content && formik.touched.content && <div className="error">{formik.errors.content}</div>}
                <br />
                <button type="submit" className="btn border-2 px-5 rounded border-gray-400">Submit</button>
            </div>
        </form>
    </div>
    );
}

export default CommunityComment;