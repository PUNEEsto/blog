
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from '../components';
import PostForm from "../components/PostForm/postForm.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPost() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!authStatus) {
            navigate('/login');
        }
    }, [authStatus, navigate]);

    const handlePostSubmit = async (postData) => {
        setIsSubmitting(true);
        try {
            console.log('Post Data:', postData);
            toast.success('Post created successfully!');
            navigate('/'); // Redirect after success
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-8">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-8">Create a New Post</h1>
                <PostForm onSubmit={handlePostSubmit} isSubmitting={isSubmitting} />
            </Container>
        </div>
    );
}

export default AddPost;
