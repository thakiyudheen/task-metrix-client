// import { AxiosRequestConfig } from "axios";

// export const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     withCredentials: true,
//   };
  
//   export const appJson: AxiosRequestConfig = {
//     headers: {
//         "Content-Type": "application/json"
//     }
//   };
  
//   export const configMultiPart = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     withCredentials: true,
//   };

import { AxiosRequestConfig } from "axios";


export const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
};


export const multiPartConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true, 
};

export const createConfig = (headers: Record<string, string>, withCredentials = true): AxiosRequestConfig => {
  return {
    headers: {
      ...headers,
    },
    withCredentials,
  };
};
