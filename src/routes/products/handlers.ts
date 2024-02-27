import { NotFoundError } from "elysia";
import db from '../../db';

export async function getProducts() {
    try {
        return await db.products.findMany({ orderBy: { created_at: 'asc' } })
    } catch (e: unknown) {
        console.log(`Error getting products: ${e}`);
    }
}

export async function getProduct(id: string) {
    try {
        const product = await db.products.findUnique({ where: { id: id }})

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return product;
    } catch (e: unknown) {
        console.log(`Error getting product: ${e}`);
    }
}

export async function createProduct(options: {
    name: string,
    description?: string,
    price_cents: number,
    quantity: number
}) {
    try {
        const { name, description, price_cents, quantity } = options;
        return await db.products.create({ data: { name, description, price_cents, quantity }});
    } catch (e: unknown) {
        console.log(`Error creating product: ${e}`);
    }
}

export async function updateProduct(id: string, options: {
    name?: string,
    description?: string,
    price_cents?: number,
    quantity?: number
}) {
    try {
        const { name, description, price_cents, quantity } = options;
        return await db.products.update({
            where: { id: id },
            data: {
                ...(name ? { name } : {}),
                ...(description ? { description } : {}),
                ...(price_cents ? { price_cents } : {}),
                ...(quantity ? { quantity} : {})
            },
        })
    } catch (e: unknown) {
        console.log(`Error updating product: ${e}`)
    }
}

export async function deleteProduct(id: string) {
    try {
        return await db.products.delete({ where: { id: id} });
    } catch (e: unknown) {
        console.log(`Error deleting product: ${e}`)
    }
}