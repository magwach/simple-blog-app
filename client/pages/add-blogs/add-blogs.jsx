import { useContext, useEffect } from "react";
import "./add-blogs.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddBlogs() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmitBlog() {
    try {
      if (!formData.title || !formData.description) {
        alert("Please fill in both the title and description fields.");
        return;
      }
      const response = isEdit
        ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state.currItem._id}`, {
            title: formData.title,
            description: formData.description,
          })
        : await axios.post("http://localhost:5000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
          });

      const result = await response.data;
      console.log(result);

      if (!result.message) {
        setIsEdit(false);
        setFormData({
          title: "",
          description: "",
        });
        navigate("/");
      }
    } catch (err) {
      if (err.message) {
        alert(isEdit ? "Error editing the blog. Please check if the server is on!!" : "Error adding the blog. Please check if the server is on!!" );
      }
      navigate(0)
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { currItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: currItem?.title || "",
        description: currItem?.description || "",
      });
    }
  }, [location]);
  return (
    <div className="wrapper">
      <h1>{isEdit ? "Edit Blog" : "Add a Blog"}</h1>
      <div className="form-wrapper">
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          id="description"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          rows={10}
        ></textarea>
        <button onClick={handleSubmitBlog}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
