import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Image, Spin, Alert } from "antd";
import "./Blog.css";

function BlogDetails() {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    const { Title, Paragraph } = Typography;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/blog/get/${params?.blogId}`);
                const data = await res.json();
                console.log("blog data in Details View",data);
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
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                {loading && <Spin size="large" />}
                {error && <Alert type="error" style={{ marginTop: '24px' }} message="Something went wrong" />}
                {blog && (
                    <Card>
                        <Title level={2}>{blog.title}</Title>
                        <Image
                            // width="100%"
                            src={blog.image}
                            alt={blog.title}
                            style={{ marginBottom: '24px' }}
                        />
                        <div 
                            style={{ fontSize: '16px', lineHeight: '1.8' }}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </Card>
                )}
            </div>
        </div>
    );
}
export default BlogDetails;