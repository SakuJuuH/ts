import type { Entry } from "../types";

interface entryProps {
    entry: Entry;
}

const DiaryEntry = ({ entry }: entryProps) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
            <i>comment: {entry.comment}</i>
        </div>
    );
}

export default DiaryEntry;
