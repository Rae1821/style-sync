import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getGoogleClient } from "@/actions/auth";
import { db } from "@/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // console.log("CODE:", code)

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const client = await getGoogleClient();

    // Exchange authorization code for tokens
    const { tokens } = await client.getToken(code);

    //Verify the token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user information
    const payload = ticket.getPayload();

    if (payload?.aud !== process.env.GOOGLE_CLIENT_ID) {
      throw new Error("Invaid audience in ID token");
    }

    // Save user info in the database
    let user = await db.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          name: payload?.name,
          email: payload?.email,
        },
      });
    }

    // Save tokens in the database
    await db.verificationToken.create({
      data: {
        identifier: payload?.sub || "",
        token: tokens.id_token as string,
        expires: tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(),
      },
    });

    // Create a secure, httpOnly cookie with the user info
    const userCookie = await cookies();
    userCookie.set(
      "user",
      JSON.stringify({
        id: payload?.sub,
        name: payload?.name,
        email: payload?.email,
        picture: payload?.picture,
      }),
      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    );
    // set another cookie for tokens (in a real app you might want to encrypt these)
    const tokenCookie = await cookies();
    tokenCookie.set("tokens", JSON.stringify(tokens), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    console.log("USER COOKIE:", userCookie);
    // Redirect to dashboard or home page
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Returned in google payload:

// {
//     iss: 'https://accounts.google.com',
//     azp: '335823983276-ahcjuiatjibq940i3r0jpe0o9a8hosbj.apps.googleusercontent.com',
//     aud: '335823983276-ahcjuiatjibq940i3r0jpe0o9a8hosbj.apps.googleusercontent.com',
//     sub: '101063229483713461153',
//     email: 'rae1821@gmail.com',
//     email_verified: true,
//     at_hash: 'jlevgSOKIjKyy9JKIXGD4w',
//     name: 'Rachel Dooley',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocKNwa8WbM9Ng4aonpj-TsJ4U3ClUa7RpKlnkwtkT-CBgYuNu30vJg=s96-c',
//     given_name: 'Rachel',
//     family_name: 'Dooley',
//     iat: 1743299350,

// TICKET: LoginTicket {
//     envelope: {
//       alg: 'RS256',
//       kid: '821f3bc66f0751f7840606799b1adf9e9fb60dfb',
//       typ: 'JWT'
//     },
