"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

type SubscriptionTier = "free" | "weekly" | "one-time";

interface UserContextType {
  isLoggedIn: boolean;
  loading: boolean;
  userId: string | null;
  subscriptionTier: SubscriptionTier;
  subscriptionEndsAt: Date | null;
  isSubscriptionActive: boolean;
  updateSubscription: (tier: SubscriptionTier, endsAt: Date | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>("free");
  const [subscriptionEndsAt, setSubscriptionEndsAt] = useState<Date | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      setUserId(user ? user.uid : null);
      
      if (user) {
        try {
          // Fetch subscription data from Firestore
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          
          if (userData && userData.subscription) {
            setSubscriptionTier(userData.subscription.tier || "free");
            setSubscriptionEndsAt(userData.subscription.endsAt ? new Date(userData.subscription.endsAt) : null);
          }
        } catch (error) {
          console.error("Error fetching subscription data:", error);
        }
      } else {
        // Reset subscription if logged out
        setSubscriptionTier("free");
        setSubscriptionEndsAt(null);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const updateSubscription = (tier: SubscriptionTier, endsAt: Date | null) => {
    setSubscriptionTier(tier);
    setSubscriptionEndsAt(endsAt);
  };
  
  const isSubscriptionActive = subscriptionTier !== "free" && 
    (subscriptionTier === "one-time" || (subscriptionEndsAt ? new Date() < subscriptionEndsAt : false));
  
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loading,
        userId,
        subscriptionTier,
        subscriptionEndsAt,
        isSubscriptionActive,
        updateSubscription,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
} 