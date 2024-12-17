import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Image,
  Spin,
  Alert,
  Avatar,
  Space,
  Tag,
  message,
} from "antd";
import "./Blog.css";
import { motion } from "framer-motion";
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const params = useParams();
  const { Title } = Typography;
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBlog();
  }, [params?.blogId, currentUser._id]);
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
        console.log("Curent Data", data);
        setLiked(data.likes?.includes(currentUser._id));
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleLike = async (values) => {
    if (!currentUser) {
      message.error("Please login to like the blog");
      return;
    }

    if (liked) {
      // message.info("You have already liked this blog");
      setLiked(!liked);
    }

    const payload = { userRef: currentUser._id, action: !liked };
    console.log("Payload Sending", payload);
    try {
      const response = await axios.post(
        `/api/blog/updateLike/${values}`,
        payload
      );
      if (response.data.success) {
        fetchBlog();
        if (!liked) {
          message.success("Blog liked successfully");
        } else {
          return;
        }
      }
    } catch (error) {
      setLiked(false);
      message.error("Error liking blog");
      console.log("This is the Error", error);
    }
  };
  return (
    <div
      style={{
        maxWidth: "1200px",
        marginTop: "16vh",
        padding: "1.25rem",
        width: "100%",
      }}
    >
      <>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <Spin size="large" />
          </div>
        )}
        {error && (
          <Alert
            type="error"
            style={{ marginTop: "1.5rem" }}
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
                borderRadius: "1rem",
                boxShadow: "0 0.5rem 1.875rem rgba(0,0,0,0.12)",
                backdropFilter: "blur(0.625rem)",
                overflow: "hidden",
                margin: "0 auto",
                width: "100%",
                maxWidth: "56.25rem",
              }}
            >
              <Title
                level={2}
                style={{
                  background: "linear-gradient(45deg, #1a2a6c, #b21f1f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                }}
              >
                {blog.title}
              </Title>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      marginBottom: "1.5rem",
                      height: "auto",
                      maxHeight: "31.25rem",
                      borderRadius: "0.75rem",
                      objectFit: "contain",
                      boxShadow: "0 0.25rem 1.25rem rgba(0,0,0,0.15)",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      justifyContent: "center",
                    }}
                  />
                )}
              </motion.div>

              <Space
                style={{
                  marginBottom: "1.5rem",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {blog.tags?.map((tag, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    style={{
                      borderRadius: "0.9375rem",
                      padding: "0.25rem 0.75rem",
                    }}
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
                    fontSize: "1.0625rem",
                    lineHeight: "1.8",
                    color: "#2c3e50",
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  marginTop: "2rem",
                  borderTop: "1px solid #eee",
                  paddingTop: "1.25rem",
                  display: "flex",
                  justifyContent: "center",
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
                      gap: "0.5rem",
                      color: liked ? "#ff4d4f" : "#666",
                    }}
                    onClick={() => handleLike(params?.blogId)}
                  >
                    {liked ? <HeartFilled /> : <HeartOutlined />}
                    <span>{blog.likes?.length || 0}</span>
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
                      gap: "0.5rem",
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
      </>
    </div>
  );
};
export default BlogDetails;
