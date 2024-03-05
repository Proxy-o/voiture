import { z } from "zod";

export type User = {
  role: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  roleId: number;
  typeId: number;
};

export const createUserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  compagnyId: z.number(),
  is_admin: z.boolean(),
});
export const updateUserSchema = z.object({
  username: z.string().optional(),
  // optional email
  email: z.string().email().optional(),

  password: z.string().min(3).optional(),
});

export const createCompanySchema = z.object({
  company_logo: z.string().optional(), // Allow null values
  company_name: z.string().min(1).max(50),
  owner_name: z.string().min(1).max(50),
  owner_lastname: z.string().min(1).max(50),
  vat_number: z.string().min(1).max(50),
  street: z.string().min(1).max(50),
  zip_code: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
  owner_email: z.string().email(),
  owner_phone: z.string().min(10).max(50),
  owner_website: z.string(),
  bank_name: z.string().min(1).max(50),
  bank_account_number: z.string().min(5).max(50),
  bic_number: z.string().min(5).max(50),
  bank_name2: z.string().max(50).optional(), // Allow null values and limit length
  bank_account_number2: z.string().optional(), // Allow null values
  bic_number2: z.string().optional(), // Allow null values
});

export const createClientSchema = z.object({
  is_company: z.boolean(),
  surname: z.string().min(1).max(50),
  firstname: z.string().min(1).max(50),
  company_name: z.string().min(1).max(50).optional(), // Allow null values
  btw_number: z.string().min(1).max(50).optional(), // Allow null values
  street: z.string().min(1).max(50),
  postal_code: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
  email: z.string().email(),
  phone_number: z.string().min(10).max(50),
  mobile_number: z.string().min(10).max(50).optional(),
  company_id: z.string().optional(), // Allow null values
});

export const createCarSchema = z.object({
  // Basic information
  chassis_number: z
    .string()
    .min(1)
    .max(17, "Chassis number cannot exceed 17 characters"),
  brand: z.string().min(1).max(255, "Brand cannot exceed 255 characters"),
  model: z.string().min(1).max(255, "Model cannot exceed 255 characters"),
  car_type: z.string().min(1).max(255, "Car type cannot exceed 255 characters"),
  transmission: z
    .string()
    .min(1)
    .max(255, "Transmission type cannot exceed 255 characters"),

  first_registration: z.coerce
    .date()
    .max(new Date(), "First registration date cannot be in the future"),
  mileage: z.coerce.number().positive(),
  engine_power: z.coerce.number().positive(),
  cylinder: z.coerce.number().positive(),

  fuel: z.string().min(1).max(255, "Fuel type cannot exceed 255 characters"), // Enforce max length (255)
  co2: z
    .string()
    .min(1)
    .max(5, "CO2 emission value cannot exceed 5 characters"), // Enforce max length (5)
  color: z.string().min(1).max(20, "Color cannot exceed 20 characters"), // Enforce max length (20)

  number_keys: z.coerce.number().positive(),
  cer_of_conf: z.coerce.boolean(),
  inspection_form: z.coerce.boolean(),
  car_pass: z.coerce.boolean(),
  register_cert: z.coerce.boolean(),
  company_id: z.string().optional(), // Allow null values
});

export const createInvoiceSchema = z.object({
  client_id: z.string().optional(),
  car_id: z.string().optional(),
  company_id: z.string().optional(),

  date: z.coerce.date().max(new Date(), "Date cannot be in the future"),
  due_date: z.coerce.date(),
  advance: z.coerce.number().positive(),
  amount: z.coerce.number().positive(),
  payment_method: z.string().min(2).max(255),
  paid_status: z.coerce.boolean(),
  memo: z.string().optional(),
});
