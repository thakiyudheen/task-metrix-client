import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FaGoogle } from "react-icons/fa";
import "../../app/globals.css";
import { InputField } from "@/components/common/inputField";
import { signIn } from "next-auth/react";
import validationSchema from "@/lib/validation/signupSchema";
import { useAppDispatch } from "@/hooks/hooke";
import { signupAction } from "@/store/actions/auth/signupAction";
import { isUserExist } from "@/store/actions/auth/userExistOauth";
import { useRouter } from "next/router";




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

  const handleSubmit = async (values: SignupFormValues) => {
    try {
        const isExist = await isUserExist(values.email);

        if (isExist) {
            setError(true);
            return;
        }

        setError(false);
        const response = await dispatch(signupAction(values)).unwrap();

        if (response.success) {
            router.push('/');
        }
    } catch (error: any) {
        console.error('Signup error:', error);
        setError(true);
    }
};
  const router = useRouter()
  const handleGoogleSignup = async () => {
    const res = await signIn("google", { callbackUrl: '/' });

  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-evenly bg-white">
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
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              {error && <small className="text-[red]">Email is already exist</small>}
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
                Sign Up
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
          onClick={handleGoogleSignup}
          className="flex items-center justify-center mt-4 w-full border text-blue-700 border-blue-700 hover:text-white py-2 rounded-md text-sm text-blue-700 hover:bg-blue-600 hover:text-white transition"
        >
          <FaGoogle className="mr-2 text-blue-700 hover:text-white" /> Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
