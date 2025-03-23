import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    try {
      setPending(true);
      const response = await axios.get("http://localhost:5000/api/blogs");
      const result = await response.data;

      if (result && result.blogList && result.blogList.length) {
        setBlogList(result.blogList);
        setPending(false);
      } else {
        setPending(false);
      }
    } catch (err) {
      if (err.message) {
        alert("Please make sure the server is on!!");
      }
    }
  }

  async function handleDeleteBlog(currId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/delete/${currId}`
      );
      const result = await response.data;
      if (!result.error) {
        navigate(0);
      }
    } catch {
      alert("Please make sure the server is on!!");
    }
  }

  async function handleEdit(currItem) {
    navigate("/add-blog", { state: { currItem } });
  }
  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={pending ? "pending" : ""}>
      <h3 className="blog-header">Blog List</h3>
      {pending ? (
        <AiOutlineLoading3Quarters
          style={{
            fontSize: "4rem",
            animation: "spin 1s linear infinite",
          }}
        />
      ) : blogList && blogList.length ? (
        <div className="blog-cards">
          {blogList.map((item) => (
            <div key={item._id}>
              <p className="blog-title">{item.title}</p>
              <p className="blog-description">{item.description}</p>
              <div className="icons">
                <FaEdit
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(item)}
                  className="edit"
                />
                <FaTrash
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteBlog(item._id)}
                  className="trash"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="error-message">No blogs found</h3>
      )}
    </div>
  );
}
