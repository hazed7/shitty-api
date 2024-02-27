import { NotFoundError } from 'elysia';
import db from '../../db';
import { user_roles } from '@prisma/client';

export async function getUsers() {
    try {
        return await db.users.findMany({ orderBy: { created_at: 'asc' } })
    } catch (e: unknown) {
        console.log(`Error getting users: ${e}`);
    }
};

export async function getUser(id: string) {
    try {
        const user = await db.users.findUnique({ where: { id: id } });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    } catch (e: unknown) {
        console.log(`Error getting user: ${e}`);
    }
}

export async function createUser(options: { username: string, email: string }) {
    try {
        const { username, email } = options;
        return await db.users.create({ data: { username, email } });
    } catch (e: unknown) {
        console.log(`Error creating user: ${e}`);
    }
}

export async function updateUser(id: string, options: { username?: string, email?: string }) {
    try {
        const { username, email } = options;
        return await db.users.update({
            where: { id: id },
            data: {
                ...(username ? { username } : {}),
                ...(email ? { email } : {})
            },
        });
    } catch (e: unknown) {
        console.log(`Error updating user: ${e}`);
    }
}

export async function deleteUser(id: string) {
    try {
        return await db.users.delete({ where: {id: id} });
    } catch (e: unknown) {
        console.log(`Error deleting user: ${e}`);
    }
}

export async function getUserRole(id: string) {
    try {
        const user = await db.users.findUnique({ where: { id: id} });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user.role;
    } catch (e: unknown) {
        console.log(`Error getting user role: ${e}`);
    }
}

export async function updateUserRole(id: string, options: { role: user_roles }) {
    try {
        const { role } = options;
        return await db.users.update({
            where: { id: id },
            data: { role },
        })
    } catch (e: unknown) {
        console.log(`Error updating user role: ${e}`);
    }
}