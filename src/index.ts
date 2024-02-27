import { Elysia } from "elysia";
import usersRoutes from "./routes/users";
import productsRoutes from "./routes/products";
import ordersRoutes from "./routes/orders";

const app = new Elysia();

app
  .group('/api', (app) => {
    app.use(usersRoutes)
    app.use(productsRoutes)
    app.use(ordersRoutes);

    return app;
  })
  .listen(process.env.PORT || 3049)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
