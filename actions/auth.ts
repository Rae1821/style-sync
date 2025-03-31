
import { db } from '@/db';
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';

// Create a utility for Google OAuth
export function getGoogleClient() {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // Use the full callback URL
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'
  );
}

export function generateAuthUrl() {
    const client = getGoogleClient();
    return client.generateAuthUrl({
        access_type: 'offline', // Enables refresh tokens
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        prompt: 'consent' // Ensures we get a refresh token
    })
}


// for debugging purposes
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

interface UpdateUserInput {
    bodyShape?: string;
    fashionStyle?: string;
}

// Update user
export const updateUser = async (input: UpdateUserInput) => {
    try {

        if (!input || (!input.bodyShape && !input.fashionStyle)) {
            throw new Error('No input provided');
        }
        const updateData: UpdateUserInput = {};
        if (input.bodyShape) {
            updateData.bodyShape = input.bodyShape;
        }
        if (input.fashionStyle) {
            updateData.fashionStyle = input.fashionStyle;
        }
        const userCookie = await cookies();
        const currentUser = userCookie.get('user');
        if (!currentUser) {
            throw new Error('User not found');
        }
        const userData = JSON.parse(currentUser.value);
        const email = userData.email;
        const data = {
            ...updateData,
            updatedAt: new Date(),
        };
        // Update the user in the database
        const updateProfile = await db.user.update({
            where: { email },
            data,
        });
        return updateProfile;
    } catch (error) {
        console.log("Error updating profile", error);
        throw error;
    }
};

// Favorite Profucts
