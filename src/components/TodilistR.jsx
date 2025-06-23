import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, deleteTodo } from '../features/todos/todoSlice';

const TodilistR = () => {
    const [task, setTask] = useState('');
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);

    const handleSubmit = () => {
        if (!task.trim()) return;

        if (editId) {
            dispatch(editTodo({ id: editId, text: task }));
            setEditId(null);
        } else {
            dispatch(addTodo({ id: Date.now(), text: task }));
        }
        setTask('');
    };

    const handleEdit = (todo) => {
        setTask(todo.text);
        setEditId(todo.id);
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-200 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">📝 To-Do List (Redux Toolkit)</h1>

                    <div className="flex mb-4 gap-2">
                        <input
                            className="flex-1 border rounded px-4 py-2"
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Enter a task..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <button
                            onClick={handleSubmit}
                            className={`px-4 py-2 rounded text-white ${editId ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        >
                            {editId ? 'Update' : 'Add'}
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li key={todo.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                                <span>{todo.text}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(todo)} className="text-yellow-500">✏️</button>
                                    <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-red-500">❌</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {todos.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No tasks yet.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default TodilistR