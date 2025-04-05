"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import {
  saveBlog,
  updateBlog,
} from "../../../lib/services/BlogService/BlogsService";
import { Button } from "@mui/material";

const BlogModal = ({ onCloseModal, onBlogSave, editBlog }) => {
  const editorRef = useRef();
  const [blogData, setBlogData] = useState({
    blogTopic: "",
    blogCategory: "",
    keywords: "",
    uploadImage: null,
    videoUrl: "",
    blogDescription: "",
    status: "Draft",
  });

  const handleDescriptionChange = () => {
    const editorInstance = editorRef.current.getInstance();
    const description = editorInstance.getHTML();
    setBlogData({ ...blogData, blogDescription: description });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "uploadImage") {
      setBlogData({ ...blogData, uploadImage: e.target.files[0] });
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  useEffect(() => {
    if (editBlog && Object.keys(editBlog).length > 0) {
      setBlogData({
        blogTopic: editBlog.blogTopic || "",
        blogCategory: editBlog.blogCategory || "",
        keywords: editBlog.keywords ? editBlog.keywords.join(", ") : "",
        uploadImage: null,
        videoUrl: editBlog.videoUrl || "",
        blogDescription: editBlog.blogDescription || "",
        status: editBlog.status || "Draft",
      });
    }
  }, [editBlog]);

  const handleSubmit = async (status) => {
    try {
      const updatedBlogData = { ...blogData, status };
      updatedBlogData.keywords = updatedBlogData.keywords
        .split(",")
        .map((keyword) => keyword.trim());
      let newBlog;
      if (editBlog) {
        // If we're editing, update the blog
        newBlog = await updateBlog(editBlog._id, updatedBlogData);
      } else {
        console.log(blogData, "blogData");
        newBlog = await saveBlog(blogData, status);
      }
      onBlogSave(newBlog);
      onCloseModal();
    } catch (error) {
      console.error("Error saving blog:", error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <div className="modal-container">
        <div className="">
          <button onClick={onCloseModal} className="close-modal-btn">
            <IoMdClose size={25} style={{ color: "black" }} />
          </button>
        </div>
        <h2 className="heading my-3">{editBlog ? "Edit Blog" : "Add Blog"}</h2>
        <form className="d-flex flex-column gap-3" onSubmit={handleFormSubmit}>
          <input
            placeholder="Blog Topic"
            id="blogtopic"
            className="p-2 border rounded"
            name="blogTopic"
            value={blogData.blogTopic}
            onChange={handleChange}
          />
          <select
            id="blogcategory"
            name="blogCategory"
            className="p-2 border rounded"
            value={blogData.blogCategory}
            onChange={handleChange}
          >
            <option value="AllCategories">Select Category</option>
            <option value="Artifical Intelligence">
              Artifical Intelligence
            </option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Onsite SEO">Onsite SEO</option>
            <option value="Social Media">Social Media</option>
          </select>
          <input
            placeholder="Blog keywords"
            id="keywords"
            className="p-2 border rounded"
            name="keywords"
            value={blogData.keywords}
            onChange={handleChange}
          />

          <input
            placeholder="Upload Image"
            type="file"
            id="uploadimage"
            name="uploadImage"
            className="p-2 border rounded"
            onChange={handleChange}
          />

          <Editor
            ref={editorRef}
            initialValue="Write something amazing..."
            previewStyle="vertical"
            height="200px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            value={blogData.blogDescription}
            onChange={handleDescriptionChange}
          />

          <div className="d-flex flex-row align-items-center gap-3 my-2">
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
              className="d-flex cursor-pointer"
              onClick={() => handleSubmit("Draft")}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
              className="d-flex  cursor-pointer"
              onClick={() => handleSubmit("Published")}
            >
              Save & Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
