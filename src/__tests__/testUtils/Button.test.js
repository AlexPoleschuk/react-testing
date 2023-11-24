import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';

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
    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
        container = null;
    });

    test('1) is btn rendered & enabled', () => {
        act(() => {
            const root = createRoot(container);

            root.render(
                <Button url={'/test_url'}>
                    click me to see the message
                </Button>
            );
        });

        const btnElement = container.querySelector('button');

        expect(btnElement.disabled).toBe(false);
        expect(btnElement.textContent).toBe("click me to see the message");
    });

    test('2) is content changed after click with successful request', async () => {
        act(() => {
            const root = createRoot(container);

            root.render(
                <Button url={'/test_url'}>
                    click me to see the message
                </Button>
            );
        });

        const btnElement = container.querySelector('button');

        await act(() => {
            Simulate.click(btnElement);
        });

        const paragraphElement = container.querySelector('p');

        expect(paragraphElement).toBeTruthy();
        expect(btnElement.disabled).toBe(true);
    });

    test('3) is content changed after unsuccessful request', async () => {
        act(() => {
            const root = createRoot(container);

            root.render(
                <Button url={'/bad_url'}>
                    click me to see the message
                </Button>
            );
        });

        const btnElement = container.querySelector('button');

        await act(() => {
            Simulate.click(btnElement);
        });

        const paragraphElement = container.querySelector('p');

        expect(paragraphElement).toBeFalsy();
        expect(btnElement.disabled).toBe(false);
    });
});
