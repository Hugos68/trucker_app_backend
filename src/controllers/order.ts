import { Hono } from "hono";
import { insertOrderSchema, updateOrderSchema } from "../database/tables/order";
import { createRequestValidator } from "../helpers/request-validator";
import {
	createOrder,
	deleteOrder,
	getOrder,
	getOrders,
	updateOrder,
} from "../services/order";

const app = new Hono();

app.get("/", async (c) => {
	const orders = await getOrders();
	return c.json(orders, 200);
});

app.get("/:id", async (c) => {
	const id = c.req.param("id");
	const order = await getOrder(id);
	return c.json(order, 200);
});

app.post("/", createRequestValidator(insertOrderSchema), async (c) => {
	const order = c.req.valid("json");
	const result = await createOrder(order);
	return c.json(result, 201);
});

app.patch("/:id", createRequestValidator(updateOrderSchema), async (c) => {
	const id = c.req.param("id");
	const order = c.req.valid("json");
	const result = await updateOrder(id, order);
	return c.json(result, 200);
});

app.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const result = await deleteOrder(id);
	return c.json(result, 200);
});

export default app;
