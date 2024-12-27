'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInPage = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      redirect('/')
    }
  }, [isSignedIn]);

  return isSignedIn ? null : <SignIn />;
};

export default SignInPage;
