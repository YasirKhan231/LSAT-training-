import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { firestore } from "@/lib/firebaseAdmin"; // Import Firestore instance

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
          await firestore.collection("users").doc(user.uid).set({
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
        const userDoc = await firestore.collection("users").doc(token.sub).get();
        if (userDoc.exists) {
          session.user = userDoc.data();
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