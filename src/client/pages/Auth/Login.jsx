import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AxiosInstance from '@/redux/axios';

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();
  const onSubmit = async values => {
    const { data } = await AxiosInstance.post('/user/login', values);

    if (data) {
      localStorage.setItem('userToken', JSON.stringify(data));
      localStorage.setItem('token', `${data.tokenType} ${data.token}`);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-6">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                {...register('email', { required: true })}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors?.email && <span>This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password', { required: true })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors?.password && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <GoogleLogin
              loginHint="Email"
              onSuccess={codeResponse => {
                localStorage.setItem('userToken', codeResponse);
                navigate('/');
              }}
              onError={error => {
                console.log(error);
              }}
            />
          </div>
        </form>
        <p className="text-center">
          Dont have an account?{' '}
          <Link
            className="underline text-blue-500 hover:text-blue-700"
            to="/register"
          >
            Register
          </Link>
        </p>
        <p className="text-center">
          Forgot password?{' '}
          <span className="underline text-blue-500 hover:text-blue-700 cursor-pointer">
            Reset password
          </span>
        </p>
      </div>
    </div>
  );
}
