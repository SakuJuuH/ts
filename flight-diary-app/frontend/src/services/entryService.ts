import axios from "axios";
import type { Entry, NewEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaryEntries = async () => {
    return axios.get<Entry[]>(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching diary entries:', error);
            throw error;
        });
};

export const createDiaryEntry = async (object: NewEntry) => {
    return axios.post<Entry>(baseUrl, object)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating diary entry:', error);
            throw error;
        });
};

