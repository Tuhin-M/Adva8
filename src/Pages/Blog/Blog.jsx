import React, { useEffect, useState } from "react";
import { storage } from "../../../firebaseConfig";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Popconfirm,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Blog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Title } = Typography;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/get");
      setBlogs(data.blogs);
    } catch (error) {
      message.error("Error fetching blogs");
    }
  };

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (values) => {
    const payload = { ...values, image: imageUrl, userRef: currentUser._id };
    try {
      if (editingBlog) {
        await axios.post(`/api/blog/update/${editingBlog._id}`, payload);
        message.success("Blog updated successfully");
      } else {
        await axios.post("/api/blog/create", payload);
        message.success("Blog created successfully");
      }
      fetchBlogs();
      setIsModalOpen(false);
      setEditingBlog(null);
      setImageUrl("");
      form.resetFields();
    } catch (error) {
      message.error("Error saving blog");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog/delete/${id}`);
      message.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      message.error("Error deleting blog");
    }
  };

  const openEditModal = (blog, e) => {
    e.stopPropagation();
    setEditingBlog(blog);
    form.setFieldsValue(blog);
    setImageUrl(blog.image || "");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setImageUrl("");
    form.resetFields();
  };

  const handleFileUpload = async (file) => {
    if (file.size > 1024 * 1024) {
      message.error(`File size exceeds 1MB limit for file: ${file.name}`);
      return false;
    }

    try {
      const storageRef = ref(storage, `blog-images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      return false;
    } catch (error) {
      message.error(`Error uploading file ${file.name}`);
      return false;
    }
  };

  const getShortTitle = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    return strippedContent.length > 30
      ? strippedContent.substring(0, 30) + "..."
      : strippedContent;
  };

  const getShortContent = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    return strippedContent.length > 120
      ? strippedContent.substring(0, 120) + "..."
      : strippedContent;
  };

  return (
    <div
      className="blog-container"
      style={{
        padding: "2rem",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
      }}
    >
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ marginBottom: "2rem" }}
      >
        <Col xs={24} sm={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              background: "linear-gradient(45deg, #56BBB3, #0d8b84)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Blog Management
          </Title>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: "right" }}>
          {userRole !== "0" && (
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "linear-gradient(45deg, #56BBB3, #0d8b84)",
                border: "none",

                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                padding: "0 2rem",
                height: "48px",
              }}
            >
              Add Blog
            </Button>
          )}
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {blogs.map((blog) => (
          <Col xs={24} md={12} lg={8} key={blog._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                hoverable
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="blog-card"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",

                  boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "none",
                }}
                cover={
                  blog.image && (
                    <div style={{ height: "250px", overflow: "hidden" }}>
                      <img
                        src={blog.image}
                        alt="Blog"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </div>
                  )
                }
                extra={
                  userRole !== "0" && (
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={(e) => openEditModal(blog, e)}
                          style={{
                            background:
                              "linear-gradient(45deg, #56BBB3, #0d8b84)",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col>
                        <Popconfirm
                          title="Delete Blog"
                          description="Are you sure you want to delete this blog?"
                          onConfirm={(e) => {
                            e.stopPropagation();
                            handleDelete(blog._id);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              borderRadius: "8px",
                              background:
                                "linear-gradient(45deg,#ff8f8f,#ff4d4f)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  )
                }
              >
                <Title
                  level={4}
                  style={{ marginBottom: "1rem", color: "#56BBB3" }}
                >
                  {getShortTitle(blog.title)}
                </Title>
                <div
                  style={{
                    color: "#666",
                    fontSize: "16px",
                    marginBottom: "1rem",
                    flex: 1,
                  }}
                >
                  {getShortContent(blog.content)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    background: "linear-gradient(45deg, #56BBB3, #0d8b84)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    cursor: "pointer",
                    marginTop: "auto",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  Read more →
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Modal
        title={
          <Title
            level={3}
            style={{
              margin: 0,
              background: "linear-gradient(45deg, #56BBB3, #0d8b84)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {editingBlog ? "Edit Blog" : "Add Blog"}
          </Title>
        }
        open={isModalOpen}
        onCancel={() => handleModalClose()}
        footer={null}
        width={800}
        style={{ borderRadius: "16px" }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input
                  size="large"
                  style={{ borderRadius: "12px", border: "2px solid #56BBB3" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: "Please enter content" }]}
              >
                <ReactQuill
                  theme="snow"
                  style={{
                    height: "200px",
                    marginBottom: "50px",
                    borderRadius: "12px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Upload Blog Image" name="blogImage">
                <Upload.Dragger
                  beforeUpload={handleFileUpload}
                  showUploadList={false}
                  style={{
                    borderRadius: "12px",
                    padding: "2rem",
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                    border: "2px dashed #56BBB3",
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined
                      style={{ color: "#56BBB3", fontSize: "24px" }}
                    />
                  </p>
                  <p className="ant-upload-text" style={{ color: "#56BBB3" }}>
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
                {imageUrl && (
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={imageUrl}
                      alt="Blog image"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                      }}
                    />
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                style={{
                  background: "linear-gradient(45deg, #56BBB3, #0d8b84)",
                  border: "none",
                  borderRadius: "12px",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "500",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                }}
              >
                {editingBlog ? "Update Blog" : "Create Blog"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
export default Blog;
