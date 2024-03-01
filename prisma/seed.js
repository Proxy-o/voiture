import { PrismaClient } from "@prisma/client";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({
    data: {
      name: "admin",
    },
  });

  await prisma.role.create({
    data: {
      name: "user",
    },
  });

  await prisma.type.create({
    data: {
      name: "cafe",
    },
  });

  await prisma.type.create({
    data: {
      name: "gym",
    },
  });
  await prisma.type.create({
    data: {
      name: "restaurant",
    },
  });

  // create admin user
  const hashedPassword = await new Argon2id().hash("admin123");
  const userId = generateId(15);
  await prisma.user.create({
    data: {
      id: userId,
      username: "admin",
      email: "admin@gmail.com",
      hashed_password: hashedPassword,
      role: {
        connect: {
          name: "admin",
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.error(`Failed to disconnect from Prisma: ${e}`);
    });
  });
