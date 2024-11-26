import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/hooke';
import { getUserAction } from '@/store/actions/auth/getUserAction'; 
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoadingIndicator from '../common/loding/loadingIndicator';

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
              setLoading(true)
             await  dispatch(getUserAction());
            } finally {
              setLoading(false);
            }
          };
      
          fetchUser();
    }
  }, [data, dispatch]);

  
  if (loading) {
    return <div className='bg-white w-full min-h-screen' ><LoadingIndicator/></div>; 
  }

  return <>{children}</>;
};

export default AuthProvider;
