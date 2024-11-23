
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import "../../app/globals.css";
import { InputField } from "@/components/common/inputField/inputField";
import validationSchema from "@/lib/validation/loginSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/hooke";
import { loginAction } from "@/store/actions/auth/loginAction";
import { useRouter } from 'next/router';
import { RootState } from "@/store";
import { getUserAction } from "@/store/actions/auth/getUserAction";



interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
const router = useRouter()
  const [error, setError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {data} = useAppSelector((state:RootState)=>state.user)



 
  useEffect(()=>{
      if(data&&data.username){
        router.push('/')
      }
  },[data,router])


  const handleSubmit = async (values: LoginFormValues) => {
    try {
        const response = await dispatch(loginAction(values)).unwrap();
        console.log('Login success:', response);
        router.push('/');
    } catch (error: any) {
        console.error('Login failed:', error);
        setError(true);
    }
};


  const handleGoogleLogin = async () => {
    const res = await signIn("google", { callbackUrl: '/' });

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-evenly bg-white">
      <div className="max-w-md w-full">
        <img src={'/signup-metrix.svg'} alt="Login Illustration" className="w-full" />
      </div>
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Log In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              {error&&<small className="text-[red]">Email or Password incorrect !!</small>}
              <InputField
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Log In
              </button>
              <div className="mt-4 text-center text-gray-500 text-sm">
                Don't have an account?{" "}
                
                  <a className="text-blue-600 hover:underline" onClick={()=>router.push('/auth/signup')}>
                    Sign up
                  </a>
               
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center mt-4">
          <hr className="w-1/4 border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="w-1/4 border-t border-gray-300" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center mt-4 w-full border border-blue-700 text-blue-700 text-white py-2 rounded-md text-sm text-blue-700 hover:bg-blue-600 hover:text-white transition"
        >
          <FaGoogle className="mr-2 text-blue-700 hover:text-white" /> Log In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
