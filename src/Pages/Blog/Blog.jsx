import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();

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

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog creation or update
  const handleSubmit = async (values) => {
    const payload = { ...values,userRef: "64f73b8a7d2d4a001d3e1b9c" };
    try {
      if (editingBlog) {
        await axios.post(`/api/blog/update/${editingBlog._id}`, values);
        message.success('Blog updated successfully');
      } else {
        console.log("Saving Blog ",payload);
        await axios.post('/api/blog/create', values);
        message.success('Blog created successfully');
      }
      fetchBlogs();
      setIsModalOpen(false);
      setEditingBlog(null);
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    form.setFieldsValue(blog);
    setIsModalOpen(true);
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
        onCancel={() => setIsModalOpen(false)}
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
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter an image URL' }]}
          >
            <Input />
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
