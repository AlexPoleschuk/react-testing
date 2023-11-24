import {
    type FC,
    type ReactNode,
    useState,
} from 'react';

import axios from 'axios';

interface ButtonPropsType {
    children: ReactNode;
    url?: string;
}

const Button: FC<ButtonPropsType> = ({
    children,
    url = "https://api.github.com/users/AlexPoleschuk",
}) => {
    const [isBtnDisabled, setBtnDisabled] = useState(false);
    const [userName, setUserName] = useState('');

    const handleClick = async () => {
        await axios.get(url)
            .then((res) => {
                setUserName(res.data?.name);
                setBtnDisabled(true);
            })
            .catch(() => new Error());
    };

    return (
        <div>
            <button
                role={"test_button"}
                disabled={isBtnDisabled}
                onClick={handleClick}
            >
                {children}
            </button>

            {userName?.length > 0 && (
                <p role={"message"}>
                    {`${userName} has an account on Github`}
                </p>
            )}
        </div>
    );
};

export default Button;
