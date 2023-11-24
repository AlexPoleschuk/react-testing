import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';

import Checkbox from '../../components/Checkbox';

describe('Checkbox', () => {
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
            root.render(<Checkbox />);
        });

        const inputElement = container.querySelector('input');

        expect(inputElement.type).toBe("checkbox");
    });

    test('2) is changed on checked/unchecked', () => {
        act(() => {
            const root = createRoot(container);
            root.render(<Checkbox />);
        });

        const inputElement = container.querySelector('input');

        expect(inputElement.checked).toBe(false);

        act(() => {
            Simulate.change(inputElement);
        });

        expect(inputElement.checked).toBe(true);
    });
});
