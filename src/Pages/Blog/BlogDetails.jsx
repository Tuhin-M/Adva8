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
  Input,
  Button,
  List,
  Popconfirm,
} from "antd";
import "./Blog.css";
import { motion } from "framer-motion";
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const params = useParams();
  const { Title } = Typography;
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [params?.blogId, currentUser._id]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/blog/comments/${params?.blogId}`);
      const data = await res.json();
      if (data.success !== false) {
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleComment = async () => {
    if (!currentUser) {
      message.error("Please login to comment");
      return;
    }
    try {
      const response = await axios.post(`/api/blog/comment/${params?.blogId}`, {
        userId: currentUser._id,
        username: currentUser.username,
        content: newComment,
      });
      if (response.data.success) {
        message.success("Comment added successfully");
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      message.error("Error adding comment");
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await axios.put(`/api/blog/comment/${commentId}`, {
        content: editedContent,
      });
      if (response.data.success) {
        message.success("Comment updated successfully");
        setEditingComment(null);
        setEditedContent("");
        fetchComments();
      }
    } catch (error) {
      message.error("Error updating comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/api/blog/comment/${commentId}`);
      if (response.data.success) {
        message.success("Comment deleted successfully");
        fetchComments();
      }
    } catch (error) {
      message.error("Error deleting comment");
    }
  };

  const handleReply = async (commentId) => {
    if (!currentUser) {
      message.error("Please login to reply");
      return;
    }
    try {
      const response = await axios.post(`/api/blog/comment/${commentId}/reply`, {
        userId: currentUser._id,
        username: currentUser.username,
        content: replyText,
      });
      if (response.data.success) {
        message.success("Reply added successfully");
        setReplyText("");
        setReplyTo(null);
        fetchComments();
      }
    } catch (error) {
      message.error("Error adding reply");
    }
  };

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

              {/* Comments Section */}
              <div style={{ marginTop: "2rem" }}>
                <Title level={3}>Comments</Title>
                <div style={{ marginBottom: "1rem" }}>
                  <Input.TextArea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                  />
                  <Button
                    type="primary"
                    onClick={handleComment}
                    style={{ marginTop: "0.5rem" }}
                  >
                    Add Comment
                  </Button>
                </div>

                <List
                  className="comment-list"
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={(comment) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar>{comment.username[0]}</Avatar>}
                        title={comment.username}
                        description={
                          editingComment === comment._id ? (
                            <div>
                              <Input.TextArea
                                rows={2}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="Edit your comment..."
                              />
                              <Button
                                type="primary"
                                onClick={() => handleEditComment(comment._id)}
                                style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditingComment(null);
                                  setEditedContent("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div>{comment.content}</div>
                              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </div>
                              <Space>
                                <span
                                  key="reply-to"
                                  onClick={() => setReplyTo(comment._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  Reply
                                </span>
                                {comment.userId === currentUser?._id && (
                                  <>
                                    <span
                                      key="edit"
                                      onClick={() => {
                                        setEditingComment(comment._id);
                                        setEditedContent(comment.content);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <EditOutlined /> Edit
                                    </span>
                                    <Popconfirm
                                      title="Are you sure you want to delete this comment?"
                                      onConfirm={() => handleDeleteComment(comment._id)}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <span key="delete" style={{ cursor: "pointer" }}>
                                        <DeleteOutlined /> Delete
                                      </span>
                                    </Popconfirm>
                                  </>
                                )}
                              </Space>
                            </>
                          )
                        }
                      />
                      {replyTo === comment._id && (
                        <div style={{ marginLeft: "3rem" }}>
                          <Input.TextArea
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                          />
                          <Button
                            type="primary"
                            onClick={() => handleReply(comment._id)}
                            style={{ marginTop: "0.5rem" }}
                          >
                            Send Reply
                          </Button>
                        </div>
                      )}
                      {comment.replies && (
                        <List
                          className="reply-list"
                          itemLayout="horizontal"
                          dataSource={comment.replies}
                          renderItem={(reply) => (
                            <List.Item style={{ marginLeft: "3rem" }}>
                              <Comment
                                author={reply.username}
                                avatar={<Avatar>{reply.username[0]}</Avatar>}
                                content={reply.content}
                                datetime={new Date(
                                  reply.createdAt
                                ).toLocaleDateString()}
                              />
                            </List.Item>
                          )}
                        />
                      )}
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </>
    </div>
  );
};
export default BlogDetails;
