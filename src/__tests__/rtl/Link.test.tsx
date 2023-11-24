import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Link from '../../components/Link';

describe('Link', () => {
    test('1) is component rendered', () => {
        const { getByText } = render(
            <Link url={"test_url"}>
                link content
            </Link>
        );

        const linkElement = getByText(/link content/i);

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "test_url");
    });

    test('2) is component class changed after mouse events', () => {
        render(
            <Link>
                link content
            </Link>
        );

        const linkElement = screen.getByRole("test_link");

        fireEvent.mouseEnter(linkElement);
        expect(linkElement).toHaveClass("hovered");

        fireEvent.mouseLeave(linkElement);
        expect(linkElement).toHaveClass("normal");
    });

    test('3) is Link have default url prop', () => {
        render(
            <Link>
                link content
            </Link>
        );

        const linkElement = screen.getByRole("test_link");

        expect(linkElement).toHaveAttribute("href", "#");
    });
});
