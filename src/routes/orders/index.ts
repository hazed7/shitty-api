import { Elysia, t } from "elysia";
import { createOrder, createOrderItems, createOrderPayment, deleteOrder, getOrder, getOrderItems, getOrderPayments, getOrderShipments, getOrders, updateOrder, updateOrderPayment, updateOrderShipments } from "./handlers";
import { order_status, payment_method, payment_status, shipment_status } from "@prisma/client";

const ordersRoutes = new Elysia({ prefix: "/orders" })
    .get('/', () => getOrders())
    .get('/:id', ({ params: { id } }) => getOrder(id))
    .post('/', ({ body }) => createOrder(body), {
        body: t.Object({
            status: t.Enum(order_status),
            totalAmountCents: t.Integer({
                minimum: 1
            }),
        })
    })
    .patch('/:id', ({ params: { id }, body}) => updateOrder(id, body), {
        body: t.Object({
            status: t.Enum(order_status),
        })
    })
    .delete('/:id', ({ params: { id }, body}) => deleteOrder(id))

    // order items
    .get('/:id/items', ({ params: { id } }) => getOrderItems(id))
    .post('/:id/items', ({ params: { id }, body}) => createOrderItems(id, body), {
        body: t.Object({
            productId: t.String(),
            quantity: t.Integer({
                minimum: 1
            }),
            priceCents: t.Integer({
                minimum: 1
            }),
        })
    })

    // order shipments
    .get('/:id/shipments', ({ params: { id } }) => getOrderShipments(id))
    .patch('/:id/shipments/:shipment_id', ({ params: { id, shipment_id }, body}) => updateOrderShipments(id, shipment_id, body), {
        body: t.Object({
            status: t.Enum(shipment_status),
        })
    })

    // payments
    .get('/:id/payments', ({ params: { id } }) => getOrderPayments(id))
    .post('/:id/payments', ({ params: { id }, body}) => createOrderPayment(id, body), {
        body: t.Object({
            amountCents: t.Integer({
                minimum: 1
            }),
            paymentMethod: t.Enum(payment_method),
            transactionId: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            status: t.Enum(payment_status),
        })
    })
    .patch('/payments/:id', ({ params: { id }, body}) => updateOrderPayment(id, body), {
        body: t.Object({
            status: t.Enum(payment_status)
        })
    })


export default ordersRoutes;