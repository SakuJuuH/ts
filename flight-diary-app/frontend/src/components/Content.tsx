import { useEffect} from "react"
import type { Entry } from "../types";
import DiaryEntry from "./DiaryEntry";
import { getDiaryEntries } from "../services/entryService";

interface ContentProps {
    entries: Entry[];
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const Content = ({ entries, setEntries }: ContentProps) => {
    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const diaries = await getDiaryEntries();
                setEntries(diaries);
                console.log('Fetched diaries:', diaries);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };
        fetchDiaries();
    }, [setEntries]);
    return (
        <div>
        <h2>Diary entries</h2>
        {entries.length > 0 ? (
            entries.map((entry) => (
                <DiaryEntry key={entry.id} entry={entry} />
            ))
        ) : (
            <p>No diary entries found.</p>
        )}
        </div>
    )
}
    
export default Content;