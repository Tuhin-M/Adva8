import React, { useEffect, useState } from 'react';
import { storage } from "../../../firebaseConfig";
import { Button, Modal, Form, Input, message, Upload, Popconfirm, Row, Col, Card } from 'antd';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import axios from 'axios';
import './Blog.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Blog.css';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/get');
      console.log("blogs fetched",data);
      setBlogs(data.blogs);
    } catch (error) {
      message.error('Error fetching blogs');
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
        message.success('Blog updated successfully');
      } else {
        console.log("Saving Blog ",payload);
        await axios.post('/api/blog/create', payload);
        message.success('Blog created successfully');
      }
      fetchBlogs();
      setIsModalOpen(false);
      setEditingBlog(null);
      setImageUrl('');
      form.resetFields();
    } catch (error) {
      message.error('Error saving blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog/delete/${id}`);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Error deleting blog');
    }
  };

  const openEditModal = (blog, e) => {
    e.stopPropagation();
    setEditingBlog(blog);
    form.setFieldsValue(blog);
    setImageUrl(blog.image || '');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setImageUrl('');
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
      console.error(`Error uploading file ${file.name}:`, error);
      return false;
    }
  };

  const getShortContent = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    return strippedContent.length > 100 ? strippedContent.substring(0, 100) + '...' : strippedContent;
  };

  return (
    <div className="blog-container">
      <Row gutter={[16, 16]}  justify="space-between" align="middle">
        <Col xs={24} sm={12}>
          <h1>Blog Management</h1>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
          {userRole !== "0" && (
            <Button 
              type="primary" 
              size="large"
              icon={<PlusOutlined />} 
              onClick={() => setIsModalOpen(true)}
            >
              Add Blog
            </Button>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {blogs.map((blog) => (
          <Col xs={24} md={12} lg={8} key={blog._id}>
            <Card
              hoverable
              onClick={() => navigate(`/blog/${blog._id}`)}
              title={blog.title}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ flex: 1 }}
              extra={
                userRole !== "0" && (
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={(e) => openEditModal(blog, e)}
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
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()}>
                          Delete
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                )
              }
            >
              <div>{getShortContent(blog.content)}</div>
              <div style={{ textAlign: 'right', color: '#1890ff', cursor: 'pointer', marginTop: '10px' }}>
                Read more...
              </div>
              {blog.image && (
                <img
                  src={blog.image}
                  alt="Blog"
                  style={{ maxWidth: "100%", height: "200px", objectFit: "cover", marginTop: "10px" }}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingBlog ? 'Edit Blog' : 'Add Blog'}
        open={isModalOpen}
        onCancel={() => handleModalClose()}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <ReactQuill theme="snow" style={{ height: '200px', marginBottom: '50px' }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Upload Blog Image"
                name="blogImage"
              >
                <Upload
                  beforeUpload={handleFileUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} size="large">Upload Image</Button>
                </Upload>
                {imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={imageUrl}
                      alt="Blog image"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button type="primary" size="large" htmlType="submit" block>
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Blog;