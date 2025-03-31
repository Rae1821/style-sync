"use client"

import React from 'react'
import { OAuth2Client } from 'google-auth-library';
import { redirect } from 'next/navigation';

const GoogleButton = () => {

    const handleLogin = () => {
        const oAuth2Client = new OAuth2Client(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URL
        );
    
        const authorizeUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
       redirect(authorizeUrl);
    }
  return (
    <>
      <button onClick={handleLogin}>Sign in with Google</button>
    </>
  )
}

export default GoogleButton
