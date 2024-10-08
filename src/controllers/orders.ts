import { Hono } from "hono";
import { authorization } from "../middleware/authorization.js";
import {
	createOrder,
	deleteOrder,
	getOrder,
	getOrders,
	updateOrder,
} from "../services/orders.js";
import { RouterunnerResponse } from "../utility/responses.js";
import type { Environment } from "../utility/types.js";

export const orders = new Hono<Environment>();

orders.post("/", authorization("PLANNER", "ADMIN"), async (c) => {
	const order = await createOrder(await c.req.json());
	return c.json(RouterunnerResponse.data(order), 201);
});

orders.get("/", authorization("DRIVER", "PLANNER", "ADMIN"), async (c) => {
	const orders = await getOrders(c.req.query());
	return c.json(RouterunnerResponse.data(orders), 200);
});

orders.get("/:id", authorization("DRIVER", "PLANNER", "ADMIN"), async (c) => {
	const id = c.req.param("id");
	const order = await getOrder(id);
	return c.json(RouterunnerResponse.data(order), 200);
});

orders.patch("/:id", authorization("PLANNER", "ADMIN"), async (c) => {
	const id = c.req.param("id");
	const order = await updateOrder(id, await c.req.json());
	return c.json(RouterunnerResponse.data(order), 200);
});

orders.delete("/:id", authorization("PLANNER", "ADMIN"), async (c) => {
	const id = c.req.param("id");
	const order = await deleteOrder(id);
	return c.json(RouterunnerResponse.data(order), 200);
});
