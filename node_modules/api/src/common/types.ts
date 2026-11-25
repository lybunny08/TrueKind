import type { Role, OrderStatus } from "@prisma/client";

/** The shape of the user object attached to requests by JwtStrategy. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}

/** Address payload accepted by the users endpoints. */
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

/** Payload for creating an order. */
export interface CreateOrderInput {
  addressId?: string;
  items: Array<{ productId: string; quantity: number }>;
  shipping?: number;
  tax?: number;
}

export type { Role, OrderStatus };