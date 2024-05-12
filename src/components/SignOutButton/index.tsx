'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { AppRoutes } from '@/constants/routes';

function SignOutButton() {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: `${AppRoutes.HOME}` });
      }}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
