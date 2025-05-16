// app/signin/page.tsx
import Signin from '@/components/auth/signin/SignIn'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign In | TaskFlow',
  description: 'Login to your TaskFlow account to manage your tasks efficiently.',
}

const SigninPage = () => {
  return <Signin />
}

export default SigninPage