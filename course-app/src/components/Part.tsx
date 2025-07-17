import type { CoursePart } from '../types'
import { assertNever } from '../types'

const Part = (props: CoursePart): React.JSX.Element => {
    switch (props.kind) {
        case "basic":
            return (
                <div>
                    <h3>{props.name}: {props.exerciseCount} exercises</h3>
                    <i>Description: {props.description}</i>
                </div>
            )
        case 'group':
            return (
                <div>
                    <h3>{props.name} {props.exerciseCount} exercises</h3>
                    <p>Group project count: {props.groupProjectCount}</p>
                </div>
            )
        case 'background':
            return (
                <div>
                    <h3>{props.name}: {props.exerciseCount} exercises</h3>
                    <i>Description: {props.description}</i>
                    <p>Background material: <a href={props.backgroundMaterial}>{props.backgroundMaterial}</a></p>
                </div>
            )
        case 'special':
            return (
                <div>
                    <h3>{props.name}: {props.exerciseCount} exercises</h3>
                    <i>Description: {props.description}</i>
                    <p>Requirements: [{props.requirements.join(", ")}]</p>
                </div>
            )
        default:
            return assertNever(props);
    }
}


export default Part;