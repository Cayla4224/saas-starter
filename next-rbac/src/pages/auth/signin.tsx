
import { getCsrfToken, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Password123!');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign in to SaaS Starter</h1>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Sign in
        </button>
        <p className="text-center text-gray-500 text-sm mt-2">
          Or use{' '}
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              signIn('credentials', { email, password });
            }}
            className="text-blue-600 hover:underline"
          >
            quick signIn()
          </button>
        </p>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { csrfToken: await getCsrfToken(ctx) } };
};
