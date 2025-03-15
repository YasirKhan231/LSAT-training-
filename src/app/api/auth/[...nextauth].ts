import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import `db` from Firebase SDK
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore modular functions

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;

          // Save user data to Firestore
          const userRef = doc(db, "users", user.uid); // Reference to the user document
          await setDoc(userRef, {
            id: user.uid,
            email: user.email,
            name: user.displayName || "User",
          });

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName || "User",
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure token.sub is defined
      if (token.sub) {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", token.sub); // Reference to the user document
        const userDoc = await getDoc(userRef); // Fetch the document
        if (userDoc.exists()) {
          session.user = userDoc.data(); // Attach user data to the session
        }
      } else {
        console.warn("Token.sub is undefined. Unable to fetch user data from Firestore.");
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Store user ID in the token
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});