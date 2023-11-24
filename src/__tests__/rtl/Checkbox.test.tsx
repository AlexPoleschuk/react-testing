import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkbox from '../../components/Checkbox';

describe('Checkbox', () => {
    /* ------- one-time setup ------ */
    beforeEach(() => {
        render(
            <Checkbox />
        );
    });

    afterEach(() => cleanup());
    /* ----------------------------- */

    test('1) is component rendered', () => {
        const inputElement = screen.getByRole("test_checkbox");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toBeChecked();
    });

    test('2) is changed on checked/unchecked', () => {
        const inputElement = screen.getByRole("test_checkbox");

        fireEvent.click(inputElement);

        expect(inputElement).toBeChecked();
    });
});
