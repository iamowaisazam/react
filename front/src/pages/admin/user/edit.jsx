import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useUpdateUserMutation } from '../../../features/usersApi.js';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetUsersQuery();
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const currentUser = data?.data?.find(user => user._id === id);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                password: '',
                confirmPassword: '',
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!", {
                icon: "⚠️",
                style: { background: "#e74c3c", color: "white", fontWeight: "500" },
            });
            return;
        }

        const updatePayload = {
            name: formData.name,
            email: formData.email,
            ...(formData.password ? { password: formData.password } : {})
        };

        try {
            await updateUser({ id, userData: updatePayload }).unwrap();
            toast.success("User updated successfully!", {
                icon: "✅",
                style: { background: "#2ecc71", color: "white", fontWeight: "500" },
            });
            navigate('/admin/users'); // redirect after update
        } catch (err) {
            console.error("Error updating user:", err);
            toast.error("Failed to update user!", {
                icon: "❌",
                style: { background: "#e67e22", color: "white", fontWeight: "500" },
            });
        }
    };

    return (
        <main className="container mt-5">
            <div className="card shadow-sm p-4">
                <h4 className="fw-bold mb-4">Edit User</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaLock /></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="New Password (optional)"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text"><FaLock /></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/users')}>
                        Cancel
                    </button>
                </form>
            </div>
        </main>
    );
}
