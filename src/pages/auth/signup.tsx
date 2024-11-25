import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { FaGoogle } from "react-icons/fa";
import "../../app/globals.css";
import { InputField } from "@/components/common/inputField/inputField";
import { signIn } from "next-auth/react";
import validationSchema from "@/lib/validation/signupSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/hooke";
import { signupAction } from "@/store/actions/auth/signupAction";
import { isUserExist } from "@/store/actions/auth/userExistOauth";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { GoogleLogin } from '@react-oauth/google';
import { googleAuthAction } from "@/store/actions/auth/googleAuthAction";
import { IGoogleAuth } from "@/type/IgoogleAuth";
import LoadingIndicator from "@/components/common/loding/loadingIndicator";




interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const initialValues: SignupFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
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


  const handleSubmit = async (values: SignupFormValues) => {
    try {
      setLoading(true)
      const isExist: any = await isUserExist(values.email);

      if (isExist?.success) {
        setError(true);
        setLoading(false)
        return;
      }

      setError(false);
      const response = await dispatch(signupAction(values)).unwrap();

      if (response.success) {
        setLoading(false)
        router.push('/');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setLoading(false)
      setError(true);
    }
  };
  const handleGoogleSignup = async (credentials: any) => {
    // const res = await signIn("google", { callbackUrl: '/' });
    try {

      setLoading(true)
      const response = await dispatch(googleAuthAction(credentials))
      console.log('google auth resart last ', response.payload);

      setLoading(false)

      router.push('/');
      return;

    } catch (error: any) {
      console.log(error);
      setLoading(false)

      setGauthError(true)
    }


  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-evenly bg-white">
      {isLoading && <LoadingIndicator />}
      <div className="max-w-md w-full">
        <img src='/signup-metrix.svg' alt="" className="" />
      </div>
      <div className="bg-white  rounded-lg p-6 max-w-md w-full ">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched,isSubmitting }) => (
            <Form>
              {error && <small className="text-[red]">Email is already exist</small>}
              {gAuthError && <small className="text-[red]">User no signup throgh google!!</small>}

              <InputField
                label="Username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
              />
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
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                {!isSubmitting?"Sign Up":"Sign Up..."}
              </button>
              <div className="mt-4 text-center text-gray-500 text-sm">
                If you have an account,{" "}
                <a onClick={() => router.push('/auth/login')} className="text-blue-600 hover:underline">
                  sign in
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

          className="flex items-center justify-center mt-4 w-full border  hover:text-white  rounded-md text-sm  hover:text-white transition"
        >
          {/* <FaGoogle className="mr-2 text-blue-700 hover:text-white" /> Sign Up with Google */}
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Signup;
