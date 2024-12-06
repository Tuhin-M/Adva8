import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./Blog.css"; // For custom styling

const { Meta } = Card;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Fetch Blogs from Backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/get");
      setBlogs(data);
    } catch (error) {
      message.error("Failed to fetch blogs!");
    }
  };

  const handleAddBlog = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    form.resetFields();
  };

  const handleEditBlog = (record) => {
    setIsModalVisible(true);
    setIsEditing(true);
    setEditingBlogId(record.id);
    form.setFieldsValue(record);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blog/delete/${id}`);
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      message.error("Failed to delete blog!");
    }
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (values.image && values.image.file) {
      formData.append("image", values.image.file.originFileObj);
    }

    try {
      if (isEditing) {
        await axios.put(`/api/blog/update/${editingBlogId}`, formData);
        message.success("Blog updated successfully!");
      } else {
        await axios.post("/api/blog/create", formData);
        message.success("Blog added successfully!");
      }
      fetchBlogs();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save blog!");
    }
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setIsDetailVisible(true);
  };

  return (
    <div className="blog-management-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddBlog}
        style={{ marginBottom: 16 }}
      >
        Add Blog
      </Button>
      <div className="card-container">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            hoverable
            className="blog-card"
            cover={<img alt="blog" src={blog.image || "placeholder.jpg"} />}
            onClick={() => handleCardClick(blog)}
          >
            <Meta
              title={blog.title}
              description={blog.content.slice(0, 50) + "..."}
            />
            <div className="card-actions">
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBlog(blog);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this blog?"
                onConfirm={(e) => {
                  e.stopPropagation();
                  handleDeleteBlog(blog.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger onClick={(e) => e.stopPropagation()}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={isEditing ? "Edit Blog" : "Add Blog"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{ title: "", content: "", image: null }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter blog content" />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Blog" : "Add Blog"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Blog Detail Modal */}
      <Modal
        title={selectedBlog?.title}
        visible={isDetailVisible}
        onCancel={() => setIsDetailVisible(false)}
        footer={null}
      >
        <img
          src={selectedBlog?.image || "placeholder.jpg"}
          alt="Blog"
          style={{ width: "100%", marginBottom: 16 }}
        />
        <p>{selectedBlog?.content}</p>
      </Modal>
    </div>
  );
};

export default BlogManagement;
