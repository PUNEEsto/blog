
import conf from "../conf/conf.js";
import { Client, ID, Storage, Databases } from "appwrite";

class Service {
    constructor() {
        if (!conf.appwriteUrl || !conf.appwriteProjectId) {
            throw new Error("Appwrite configuration is missing.");
        }

        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, featuredImage, content, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, featuredImage, content, status, userId }
            );
        } catch (error) {
            console.error("Appwrite service:: createPost::error", error.message);
            throw new Error("Failed to create post. Please try again.");
        }
    }

    async updatePost(slug, { title, featuredImage, content, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, featuredImage, content, status }
            );
        } catch (error) {
            console.error("Appwrite service:: updatePost::error", error.message);
            throw new Error("Failed to update post. Please try again.");
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service:: deletePost::error", error.message);
            throw new Error("Failed to delete post. Please try again.");
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite::getPost::error", error.message);
            throw new Error("Failed to fetch post. Please try again.");
        }
    }

    async getPosts(queries = []) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            console.log("Raw API response in service:", response);
            return response;
        } catch (error) {
            console.error("Appwrite::getPosts::error", error.message);
            throw new Error("Failed to fetch posts. Please try again.");
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite::uploadFile::error", error.message);
            throw new Error("Failed to upload file. Please try again.");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite::deleteFile::error", error.message);
            throw new Error("Failed to delete file. Please try again.");
        }
    }

    // ✅ Fixed preview URL generator
    getFilePreview(fileId) {
        if (!fileId) {
            console.warn("Appwrite::getFilePreview:: Warning - fileId is missing.");
            return " ";
        }

        try {
            // getFilePreview returns a URL object
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).toString();
        } catch (error) {
            console.error("Appwrite::getFilePreview::error", error.message);
            return "";
        }
    }
}

const service = new Service();
export default service;



