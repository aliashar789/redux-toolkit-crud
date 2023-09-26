import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addUser, updateUser, deleteUser } from '../redux/usersSlice';

export default function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.items);
    console.log("🚀 ~ users:", users)
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        const user = { id: uuid(), name, email };
        dispatch(addUser(user));
        setName('');
        setEmail('');
    };

    const handleEdit = id => {
        const user = users.find(user => user.id === id);
        setEditName(user.name);
        setEditEmail(user.email);
        setSelectedUser(id);
    };

    const handleUpdate = event => {
        event.preventDefault();
        const user = { id: selectedUser, name: editName, email: editEmail };
        dispatch(updateUser(user));
        setEditName('');
        setEditEmail('');
        setSelectedUser(null);
    };

    const handleDelete = id => {
        dispatch(deleteUser(id));
    };

    return (
        <div>
            <h1>Users Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <h2>Edit Booking</h2>
                    <form onSubmit={handleUpdate}>
                        <label htmlFor="edit-name">Name:</label>
                        <input
                            type="text"
                            id="edit-name"
                            value={editName}
                            onChange={event => setEditName(event.target.value)}
                        />
                        <label htmlFor="edit-email">Email:</label>
                        <input
                            type="email"
                            id="edit-email"
                            value={editEmail}
                            onChange={event => setEditEmail(event.target.value)}
                        />
                        <button type="submit">Update User</button>
                        <button onClick={() => { setSelectedUser(null); }}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};