import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';

import Link from '../../components/Link';

describe('Link', () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
        container = null;
    });

    test('1) is component rendered', () => {
        act(() => {
            const root = createRoot(container);

            root.render(
                <Link url={"test_url"}>
                    link content
                </Link>
            );
        });

        expect(container.textContent).toBe("link content");
    });

    test('2) is component class changed after mouse events', () => {
        act(() => {
            const root = createRoot(container);

            root.render(
                <Link url={"test_url"}>
                    link content
                </Link>
            );
        });

        const linkElement = container.querySelector('a');

        expect(linkElement.className).toBe("normal");

        act(() => {
            Simulate.mouseEnter(linkElement);
        });

        expect(linkElement.className).toBe("hovered");

    });
});
