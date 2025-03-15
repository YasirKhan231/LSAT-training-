import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { updateUserSubscription } from "@/lib/stripe";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id!;
      const planId = session.metadata?.planId as "weekly" | "one-time";

      // Update the user's subscription
      if (planId === "weekly") {
        // For subscriptions, we need to fetch the subscription details
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          const currentPeriodEnd = new Date(
            subscription.current_period_end * 1000
          );

          await updateUserSubscription(userId, {
            tier: "weekly",
            endsAt: currentPeriodEnd,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
          });
        }
      } else {
        // For one-time payments, set "lifetime" access
        await updateUserSubscription(userId, {
          tier: "one-time",
          stripeCustomerId: session.customer as string,
        });
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        );

        // Find the user associated with this subscription
        const db = getFirestore();
        const usersSnapshot = await db
          .collection("users")
          .where("subscription.stripeSubscriptionId", "==", subscription.id)
          .limit(1)
          .get();

        if (!usersSnapshot.empty) {
          const userId = usersSnapshot.docs[0].id;
          const currentPeriodEnd = new Date(
            subscription.current_period_end * 1000
          );

          await updateUserSubscription(userId, {
            tier: "weekly",
            endsAt: currentPeriodEnd,
            stripeSubscriptionId: subscription.id,
          });
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      // Find the user associated with this subscription
      const db = getFirestore();
      const usersSnapshot = await db
        .collection("users")
        .where("subscription.stripeSubscriptionId", "==", subscription.id)
        .limit(1)
        .get();

      if (!usersSnapshot.empty) {
        const userId = usersSnapshot.docs[0].id;

        // Downgrade to free tier
        await updateUserSubscription(userId, {
          tier: "free",
          stripeSubscriptionId: null,
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
