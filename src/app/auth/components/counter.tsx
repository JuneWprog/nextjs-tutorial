"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export const AuthClient = () => {
  const {
    isLoaded,
    userId,
    // sessionId,
    // getToken
  } = useAuth();
  // const { isLoaded, isSignedIn, user } = useUser();
  const { isSignedIn, user } = useUser();

  if (!isLoaded || !userId) {
    return null;
  }

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <p>{user.firstName}</p>
      <p>{userId}</p>
    </>
  );
};
