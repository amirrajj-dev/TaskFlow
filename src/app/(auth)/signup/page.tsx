// app/signup/page.tsx
import Signup from '@/components/auth/signup/SignUp'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign Up | TaskFlow',
  description: 'Create a TaskFlow account to start organizing your daily tasks with ease.',
}

const SignUpPage = () => {
  return <Signup />
}

export default SignUpPage