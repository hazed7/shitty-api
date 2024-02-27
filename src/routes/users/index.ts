import { Elysia, t } from "elysia";
import { createUser, deleteUser, getUser, getUserRole, getUsers, updateUser, updateUserRole } from "./handlers";
import { user_roles } from "@prisma/client";

const usersRoutes = new Elysia({ prefix: '/users' })
    .get('/', () => getUsers())
    .get('/:id', ({ params: { id } }) => getUser(id))
    .post('/', ({ body }) => createUser(body), {
        body: t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            email: t.String({ format: "email" }),
        })
    })
    .patch('/:id', ({ params: { id }, body }) => updateUser(id, body), {
        body: t.Object({
            username: t.Optional(t.String({
                minLength: 3,
                maxLength: 50,
            })),
            email: t.Optional(t.String({ format: "email" })),
        }, {
            minProperties: 1,
        })
    })
    .delete('/:id', ({ params: { id } }) => deleteUser(id))

    // roles
    .get('/:id/roles', ({ params: { id } }) => getUserRole(id))
    .patch('/:id/roles', ({ params: { id }, body }) => updateUserRole(id, body), {
        body: t.Object({
            role: t.Enum(user_roles),
        })
    })

export default usersRoutes;