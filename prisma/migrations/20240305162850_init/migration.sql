-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" BIGSERIAL NOT NULL,
    "company_logo" VARCHAR(255),
    "company_name" VARCHAR(50) NOT NULL,
    "owner_name" VARCHAR(50) NOT NULL,
    "owner_lastname" VARCHAR(50) NOT NULL,
    "vat_number" VARCHAR(255) NOT NULL,
    "street" VARCHAR(50) NOT NULL,
    "zip_code" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "owner_email" VARCHAR(50) NOT NULL,
    "owner_phone" VARCHAR(255) NOT NULL,
    "owner_website" VARCHAR(50) NOT NULL,
    "bank_name" VARCHAR(50) NOT NULL,
    "bank_account_number" VARCHAR(255) NOT NULL,
    "bic_number" VARCHAR(255) NOT NULL,
    "bank_name2" VARCHAR(50),
    "bank_account_number2" VARCHAR(255),
    "bic_number2" VARCHAR(255),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" VARCHAR(255) NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compagny_id" BIGINT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" BIGSERIAL NOT NULL,
    "chassis_number" VARCHAR(17) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "car_type" VARCHAR(255) NOT NULL,
    "transmission" VARCHAR(20) NOT NULL,
    "first_registration" TIMESTAMP(3) NOT NULL,
    "mileage" INTEGER NOT NULL,
    "engine_power" INTEGER NOT NULL,
    "cylinder" INTEGER NOT NULL,
    "fuel" VARCHAR(255) NOT NULL,
    "co2" VARCHAR(5) NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "number_keys" INTEGER NOT NULL,
    "cer_of_conf" BOOLEAN NOT NULL DEFAULT false,
    "inspection_form" BOOLEAN NOT NULL DEFAULT false,
    "car_pass" BOOLEAN NOT NULL DEFAULT false,
    "register_cert" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "compagny_id" BIGINT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" BIGSERIAL NOT NULL,
    "is_company" BOOLEAN NOT NULL,
    "surname" VARCHAR(255),
    "firstname" VARCHAR(255),
    "company_name" VARCHAR(255),
    "btw_number" VARCHAR(255),
    "street" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30),
    "phone_number" VARCHAR(20),
    "mobile_number" VARCHAR(20),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "compagny_id" BIGINT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" BIGSERIAL NOT NULL,
    "client_id" BIGINT NOT NULL,
    "car_id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "advance" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "paid_status" BOOLEAN NOT NULL,
    "memo" VARCHAR(255),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_chassis_number_key" ON "Car"("chassis_number");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
