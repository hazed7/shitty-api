import { NotFoundError } from "elysia";
import db from '../../db';
import { order_status, payment_method, payment_status, shipment_status } from "@prisma/client";

export async function getOrders() {
    try {
        return await db.orders.findMany({ orderBy: { created_at: "asc" } })
    } catch (e: unknown) {
        console.log(`Error getting orders: ${e}`);
    }
}

export async function getOrder(id: string) {
    try {
        const order = await db.orders.findUnique({ where: { id: id }});
        if (!order) {
            throw new NotFoundError('Order not found');
        }

        return order;
    } catch (e: unknown) {
        console.log(`Error getting order: ${e}`);
    }
}

export async function createOrder(options: {
    status: order_status,
    totalAmountCents: number,
}) {
    try {
        const { status, totalAmountCents } = options;
        return await db.orders.create({
            data: {
                status: status,
                total_amount_cents: totalAmountCents,
            }
        });
    } catch (e: unknown) {
        console.log(`Error creating an order: ${e}`);
    }
}

export async function updateOrder(id: string, options: {
    status: order_status,
}) {
    try {
        const { status } = options;
        return await db.orders.update({
            where: { id: id },
            data: {
                status: status,
            },
        })
    } catch (e: unknown) {
        console.log(`Error updating order status: ${e}`);
    }
}

export async function deleteOrder(id: string) {
    try {
        return await db.orders.delete({ where: { id: id } });
    } catch (e: unknown) {
        console.log(`Error deleting order: ${e}`)
    }
}

// order items
export async function getOrderItems(id: string) {
    try {
        const items = await db.order_items.findMany({
            where: { order_id: id },
            include: {
                product: true,
            },
        });

        return items;
    } catch (e: unknown) {
        console.log(`Error getting product items: ${e}`)
    }
}

export async function createOrderItems(id: string, options: {
    productId: string,
    quantity: number,
    priceCents: number
}) {
    try {
        const { productId, quantity, priceCents } = options;
        return await db.order_items.create({
            data: {
                order_id: id,
                product_id: productId,
                quantity: quantity,
                price_cents: priceCents,
            }
        });
    } catch (e: unknown) {
        console.log(`Error creating order item: ${e}`)
    }
}

// order shipments
export async function getOrderShipments(id: string) {
    try {
        return await db.shipments.findMany({
            where: { order_id: id},
            orderBy: { created_at: "asc" },
            include: {
                order: true,
            }
        });
    } catch (e: unknown) {
        console.log(`Error getting order shipments: ${e}`)
    }
}

export async function updateOrderShipments(id: string, shipmentId: string, options: { status: shipment_status }) {
    try {
        const { status } = options;
        await db.shipments.update({
            where: {
                id: shipmentId,
                order_id: id
            },
            data: {
                status: status,
            }
        });
    } catch (e: unknown) {
        console.log(`Error updating order shipment status: ${e}`)
    }
}

// order payments
export async function getOrderPayments(id: string) {
    try {
        return await db.payments.findMany({
            where: { order_id: id },
            orderBy: { created_at: "asc" },
        })
    } catch (e: unknown) {
        console.log(`Error getting order payments: ${e}`)
    }
}

export async function createOrderPayment(id: string, options: {
    amountCents: number,
    paymentMethod: payment_method,
    transactionId: string,
    status: payment_status,
}) {
    try {
        const { amountCents, paymentMethod, transactionId, status } = options;
        return await db.payments.create({
            data: {
                order_id: id,
                amount_cents: amountCents,
                payment_method: paymentMethod,
                transaction_id: transactionId,
                status: status,
            },
        })
    } catch (e: unknown) {
        console.log(`Error creating order payment: ${e}`)
    }
}

export async function updateOrderPayment(paymentId: string, options: {
    status: payment_status
}) {
    try {
        const { status } = options;
        return await db.payments.update({
            where: {
                id: paymentId,
            },
            data: {
                status: status,
            }
        })
    } catch (e: unknown) {
        console.log(`Error updating order payment status: ${e}`)
    }
}