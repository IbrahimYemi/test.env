import React, { useState } from 'react';
import axios from 'axios'

export default function Login() {

    // collecting form input
    const [input, setInput] = useState({
        AccountNo:"saw@gmail.com",
        password: "saw12345",
    })
    // handle form input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInput((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'X-Requested-With':'XMLHttpRequest',
        },
        withCredentials: true
    });


    // set onSubmit
    const handleAppUi = async (e) => {
        e.preventDefault()
        const csrf = await http.get('/sanctum/csrf-cookie')
        console.log('csrf=', csrf);
        try {
            const response = await http.post("api/login",
                JSON.stringify({
                    email: input.AccountNo,
                    password: input.password,
                })
            );
            console.log(JSON.stringify(response));
            // const accessToken = response?.data.accessToken;
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleAppUi} >
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={input.AccountNo}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={input.password}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#das"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#das"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}