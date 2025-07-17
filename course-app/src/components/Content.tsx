import Part from './Part';
import type { CoursePart } from '../types';

interface ContentProps {
    parts: CoursePart[];
}

const Content = (props: ContentProps): React.JSX.Element => {
    return (
        <div>
            {props.parts.map((part, index) => (
                <Part
                    key={index}
                    {...part}
                />
            ))}
        </div>
    );
};

export default Content;
