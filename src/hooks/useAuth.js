import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endpoints from '@/services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        endpoints.auth.login,
        { email, password },
        options
      );
      console.log(data.access_token);
      setUser(data.access_token);
      //   Cookies.set('token', access_token);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    signIn,
  };
}
