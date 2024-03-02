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
