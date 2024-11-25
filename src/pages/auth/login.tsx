
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
import { IGoogleAuth } from "@/type/IgoogleAuth";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthAction } from "@/store/actions/auth/googleAuthAction";
import LoadingIndicator from "@/components/common/loding/loadingIndicator";



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
  const { data } = useAppSelector((state: RootState) => state.user)
  const [gAuthError, setGauthError] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)



  useEffect(() => {
    if(data&&data.username){
      router.push('/')
    }
    // if (localStorage.getItem('jwtToken')) {
    //   router.push('/')
    // }
  }, [data, router])


  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true)
      const response = await dispatch(loginAction(values)).unwrap();
      console.log('Login success:', response);

      setLoading(false)
      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoading(false)
      setError(true);
    }
  };


  const handleGoogleLogin = async (credentials: any) => {
    // const res = await signIn("google",{redirect:false},{ callbackUrl:'/'});
    try {
      setLoading(true)

      const response = await dispatch(googleAuthAction(credentials))
      setLoading(false)
      router.push('/');
      return;

    } catch (error: any) {
      console.log('this is error', error);
      setLoading(false)

      setGauthError(true)
    }

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-evenly bg-white">
      {isLoading && <LoadingIndicator />}
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
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form>
              {error && <small className="text-[red]">Email or Password incorrect !!</small>}
              {gAuthError && <small className="text-[red]">User no signup throgh google!!</small>}
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
                {!isSubmitting ? "Log In" : "Log In ..."}
              </button>
              <div className="mt-4 text-center text-gray-500 text-sm">
                Don't have an account?{" "}

                <a className="text-blue-600 hover:underline" onClick={() => router.push('/auth/signup')}>
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
          className="flex items-center justify-center mt-4 w-full border   text-white  rounded-md text-sm text-blue-700  hover:text-white transition"
        >
          {/* <FaGoogle className="mr-2 text-blue-700 hover:text-white" /> Log In with Google */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
