import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../service/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../store/authStore';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "jobseeker"
    });

    const {loading} = useAuthStore();
    const setLoading = useAuthStore((state) => state.setLoading);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await signup(formData);
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
            console.log("Error in signup:", error);
        } finally {
            setLoading(false);
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "jobseeker"
            });
        }
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-white pt-16">
                <div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm border border-blue-500 border-2 rounded-xl shadow-2xl p-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <h2 className="text-center text-4xl font-semibold">Eruka</h2>
                        <h3 className="text-gray-600">Register Now</h3>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className="block w-full rounded-md bg-white/90 px-3 py-2 text-base text-gray-900 outline-none border-2 border-blue-500 placeholder:text-gray-400 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition placeholder:text-gray-500"
                                placeholder="Name"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/90 px-3 py-2 text-base text-gray-900 outline-none border-2 border-blue-500 placeholder:text-gray-400 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition placeholder:text-gray-500"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                value={formData.password}
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white/90 px-3 py-2 text-base text-gray-900 outline-none border-2 border-blue-500 placeholder:text-gray-400 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition placeholder:text-gray-500"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <label className="block text-base font-medium text-blue-500 mb-1">Role</label>
                            <div className="flex items-center gap-6 mt-2">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="jobseeker"
                                        checked={formData.role === "jobseeker"}
                                        onChange={handleChange}
                                        id="jobseeker"
                                        className="accent-blue-500 mr-2"
                                    />
                                    <label htmlFor="jobseeker" className="text-base text-gray-600 font-semibold cursor-pointer">
                                        Jobseeker
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={formData.role === "recruiter"}
                                        onChange={handleChange}
                                        id="recruiter"
                                        className="accent-blue-500 mr-2"
                                    />
                                    <label htmlFor="recruiter" className="text-base text-gray-600 font-semibold cursor-pointer">
                                        Recruiter
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            {loading ? (
                                <button
                                    disabled
                                    className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-base font-semibold text-white shadow-md hover:bg-[#b5942a] transition"
                                >
                                    Processing...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-base font-semibold text-white shadow-md hover:bg-blue-800 transition"
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </form>

                    <p className="mt-5 text-center text-base text-gray-600">
                        Already member?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 transition font-medium">
                            Sign in now!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
