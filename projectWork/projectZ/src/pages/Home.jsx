
import React, { useEffect, useState, useCallback } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appWritefiles/config.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    // Fetch posts with useCallback to prevent re-renders
    const fetchPosts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await appwriteService.getPosts();
            console.log("API Response:", response); // Debugging
            if (response?.documents) {
                setPosts(response.documents);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Run only once on mount
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                        <span className="ml-4 text-gray-600">Loading posts...</span>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md mx-auto">
                        <h3 className="text-red-600 font-medium mb-4">Error Loading Posts</h3>
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                        <button
                            onClick={() => fetchPosts()}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            <button
                                onClick={() => navigate('/login')}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg max-w-md mx-auto">
                        <h3 className="text-blue-600 font-medium mb-2">No Posts Found</h3>
                        <p className="text-gray-600 text-sm">
                            Be the first to create a post!
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <PostCard 
                            key={post.$id}
                            {...post}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
