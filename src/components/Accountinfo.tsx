import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/Api';

interface Step3Props {
  formData: {
    fullName: string;
    email: string;
    dateOfBirth: string;
    street: string;
    city: string;
    state: string;
    username: string;
    password: string;
  };
  setFormData: (data: any) => void;
  prevStep: () => void;
}

const Accountinfo: React.FC<Step3Props> = ({ formData, prevStep }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/\d/, 'Password must contain a number')
      .matches(/[\W_]/, 'Password must contain a special character')
      .required('Password is required'),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const completeData = { ...formData, ...values };

      const apiData = {
        name: completeData.fullName,
        email: completeData.email,
        password: completeData.password,
      };

      const user = await registerUser(apiData);

      if (user) {
        alert('Registration complete');
        navigate('/login');
      }
    } catch (error) {
      alert('An error occurred: ' + (error as any).response?.data?.message || 'Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Step 3: Account Information</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Accountinfo;