import {AppServer, makeServer} from "apiclient";
import {render, waitFor, screen} from "@testing-library/react";
import PostsList from "./PostsList";

let server: AppServer;

beforeEach(() => {
    server = makeServer({ environment: 'test' });
});

afterEach(() => {
    server.shutdown();
});

it('renders posts', async () => {
    server.createList('post', 10);
    const posts = server.schema.all('post');
    render(<PostsList />);
    await waitFor(() => {
        posts.models.forEach(post => {
            expect(screen.queryByText(post.title)).toBeVisible();
            expect(screen.queryByText(post.body)).toBeVisible();
        });
    });
});
