import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";


interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
  }
  
  export const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => setShowPassword(!showPassword);
  
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1 "
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={name}
            type={type === "password" && showPassword ? "text" : type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-3 py-2 border text-black  rounded-md text-sm focus:outline-none focus:ring-2 ${
              error && touched
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {type === "password" && (
            <div
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
        {error && touched && <small className="text-red-500 text-xs mt-1">{error}</small>}
      </div>
    );
  };
  