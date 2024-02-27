import { Elysia, t } from "elysia";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./handlers";

const productsRoutes = new Elysia({ prefix: '/products' })
    .get('/', () => getProducts())
    .get('/:id', ({ params: { id } }) => getProduct(id))
    .post('/', ({ body }) => createProduct(body), {
        body: t.Object({
            name: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            description: t.Optional(t.String({
                minLength: 10,
                maxLength: 200,
            })),
            price_cents: t.Integer({
                minimum: 1,
            }),
            quantity: t.Integer({
                minimum: 1,
            })
        })
    })
    .patch('/:id', ({ params: { id }, body}) => updateProduct(id, body), {
        body: t.Object({
            name: t.Optional(t.String({
                minLength: 3,
                maxLength: 50,
            })),
            description: t.Optional(t.String({
                minLength: 10,
                maxLength: 200,
            })),
            price_cents: t.Optional(t.Integer({
                minimum: 1,
            })),
            quantity: t.Optional(t.Integer({
                minimum: 1,
            }))
        }, {
            minProperties: 1,
        })
    })
    .delete('/:id', ({ params: { id} }) => deleteProduct(id))

export default productsRoutes;