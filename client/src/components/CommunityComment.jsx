import { useFormik } from "formik";
import * as yup from "yup";

function CommunityComment({ user }) {
  const [comment, setComment] = useState("");

  const formSchema = yup.object().shape({
    comment: yup.string().max(500, 'maxium 500 characters').required("Must enter a comment"),
  });

  const formik = useFormik({
    initialValues: {
      comment,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/tripcomments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
  });

  const errors = formik.errors;

  return (
    <form onSubmit={formik.handleSubmit}>
      {errors.comment && <h3 style={{ color: "red" }}>{errors.comment.toUpperCase()}</h3>}
      <input
        type="text"
        value={comment}
        onChange={formik.handleChange("comment")}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommunityComment;