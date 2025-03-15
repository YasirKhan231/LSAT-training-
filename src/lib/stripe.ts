import { loadStripe } from "@stripe/stripe-js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export async function createCheckoutSession(
  userId: string,
  planId: "weekly" | "one-time"
) {
  try {
    // Call your backend API to create a Checkout Session
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        planId,
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export async function updateUserSubscription(
  userId: string,
  subscriptionData: {
    tier: "weekly" | "one-time"| "free";
    endsAt?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string | null;
  }
) {
  try {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      subscription: {
        tier: subscriptionData.tier,
        endsAt: subscriptionData.endsAt || null,
        stripeCustomerId: subscriptionData.stripeCustomerId || null,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId || null,
        updatedAt: serverTimestamp(),
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating user subscription:", error);
    throw error;
  }
}
