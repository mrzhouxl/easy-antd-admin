import { message } from "ant-design-vue";
import axios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useRouter } from 'vue-router'

const router = useRouter()
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_APIURL as string || 'http://localhost:7000/admin/api',
});
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let authToken = localStorage.getItem('token');
    config.headers = {
      Authorization: 'Bearer ' + authToken
    }
    //之后需要验证token，目前先留着
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data } = res;
    let token = localStorage.getItem('token')
    if (data.code > 200) {
      message.info("出现异常");
    }
    return res;
  },
  (error: AxiosError) => {
    if (error.code == '401') {
      router.push('/login')
    }
    message.error(error.response?.data.message || '请稍后再试');
    return Promise.reject(error);
  }
);

export const get = (url: string, params?: any): AxiosPromise => {
  return http.get(url, { params });
};

export const post = (url: string, data: any): AxiosPromise => {
  return http.post(url, data);
};

export const update = (url: string, data: any): AxiosPromise => {
  return http.put(url, data);
};

export const del = (url: string): AxiosPromise => {
  return http.delete(url);
};

export const put = (url: string, data: any): AxiosPromise<axiosReturn> => {
  return http.put(url, data);
};

export interface axiosReturn {
  code: number;
  message: string;
  data: [];
}
