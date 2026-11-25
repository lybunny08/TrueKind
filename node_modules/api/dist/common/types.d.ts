import type { Role, OrderStatus } from "@prisma/client";
export interface AuthenticatedUser {
    id: string;
    email: string;
    role: Role;
}
export interface AddressInput {
    type?: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    phone?: string;
    isDefault?: boolean;
}
export interface CreateOrderInput {
    addressId?: string;
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    shipping?: number;
    tax?: number;
}
export type { Role, OrderStatus };
