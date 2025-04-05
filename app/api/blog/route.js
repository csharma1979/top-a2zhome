import dbConnect from "../../../src/lib/database";
import Blog from "../../../src/Models/Blog/BlogModal";
import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import slugify from "slugify";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const uploadMiddleware = upload.single("uploadImage");

export async function POST(req) {
  try {
    await dbConnect();

    // Get form data
    const formData = await req.formData();
    //console.log("Received FormData:", formData);

    const blogTopic = formData.get("blogTopic");
    const blogCategory = formData.get("blogCategory");
    const keywords = formData.get("keywords")?.split(",").map((kw) => kw.trim()) || [];
    const videoUrl = formData.get("videoUrl") || "";
    const blogDescription = formData.get("blogDescription");
    const status = formData.get("status") || "Draft";
    const file = formData.get("uploadImage"); // Get uploaded file

    if (!blogTopic || typeof blogTopic !== "string" || blogTopic.trim() === "") {
      return NextResponse.json(
        { message: "Blog topic is required and must be a valid string" },
        { status: 400 }
      );
    }

    let uploadImage = "";
    if (file && file.name) {
      const uploadDir = "public/uploads";
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists
      const filePath = `${uploadDir}/${Date.now()}${path.extname(file.name)}`;
      const bytes = await file.arrayBuffer(); // Convert to Buffer
      await fs.writeFile(filePath, Buffer.from(bytes));
      uploadImage = filePath.replace("public/", ""); // Store relative path
    }

    const slug = slugify(blogTopic.trim(), { lower: true, strict: true });

    const newBlog = new Blog({
      blogTopic,
      slug,
      blogCategory,
      keywords,
      uploadImage,
      videoUrl,
      blogDescription,
      status,
    });

    const savedBlog = await newBlog.save();
    return NextResponse.json(
      { message: "Blog saved successfully", data: savedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}


export const GET = async () => {
  try {
    await dbConnect();
    const blogs = await Blog.find();
    return NextResponse.json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
    
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};


export async function PUT(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    console.log("Received FormData:", formData);

    const id = formData.get("id"); // Get the Blog ID
    if (!id) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blogTopic = formData.get("blogTopic");
    const blogCategory = formData.get("blogCategory");
    const keywords = formData.get("keywords")?.split(",").map((kw) => kw.trim()) || [];
    const videoUrl = formData.get("videoUrl") || "";
    const blogDescription = formData.get("blogDescription");
    const status = formData.get("status") || "Draft";
    const file = formData.get("uploadImage"); // Uploaded file

    // Ensure the blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let uploadImage = existingBlog.uploadImage; // Keep existing image if no new file is uploaded
    if (file && file.name) {
      const uploadDir = "public/uploads";
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists
      const filePath = `${uploadDir}/${Date.now()}${path.extname(file.name)}`;
      const bytes = await file.arrayBuffer(); // Convert file to Buffer
      await fs.writeFile(filePath, Buffer.from(bytes));
      uploadImage = filePath.replace("public/", ""); // Store relative path
    }

    const updatedData = {
      blogTopic,
      slug: slugify(blogTopic, { lower: true, strict: true }),
      blogCategory,
      keywords,
      uploadImage,
      videoUrl,
      blogDescription,
      status,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
    return NextResponse.json(
      { message: "Blog updated successfully", data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}


// DELETE - Delete a blog by ID
export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url); // Extract query parameters
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Blog ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
};
