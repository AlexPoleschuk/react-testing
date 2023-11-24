import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { create, act } from 'react-test-renderer';

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
        const component = create(
            <Button url={'/test_url'}>
                click me to see the message
            </Button>
        );

        const testInstance = component.root;

        expect(testInstance.findByType('button').props.disabled).toBe(false);
        expect(testInstance.findByType('button').children).toStrictEqual(["click me to see the message"]);
    });

    test('2) is content changed after click with successful request', async () => {
        const component = create(
            <Button url={'/test_url'}>
                click me to see the message
            </Button>
        );

        const testInstance = component.root;

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        await act(() => {
            testInstance.findByType('button').props.onClick();
        });

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(testInstance.findByType('p')).toBeTruthy();
        expect(testInstance.findByType('button').props.disabled).toBe(true);
    });

    test('3) is content changed after unsuccessful request', async () => {
        const component = create(
            <Button url={'/bad_url'}>
                click me to see the message
            </Button>
        );

        const testInstance = component.root;

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        await act(() => {
            testInstance.findByType('button').props.onClick();
        });

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(testInstance.findAllByType('p').length).toBe(0);
        expect(testInstance.findByType('button').props.disabled).toBe(false);
    });
});
