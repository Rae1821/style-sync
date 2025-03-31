import { redirect } from 'next/navigation';
import { generateAuthUrl } from '@/actions/auth';

const LoginPage = () => {
    const handleGoogleLogin = async () => {
        'use server';
        const authUrl = generateAuthUrl();
        redirect(authUrl);
    };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4">Login to Your Account</h1>
        <form action={handleGoogleLogin}>
          <button 
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
