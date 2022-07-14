import React, {useCallback, useState} from 'react';
import {Button} from "ui";
import {createPost} from "apiclient";

const CreatePost = () => {
    const [titleInputValue, setTitleInputValue] = useState('');
    const [bodyInputValue, setBodyInputValue] = useState('');
    const [postCreated, setPostCreated] = useState(false);

    const handleSubmit = useCallback(async () => {
        try {
            await createPost({ title: titleInputValue, body: bodyInputValue, userId: 1 });
            setPostCreated(true);
        } catch {

        }
    }, [titleInputValue, bodyInputValue]);

    return (
        <div>
            <h1>Create Post</h1>
            {postCreated && <p>Post Created!</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="body">Body</label>
                    <input id="body" value={bodyInputValue} onChange={(e) => setBodyInputValue(e.target.value)} />
                </div>

                <Button onClick={handleSubmit}>Create</Button>
            </form>
        </div>
    );
};

export default CreatePost;