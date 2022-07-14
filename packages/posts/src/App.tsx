import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import { Button } from 'ui';
import {getPosts, Post} from "apiclient";

function App() {
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
        <div className="App">
            <Button>Testing UI Library</Button>
            {posts.map(post => (
                <div key={post.id}>
                    {post.title}
                </div>
            ))}
        </div>
    );
}

export default App;
