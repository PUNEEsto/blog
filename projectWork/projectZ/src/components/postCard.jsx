
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import appwriteService from '../appWritefiles/config.js';
import { Link } from 'react-router-dom';

const PostCard = memo(({ $id, title, featuredImage }) => {
    const fallbackImage = 'https://cloud.appwrite.io/console/project-fra-674ad3f7002eaef5cdbc/storage/bucket-674ad79d00057e3d17a9';
    const [imageSrc, setImageSrc] = useState(fallbackImage);

    useEffect(() => {
        if (featuredImage) {
            try {
                const previewUrl = appwriteService.getFilePreview(featuredImage);
                if (previewUrl && typeof previewUrl === 'string') {
                    setImageSrc(previewUrl);
                }
            } catch (err) {
                console.error("Error generating preview URL:", err);
            }
        }
    }, [featuredImage]);

    const handleImageError = () => {
        setImageSrc(fallbackImage);
    };

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-yellow-100 rounded-xl p-4 transition-transform hover:scale-105 duration-200'>
                <div className='w-full mb-4 flex justify-center'>
                    <img
                        src={imageSrc}
                        alt={title}
                        onError={handleImageError}
                        className='rounded-xl object-cover w-full h-48'
                    />
                </div>
                <h2 className='text-xl font-bold text-center'>{title}</h2>
            </div>
        </Link>
    );
});

PostCard.displayName = 'PostCard';

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string,
};

export default PostCard;

