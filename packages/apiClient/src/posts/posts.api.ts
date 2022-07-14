import {Post, PostApiBody} from "./posts.types";

export async function getPosts(abortSignal?: AbortSignal): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: abortSignal });
    if (!response.ok) {
        throw new Error('Could not fetch posts');
    }

    return response.json();
}

export async function createPost(data: PostApiBody): Promise<Post> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Could not POST post');
    }

    return response.json();
}