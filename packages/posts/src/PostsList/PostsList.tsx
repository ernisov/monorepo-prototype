import React, {useCallback, useEffect, useState} from 'react';
import {getPosts, Post} from "apiclient";
import styles from './PostsList.module.css';

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = useCallback(async () => {
        try {
            const posts = await getPosts();
            setPosts(posts);
        } catch {

        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className={styles.list}>
            {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <p className={styles.postTitle}>{post.title}</p>
                    <p className={styles.postBody}>{post.body}</p>
                </div>
            ))}
        </div>
    )
};

export default PostsList;
