"use server"
import Stripe from "stripe"

import { CartProduct } from "../context/cart"


interface createStripeCheckoutInput {
    products: CartProduct[]
}

export const createStripCheckout = async ({ products }: createStripeCheckoutInput) => {

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing stripe secret key")
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-02-24.acacia"
    })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
        line_items: products.map(product => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: product.name,
                    images: [product.imageUrl]
                },
                unit_amount: parseInt(String(product.price * 100)),
            },
            quantity: product.quantity,
        })),


    });
    return { sessionId: session.id }
}