import { create, act } from 'react-test-renderer';

import Checkbox from '../../components/Checkbox';

describe('Checkbox', () => {
    test('1) is component rendered', () => {
        const component = create(
            <Checkbox />
        );

        const testInstance = component.root;

        expect(testInstance.findByType('input').props.checked).toBe(false);
    });

    test('2) making snapshots with checked/unchecked', () => {
        const component = create(
            <Checkbox />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        act(() => {
            tree.props.onChange();
        });

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
