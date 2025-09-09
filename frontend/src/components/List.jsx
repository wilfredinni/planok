import React, { useState, useEffect } from "react";

export default function List() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // GET
    const fetchTasks = async () => {
        try {
            const res = await fetch(`${API_URL}/task`);
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

    // PUT
    const handleComplete = async (taskId, isCompleted) => {
        try {
            const res = await fetch(`${API_URL}/task/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_completed: isCompleted }),
            });

            if (!res.ok) throw new Error("Error al actualizar tarea");

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, is_completed: isCompleted } : task
                )
            );
        } catch (err) {
            setError(err);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <p>Charging Task...</p>;

    return (
        <div>
            <h2>Task List</h2>
            {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.is_completed}
                                onChange={(e) => handleComplete(task.id, e.target.checked)}
                            />
                            <strong>{task.title}</strong>: {task.description}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
