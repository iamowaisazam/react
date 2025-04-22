import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AdminLoginPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{
            backgroundImage: "url('/your-background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}>
                <h2 className="text-center mb-4">Sign In</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control border-0 border-bottom" id="username" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control border-0 border-bottom" id="password" required />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>

                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-pill">Log In</button>
                </form>




            </div>
        </div>
    );
}
