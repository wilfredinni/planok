import React ,{ useState } from "react";

export default function Form({ onSubmit }) {
    const [input, setInput] = useState("");
    
    const API_URL = import.meta.env.VITE_API_URL;
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${API_URL}/tasks`);
            if (!res.ok) throw new Error("Error al obtener tareas");
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            setTitle("");
            setDescription("");
            if (onSubmit) onSubmit({ title, description });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">Submit</button>
        </form>
    );
}