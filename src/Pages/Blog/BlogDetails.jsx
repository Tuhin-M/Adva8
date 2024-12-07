import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Image, Spin, Alert, Avatar, Space, Tag } from "antd";
import "./Blog.css";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const params = useParams();
  const { Title, Paragraph, Text } = Typography;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/get/${params?.blogId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
        } else {
          setBlog(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params?.blogId]);

  return (
    <div
      className="container"
      style={{
        background: "rgba(255,255,255,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: "20vh",
          marginBottom: "20vh",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          margin: "10vh auto",
          padding: "0 20px",
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Spin size="large" />
          </div>
        )}
        {error && (
          <Alert
            type="error"
            style={{ marginTop: "24px" }}
            message="Something went wrong"
          />
        )}
        {blog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
            >
              <Title
                level={2}
                style={{
                  background: "linear-gradient(45deg, #1a2a6c, #b21f1f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {blog.title}
              </Title>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      marginBottom: "24px",
                      height: "400px",
                      borderRadius: "12px",
                      maxHeight: "500px",
                      objectFit: "contain",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    }}
                  />
                )}
              </motion.div>

              <Space style={{ marginBottom: "24px" }}>
                {blog.tags?.map((tag, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    style={{ borderRadius: "15px", padding: "4px 12px" }}
                  >
                    {tag}
                  </Tag>
                ))}
              </Space>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.8",
                    color: "#2c3e50",
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  marginTop: "32px",
                  borderTop: "1px solid #eee",
                  paddingTop: "20px",
                }}
              >
                <Space size={24}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: liked ? "#ff4d4f" : "#666",
                    }}
                    onClick={() => setLiked(!liked)}
                  >
                    {liked ? <HeartFilled /> : <HeartOutlined />}
                    <span>{(blog.likes || 0) + (liked ? 1 : 0)}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#666",
                    }}
                    onClick={() => {
                      navigator
                        .share({
                          title: blog.title,
                          text: blog.description,
                          url: window.location.href,
                        })
                        .catch(console.error);
                    }}
                  >
                    <ShareAltOutlined />
                    <span>Share</span>
                  </motion.button>
                </Space>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default BlogDetails;
