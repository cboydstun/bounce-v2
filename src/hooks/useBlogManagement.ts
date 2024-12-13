import { useState, useCallback } from 'react';
import axios from 'axios';
import { Blog } from '../types/blog';
import { getApiUrl } from "../utils/env";

export const useBlogManagement = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = getApiUrl();

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/blogs`);
            setBlogs(response.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError("Failed to fetch blogs");
            setLoading(false);
        }
    }, []);

    const createBlog = useCallback(async (blogData: FormData) => {
        try {
            await axios.post(`${API_URL}/api/v1/blogs`, blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await fetchBlogs();
            return true;
        } catch (err) {
            console.error('Error creating blog:', err);
            setError("Failed to create blog");
            return false;
        }
    }, [fetchBlogs]);

    const updateBlog = useCallback(async (slug: string, blogData: FormData) => {
        try {
            await axios.put(`${API_URL}/api/v1/blogs/${slug}`, blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await fetchBlogs();
            return true;
        } catch (err) {
            console.error('Error updating blog:', err);
            setError("Failed to update blog");
            return false;
        }
    }, [fetchBlogs]);

    const deleteBlog = useCallback(async (slug: string) => {
        try {
            await axios.delete(`${API_URL}/api/v1/blogs/${slug}`);
            await fetchBlogs();
            return true;
        } catch (err) {
            setError("Failed to delete blog");
            return false;
        }
    }, [fetchBlogs]);

    return {
        blogs,
        loading,
        error,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
    };
};
