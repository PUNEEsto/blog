
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Input, RTE, Select } from "../index.js";
import appwriteService from "../../appWritefiles/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post, onSubmit, isSubmitting }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, control, reset } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            status: "active",
        },
    });

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active",
            });
        }
    }, [post, reset]);

    const slugTransform = useCallback((value) => {
        return value
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        try {
            console.log("Submitting Post Data:", data);

            // Handle file upload
            let fileId = post?.featuredImage || null;
            if (data.image?.[0]) {
                console.log("Uploading file:", data.image[0]);
                const fileResponse = await appwriteService.uploadFile(data.image[0]);
                if (fileResponse) {
                    fileId = fileResponse.$id;
                    console.log("File uploaded successfully:", fileResponse);
                    if (post?.featuredImage) {
                        console.log("Deleting old file:", post.featuredImage);
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                } else {
                    console.error("File upload failed!");
                    return;
                }
            }

            // Prepare post data
            const postData = {
                ...data,
                featuredImage: fileId,
                userId: userData.$id,
            };

            console.log("Final postData:", postData);

            // Call Appwrite API
            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, postData);
                console.log("Post updated:", dbPost);
            } else {
                dbPost = await appwriteService.createPost(postData);
                console.log("Post created:", dbPost);
            }

            // Navigate only if post is successfully created/updated
            if (dbPost && dbPost.$id) {
                console.log("Navigating to post:", dbPost.$id);
                navigate(`/post/${dbPost.$id}`);
                onSubmit();
            } else {
                console.error("Error: Post was not created successfully.");
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Enter Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Generated Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Post Image :"
                    type="file"
                    className="mb-4"
                    accept="image/*"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    label="Status"
                    className="mb-4"
                    options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                    {...register("status", { required: false })}
                />
                <Button type="submit" bgColor={post ? "bg-green-900" : "bg-blue-500"} className="w-full" disabled={isSubmitting}>
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        $id: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
};


