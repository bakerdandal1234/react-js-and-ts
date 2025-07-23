import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface NewUserData {
  name: string;
  email: string;
  password?: string; // Password is optional for editing, but required for adding
  role: string;
  permissions: string[];
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState<NewUserData>({ name: '', email: '', password: '', role: 'user', permissions: [] });
  const [editingUser, setEditingUser] = useState<User | null>(null); // User being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data.users);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUserPermissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setNewUserData(prev => {
      const newPermissions = checked
        ? [...prev.permissions, value]
        : prev.permissions.filter(p => p !== value);
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleAddUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/admin/users', newUserData);
      setNewUserData({ name: '', email: '', password: '', role: 'user', permissions: [] });
      setShowAddUserForm(false);
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      console.error("Error adding user:", err);
      setError(err.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser({ ...user, permissions: user.permissions || [] }); // Ensure permissions is an array
  };

  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingUser(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleEditUserPermissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setEditingUser(prev => {
      if (!prev) return null;
      const newPermissions = checked
        ? [...prev.permissions, value]
        : prev.permissions.filter(p => p !== value);
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleEditUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await axios.put(`/users/${editingUser._id}/role`, {
        role: editingUser.role,
        permissions: editingUser.permissions,
      });
      setEditingUser(null);
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err: any) {
        console.error("Error deleting user:", err);
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <button
        onClick={() => setShowAddUserForm(!showAddUserForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        {showAddUserForm ? 'Cancel Add User' : 'Add New User'}
      </button>

      {showAddUserForm && (
        <div className="mb-8 p-4 border rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
          <form onSubmit={handleAddUserSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleAddUserChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleAddUserChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newUserData.password}
                onChange={handleAddUserChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={newUserData.role}
                onChange={handleAddUserChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <div className="mt-1 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="read"
                    checked={newUserData.permissions.includes('read')}
                    onChange={handleAddUserPermissionsChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Read</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="write"
                    checked={newUserData.permissions.includes('write')}
                    onChange={handleAddUserPermissionsChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Write</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="delete"
                    checked={newUserData.permissions.includes('delete')}
                    onChange={handleAddUserPermissionsChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Delete</span>
                </label>
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add User
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Permissions</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{(user.permissions || []).join(', ')}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
                {editingUser && editingUser._id === user._id && (
                  <tr>
                    <td colSpan={5} className="p-4 border-b bg-gray-50">
                      <h3 className="text-xl font-semibold mb-2">Edit User: {editingUser.name}</h3>
                      <form onSubmit={handleEditUserSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Role</label>
                          <select
                            name="role"
                            value={editingUser.role}
                            onChange={handleEditUserChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Permissions</label>
                          <div className="mt-1 space-y-2">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                value="read"
                                checked={editingUser.permissions.includes('read')}
                                onChange={handleEditUserPermissionsChange}
                                className="form-checkbox"
                              />
                              <span className="ml-2">Read</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                              <input
                                type="checkbox"
                                value="write"
                                checked={editingUser.permissions.includes('write')}
                                onChange={handleEditUserPermissionsChange}
                                className="form-checkbox"
                              />
                              <span className="ml-2">Write</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                              <input
                                type="checkbox"
                                value="delete"
                                checked={editingUser.permissions.includes('delete')}
                                onChange={handleEditUserPermissionsChange}
                                className="form-checkbox"
                              />
                              <span className="ml-2">Delete</span>
                            </label>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            Save Changes
                          </button>
                          <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
