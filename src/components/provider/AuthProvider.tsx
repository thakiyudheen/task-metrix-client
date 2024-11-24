import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/hooke';
import { getUserAction } from '@/store/actions/auth/getUserAction'; 
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const {data} = useSelector((state: RootState) => state.user);
  const [loading ,setLoading ]= useState<boolean>(false)

  useEffect(() => {
    if (!data) {
        const fetchUser = async () => {
            try {
               dispatch(getUserAction());
            } finally {
              setLoading(false);
            }
          };
      
          fetchUser();
    }
  }, [data, dispatch]);

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>;
};

export default AuthProvider;
