import {
    type FC,
    useState,
} from 'react';

interface CheckboxPropsType {
    isChecked?: boolean;
}

const Checkbox: FC<CheckboxPropsType> = ({
    isChecked = false,
}) => {
    const [checked, setChecked] = useState(isChecked);

    const onChange = () => {
        setChecked(!isChecked);
    };

    return (
        <input
            type="checkbox"
            role="test_checkbox"
            checked={checked}
            onChange={onChange}
        />
    );
};

export default Checkbox;
