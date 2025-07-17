import { useState } from "react";
import  axios, { AxiosError } from "axios";
import type { Entry, NewEntry} from "../types";
import { createDiaryEntry } from "../services/entryService";
import { VISIBILITY_OPTIONS, WEATHER_OPTIONS } from "../types";

interface AddDiaryProps {
    onAddEntry: (entry: Entry) => void;
}

const DiaryForm = ({ onAddEntry }: AddDiaryProps) => {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<NewEntry>({
        date: "",
        weather: "",
        visibility: "",
        comment: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        createDiaryEntry(formData)
            .then(response => {
                console.log('Diary entry added:', response);
                onAddEntry(response);
                setError(null);
                setFormData({
                    date: "",
                    weather: "",
                    visibility: "",
                    comment: ""
                });
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response) {
                        setError(`${axiosError.response.data}`);
                    } else {
                        setError('Network error or server not responding');
                    }
                } else {
                    setError('An unexpected error occurred');
                }
            });
    };
    // Form state and submission logic will go here
    return (
        <>
            <h2>Add new entry</h2>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required />
            </div>
             <div>
                <label>Visibility: &nbsp;</label>
                {VISIBILITY_OPTIONS.map((option) => (
                    <label key={option}>
                        {option} 
                        <input
                            type="radio"
                            name="visibility"
                            value={option}
                            checked={formData.visibility === option}
                            onChange={handleInputChange}
                        />
                        &nbsp;
                    </label>
                ))}
            </div>

            <div>
                <label>Weather: &nbsp;</label>
                {WEATHER_OPTIONS.map((option) => (
                    <label key={option}>
                        {option} 
                        <input
                            type="radio"
                            name="weather"
                            value={option}
                            checked={formData.weather === option}
                            onChange={handleInputChange}
                        />
                        &nbsp;
                    </label>
                ))}
            </div>
            <div>
                <label htmlFor="comments">Comment: &nbsp;</label>
                <textarea
                    id="comments"
                    name="comment"
                    rows={1}
                    value={formData.comment}
                    onChange={handleInputChange}
                    required />
            </div>

            <button type="submit">Add</button>
            </form>
        </>
    );
};

export default DiaryForm;