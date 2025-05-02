
import React, { useState, useEffect } from "react";
import appwriteService from "../appWritefiles/config.js";
import { Container, PostCard } from "../components/index.js";
import { Query } from "appwrite";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);

                const queries = [
                    // Removed status query to avoid filtering out all posts
                    Query.limit(20),
                    Query.offset((page - 1) * 20)
                ];

                const response = await appwriteService.getPosts(queries);
                console.log("API Response:", response);
                console.log("API Response type:", typeof response);
                console.log("Is response an array?", Array.isArray(response));
                console.log("Response structure:", JSON.stringify(response).substring(0, 100) + "...");
                
                // Handle both array response and response with documents property
                if (Array.isArray(response)) {
                    setPosts(prevPosts =>
                        page === 1 ? response : [...prevPosts, ...response]
                    );
                    setHasMore(response.length === 20);
                    console.log("Posts set from array, count:", response.length);
                } 
                else if (response && response.documents) {
                    setPosts(prevPosts =>
                        page === 1 ? response.documents : [...prevPosts, ...response.documents]
                    );
                    setHasMore(response.documents.length === 20);
                    console.log("Posts set from response.documents, count:", response.documents.length);
                }
                else {
                    console.error("Unexpected response format:", response);
                    setError("Failed to load posts: unexpected data format");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    // Log posts state after update
    useEffect(() => {
        console.log("Current posts state length:", posts.length);
        console.log("First few posts:", posts.slice(0, 2));
    }, [posts]);

    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading && page === 1) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-900"></div>
                        <span className="ml-4">Loading posts...</span>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                        <button
                            onClick={() => {
                                setError(null);
                                setPage(1);
                            }}
                            className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Retry
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded">
                        No posts found. Start creating some posts!
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMorePosts}
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isLoading ? "Loading..." : "Load More Posts"}
                        </button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPost;

