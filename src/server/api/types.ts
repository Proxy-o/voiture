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
  phone: z.string().min(10).max(50),
  mobile: z.string().min(10).max(50).optional(),
  company_id: z.string().optional(), // Allow null values
});

export const createCarSchema = z.object({
  // Basic information
  chassis_number: z
    .string()
    .min(1)
    .max(17, "Chassis number cannot exceed 17 characters"),
  brand: z.string(),
  model: z.string(),
  car_type: z.string(),
  transmission: z.string(),

  first_registration: z.date(),
  mileage: z.number().positive().int(),
  engine_power: z.number().positive().int(),
  cylinder: z.number().positive().int(),

  fuel: z.string().max(255, "Fuel type cannot exceed 255 characters"), // Enforce max length (255)
  co2: z.string().max(5, "CO2 emission value cannot exceed 5 characters"), // Enforce max length (5)
  color: z.string().max(20, "Color cannot exceed 20 characters"), // Enforce max length (20)

  number_keys: z.number().int().positive(),
  cer_of_conf: z.boolean(),
  inspection_form: z.boolean(),
  car_pass: z.boolean(),
  register_cert: z.boolean(),
});
