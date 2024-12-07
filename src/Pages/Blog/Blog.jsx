import React, { useEffect, useState } from 'react';
import { storage } from "../../../firebaseConfig";
import { Table, Button, Modal, Form, Input, message, Upload, Popconfirm } from 'antd';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/get');
      console.log("blogs fetched",data);
      setBlogs(data.blogs);
    } catch (error) {
      message.error('Error fetching blogs');
    }
  };
  console.log("blog Image",imageUrl);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog creation or update
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

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog/delete/${id}`);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Error deleting blog');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete Blog"
            description="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const openEditModal = (blog) => {
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

  return (
    <div className="blog-container">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Blog
      </Button>
      <Table dataSource={blogs} columns={columns} rowKey="_id" />

      <Modal
        title={editingBlog ? 'Edit Blog' : 'Add Blog'}
        open={isModalOpen}
        onCancel={() => handleModalClose()}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <ReactQuill theme="snow" style={{ height: '200px', marginBottom: '50px' }} />
          </Form.Item>
          <Form.Item
            label="Upload Blog Image"
            name="blogImage"
          >
            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={imageUrl}
                  alt="Blog image"
                  style={{ width: "200px" }}
                />
              </div>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingBlog ? 'Update Blog' : 'Create Blog'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Blog;