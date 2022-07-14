import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {AppServer, makeServer} from "apiclient";

let server: AppServer;

beforeEach(() => {
  server = makeServer({ environment: 'test' });
});

afterEach(() => {
  server.shutdown();
});

test('renders learn react link', async () => {
  const post = server.create('post', { title: 'Hello World' });
  render(<App />);
  expect(await screen.findByText(post.title)).toBeVisible();
});
