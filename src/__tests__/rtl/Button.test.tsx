import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from '../../components/Button';

describe('Button', () => {
    /* ------- mock server setup ------ */
    const server = setupServer(
        rest.get('/test_url', (req, res, ctx) => {
            return res(ctx.json({ name: 'username_mock' }));
        }),
        rest.get('/bad_url', (req, res, ctx) => {
            return res(ctx.status(500));
        }),
    );

    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());
    /* ------------------------------- */

    test('1) is btn rendered & enabled', () => {
        render(
            <Button url={'/test_url'}>
                click me to see the message
            </Button>
        );

        const buttonElement = screen.getByRole("test_button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeEnabled();
    });

    test('2) is content changed after click with successful request', async () => {
        render(
            <Button url={'/test_url'}>
                click me to see the message
            </Button>
        );

        const buttonElement = screen.getByRole("test_button");

        await fireEvent.click(buttonElement);
        await screen.findByRole("message");

        waitFor(() => expect(screen.findByRole("message")).toBeTruthy());
        waitFor(() => expect(screen.findByRole("message")).toHaveTextContent(/github/i));
        waitFor(() => expect(buttonElement).toBeDisabled());
    });

    test('3) is content changed after unsuccessful request', async () => {
        render(
            <Button url={"/bad_url"}>
                click me to see the message
            </Button>
        );

        const buttonElement = screen.getByRole("test_button");

        await fireEvent.click(buttonElement);

        waitFor(() => expect(screen.findByRole("message")).toBeUndefined());
        waitFor(() => expect(buttonElement).toBeEnabled());
    });
});
