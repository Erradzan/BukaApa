import React, { useState } from 'react';
import { registerUser, User } from '../services/Api';
import withTheme from '../hocs/withTheme';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  avatar: Yup.string().url('Invalid URL').required('Avatar URL is required'),
});

const Signup: React.FC<SignupProps> = ({ isDarkMode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; email: string; password: string; avatar: string }) => {
    try {
      console.log('Submitted Values:', values);
      const newUser = await registerUser(values);
      setUser(newUser);
      setError(null);
      if (newUser) {
        navigate('/signin');
      }
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    }
  };  

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold mb-8 text-[#f03846]`}>Sign Up</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '', avatar: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={`p-8 rounded-lg shadow-md w-full max-w-md ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}>
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Name:</label>
              <Field
                name="name"
                type="text"
                placeholder="Enter your name"
                className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Email:</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Password:</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-gray-700' : 'text-white'}`}>Avatar URL:</label>
              <Field
                name="avatar"
                type="text"
                placeholder="Enter your avatar URL"
                className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              <ErrorMessage name="avatar" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="w-full bg-blue-500 dark:bg-blue-700 text-white p-2 rounded">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {user && <p className="mt-4 text-green-500">Registration successful! Welcome, {user.name}!</p>}
    </div>
  );
};

export default withTheme(Signup);