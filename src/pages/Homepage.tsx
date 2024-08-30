import React, { useEffect, useState } from 'react';
import withTheme from '../hocs/withTheme';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import LightLogo from '../support/LightLogo.gif';
import DarkLogo from '../support/DarkLogo.gif';

interface HomePageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserName(response.data.name);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    if (isAuthenticated) {
      fetchUserName();
    } else {
      setUserName(null);
    }
  }, [isAuthenticated]);

  const handleSignOut = () => {
    logout();
    setUserName(null);
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#f03846]'}`}>
      <img src={isDarkMode ? DarkLogo : LightLogo} alt="Logo" className="w-64 h-64" />
      <h1 className="text-4xl font-bold mb-6">
        {userName ? `Hello ${userName}, Welcome to BukaApa!?` : 'Welcome to BukaApa!?'}
      </h1>
      <p className="mb-4">We Do Not Know. Why Do You Ask Us?</p>
      {isAuthenticated && (
        <button onClick={handleSignOut} className="mt-4 px-4 py-2 bg-[#f03846] text-white rounded">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default withTheme(HomePage);