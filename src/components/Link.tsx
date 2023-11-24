import {
    type FC,
    type ReactNode,
    useState,
} from 'react';

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
};

interface LinkPropsType {
    children: ReactNode;
    url?: string;
}

const Link: FC<LinkPropsType> = ({
    children,
    url = '#',
}) => {
    const [status, setStatus] = useState(STATUS.NORMAL);

    const onMouseEnter = () => {
        setStatus(STATUS.HOVERED);
    };

    const onMouseLeave = () => {
        setStatus(STATUS.NORMAL);
    };

    return (
        <a
            className={status}
            role={'test_link'}
            href={url}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </a>
    );
};

export default Link;
