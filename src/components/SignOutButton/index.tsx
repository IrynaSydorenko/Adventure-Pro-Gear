'use client'

import React from 'react';
import { signOut } from 'next-auth/react';
import {Routes} from '@/constants/routes'

function SignOutButton() {
  return (
    <button onClick={()=>{signOut({callbackUrl: `${Routes.HOME}` })}}>Sign Out</button>
  )
}

export default SignOutButton