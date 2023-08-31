import { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

function CommunityComment({ setComment }) {
  
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
      fetch("/api/community-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(res => {
        if (res.ok) {
            res.json().then(values => setComment(values))
            }
        else {
         res.json().then(errors => {
            console.log('we\'ve got errors')
            setErrors(errors.message)
            console.log(errors)
         })
        }
    })
        
    },
  });


  return (
    <div className="CommunityComment">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea style={{resize: "none"}}className="rounded border-b-2 border-black" type="text" rows="3" name="comment" placeholder="comment" value={formik.values.comment} onChange={formik.handleChange} />
            {formik.errors.content && formik.touched.content && <div className="error">{formik.errors.content}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  );
}

export default CommunityComment;