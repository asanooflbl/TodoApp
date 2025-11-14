import { useState, useEffect } from "react";
import useAuthContext from "../Context/AuthContext";

function Todos() {
    const {
        token,
        todos,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleStatus,
    } = useAuthContext();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        if (token) getTodos();
    }, [token]);

    const handleAdd = async () => {
        if (!title.trim() || !description.trim()) return;

        await addTodo(title, description);

        setTitle("");
        setDescription("");
    };

    const startEdit = (todo) => {
        setEditingId(todo._id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
    };

    const saveEdit = async (id) => {
        if (!editTitle.trim() || !editDescription.trim()) return;

        await updateTodo(id, editTitle, editDescription);
        cancelEdit();
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Your To-Dos</h1>

            {/* Add form */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border p-2 w-full mb-3"
                />

                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border p-2 w-full mb-3"
                />

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white py-2 w-full rounded"
                >
                    Add Todo
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {todos.length === 0 ? (
                    <p>No todos yet.</p>
                ) : (
                    todos.map((todo) => (
                        <div key={todo._id} className="bg-white p-4 rounded shadow">
                            {editingId === todo._id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="border p-2 w-full mb-2"
                                    />
                                    <input
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="border p-2 w-full mb-2"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(todo._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-600 text-white px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-semibold">
                                        {todo.title}
                                        <span
                                            className={`ml-2 text-sm ${
                                                todo.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            ({todo.status})
                                        </span>
                                    </h3>

                                    <p>{todo.description}</p>

                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => toggleStatus(todo._id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Toggle
                                        </button>

                                        <button
                                            onClick={() => startEdit(todo)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteTodo(todo._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Todos;
