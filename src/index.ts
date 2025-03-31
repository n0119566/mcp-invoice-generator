import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { generateInvoiceApi } from "./api/GenerateInvoiceApi.js";

// Create server instance
const server = new McpServer({
  name: "Invoice PDF Generator",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Define tool handlers
server.tool(
  "generate-invoice",
  "Generates an invoice PDF from a list of orders",
  {
    orders: z.object({
      customer: z.object({
        name: z.string(),
        email: z.string(),
        address: z.string(),
      }),
      items: z.array(
        z.object({
          product: z.string(),
          quantity: z.number(),
          price: z.number(),
        })
      ),
      totalAmount: z.number(),
      status: z
        .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
        .optional(),
      paymentMethod: z
        .enum(["credit_card", "debit_card", "paypal", "cash"])
        .optional(),
      createdAt: z
        .union([z.string(), z.date()]) // Accepts both Date objects and ISO strings
        .optional()
        .transform((val) => (typeof val === "string" ? new Date(val) : val)), // Converts string to Date
    }),
    fileName: z
      .string()
      .describe(
        "The name of the generated file using first_last.pdf of customer"
      ),
  },
  async ({ orders, fileName }) => {
    try {
      if (orders.items.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No orders provided to generate invoice",
            },
          ],
        };
      }

      const outputPath = process.env.TARGET_PATH;
      const outputPathAndFile = outputPath + fileName;
      const data = await generateInvoiceApi(orders, outputPathAndFile);

      return {
        content: [
          {
            type: "text" as const,
            text: `Saving success: ${data.success} at ${data.filePath}`,
          },
        ],
      };
    } catch (error) {
      console.error(error);
      return {
        content: [
          {
            type: "text" as const,
            text: `Error generating invoice: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Invoice PDF Generator MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
