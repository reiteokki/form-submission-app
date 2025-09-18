import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const existing = await prisma.customer.findUnique({
    where: { email: "demo@example.com" },
  });

  if (!existing) {
    await prisma.customer.create({
      data: {
        name: null,
        email: "demo@example.com",
        password: hashedPassword,
        form_filled: false,
        phone_number: null,
        image: null,
      },
    });
    console.log("✅ Demo user created");
  } else {
    console.log("ℹ️ Demo user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
