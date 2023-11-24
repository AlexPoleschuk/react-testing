import { create, act } from 'react-test-renderer';

import Link from '../../components/Link';

describe('Link', () => {
    test('1) is component rendered', () => {
        const component = create(
            <Link url={"test_url"}>
                link content
            </Link>
        );

        const testInstance = component.root;

        expect(testInstance.findByType(Link).props.url).toBe("test_url");
        expect(testInstance.findByType(Link).props.children).toBe("link content");
    });

    test('2) is component class changed after mouse events', () => {
        const component = create(
            <Link url={"test_url"}>
                link content
            </Link>
        );

        const testInstance = component.root;
        let tree = component.toJSON();

        expect(testInstance.findByType('a').props.className).toBe("normal");

        act(() => {
            tree.props.onMouseEnter();
        });

        expect(testInstance.findByType('a').props.className).toBe("hovered");

        act(() => {
            tree.props.onMouseLeave();
        });

        expect(testInstance.findByType('a').props.className).toBe("normal");
    });

    test('3) making snapshots with mouse events', () => {
        const component = create(
            <Link url={"test_url"}>
                link content
            </Link>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        act(() => {
            tree.props.onMouseEnter();
        });

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();


        act(() => {
            tree.props.onMouseLeave();
        });

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
