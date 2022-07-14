import {AppServer, makeServer} from "apiclient";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";

let server: AppServer;

beforeEach(() => {
    server = makeServer({ environment: 'test' });
});

afterEach(() => {
    server.shutdown();
});

it('creates post', async () => {
    render(<CreatePost />);
    const title = 'Post Title';
    const body = 'Post Body';
    userEvent.type(await screen.findByLabelText('Title'), title);
    userEvent.type(await screen.findByLabelText('Body'), body);
    userEvent.click(await screen.findByRole('button', { name: 'Create' }));

    expect(await screen.findByText('Post Created!')).toBeVisible();
    expect(server.schema.findBy('post', { title, body })).not.toBeNull();
});