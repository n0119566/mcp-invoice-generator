# MCP Store

A Model Context Protocol (MCP) server for retrieving customer and order information from a store API.

## Overview

This project implements a Model Context Protocol server that provides tools for interacting with a store's customer and order data. It allows Claude to:

- Get a list of all customers
- Search for customers by name
- Retrieve all orders for a specific customer

## Prerequisites

- Node.js (latest LTS version recommended)
- A local API server running on http://localhost:3000 that provides customer and order data

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd mcp-store

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

The MCP server provides the following tools:

### get-all-customers

Returns a list of all customers in the store database.

### get-customer-by-name

Searches for customers by name and returns all matching results.

**Parameters:**
- `customerName`: The name to search for

### get-all-orders-by-customer

Retrieves all orders placed by a specific customer.

**Parameters:**
- `customerId`: The unique identifier for the customer

## Data Models

The server works with the following data models:

### Customer
```typescript
interface ICustomer {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  createdAt?: Date;
}
```

### Order
```typescript
interface IOrder {
  customer: string;
  items: IOrderItem[];
  totalAmount: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: "credit_card" | "debit_card" | "paypal" | "cash";
  createdAt?: Date;
}

interface IOrderItem {
  product: string;
  quantity: number;
  price: number;
}
```

### Product
```typescript
interface IProduct {
  name: string;
  description?: string;
  price: number;
  category?: string;
  inStock?: boolean;
  createdAt?: Date;
}
```

## Development

To work on this project:

1. Make changes to the source files in the `src` directory
2. Build the project with `npm run build`

## License

ISC