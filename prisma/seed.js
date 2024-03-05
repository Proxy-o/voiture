import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";

const prisma = new PrismaClient();

async function main() {
  // create sittings
  await prisma.settings.create({
    data: {
      company_logo: "images/mbo.png",
      company_name: "MBO",
      owner_name: "Mehdi",
      owner_lastname: "Latifi",
      vat_number: "123.456.789",
      street: "vivastreet 123",
      zip_code: "1234",
      city: "Hasselt",
      country: "TEST",
      owner_email: "mbo@test.be",
      owner_phone: "04949002034",
      owner_website: "www.mbo.be",
      bank_name: "ING",
      bank_account_number: "123443211234",
      bic_number: "BNBTRH",
      bank_name2: "KBC",
      bank_account_number2: "BE1234569305",
      bic_number2: "BNHJGNG",
    },
  });

  // create admin user
  const hashedPassword = await new Argon2id().hash("admin123");
  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      is_admin: true,
      password: hashedPassword,
      compagny: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.car.create({
    data: {
      chassis_number: "123ABC456DEF",
      brand: "BMW",
      model: "330",
      car_type: "Personenwagen",
      transmission: "Automatisch",
      first_registration: new Date("2020-05-01"),
      mileage: 1000,
      engine_power: 200,
      cylinder: 3,
      fuel: "Benzine",
      co2: "100",
      color: "Zwart",
      number_keys: 2,
      cer_of_conf: true,
      inspection_form: true,
      car_pass: true,
      register_cert: true,
      created_at: new Date(),
      updated_at: new Date(),
      compagny_id: 1, // Assuming you have a company with ID 1
    },
  });

  await prisma.car.create({
    data: {
      chassis_number: "9238BCEF56DEF",
      brand: "DACIA",
      model: "330",
      car_type: "Personenwagen",
      transmission: "Automatisch",
      first_registration: new Date("2020-05-01"),
      mileage: 1000,
      engine_power: 200,
      cylinder: 3,
      fuel: "Benzine",
      co2: "150",
      color: "Blue",
      number_keys: 2,
      cer_of_conf: true,
      inspection_form: true,
      car_pass: true,
      register_cert: true,
      compagny_id: 1,
    },
  });

  await prisma.client.create({
    data: {
      is_company: false,
      surname: "Doe",
      firstname: "John",
      company_name: null, // Assuming not a company
      btw_number: null, // Assuming not applicable
      street: "123 Main St",
      postal_code: "12345",
      city: "Anytown",
      country: "USA",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      mobile_number: "098-765-4321",
      compagny_id: 1, // Assuming you have a company with ID 1
    },
  });

  await prisma.client.create({
    data: {
      is_company: false,
      surname: "lila",
      firstname: "bira",
      company_name: null, // Assuming not a company
      btw_number: null, // Assuming not applicable
      street: "123 Main St",
      postal_code: "12345",
      city: "Anytownf",
      country: "maroco",
      email: "bira@example.com",
      phone_number: "123-456-7890",
      mobile_number: "098-765-4321",
      compagny_id: 1, // Assuming you have a company with ID 1
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
