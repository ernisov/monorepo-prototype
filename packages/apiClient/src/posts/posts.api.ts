import { Post } from "./posts.types";

export async function getPosts(abortSignal?: AbortSignal): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: abortSignal });
    if (!response.ok) {
        throw new Error('Could not fetch posts');
    }

    return response.json();
}