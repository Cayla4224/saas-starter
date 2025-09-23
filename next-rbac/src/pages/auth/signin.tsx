import { getCsrfToken, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useState } from 'react'

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Password123!')
  return (
    <form method="post" action="/api/auth/callback/credentials" style={{ padding: 24 }}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <h1>Sign in</h1>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign in</button>
      <p style={{ marginTop: 16 }}>
        Or use <button onClick={(e)=>{e.preventDefault(); signIn('credentials', { email, password })}}>quick signIn()</button>
      </p>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { csrfToken: await getCsrfToken(ctx) } }
}
