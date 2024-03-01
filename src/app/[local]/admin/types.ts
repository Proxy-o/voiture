"use client";

import { create } from "domain";
import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).optional(),
  type: z.enum(["cafe", "restaurant", "gym"]).optional(),
});

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

export const createCompanySchema = z.object({
  company_logo: z.string().optional().nullable(), // Allow null values
  company_name: z.string().min(1).max(50),
  owner_name: z.string().min(1).max(50),
  owner_lastname: z.string().min(1).max(50),
  vat_number: z.string(),
  street: z.string().min(1).max(50),
  zip_code: z.string(),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
  owner_email: z.string().email(),
  owner_phone: z.string(),
  owner_website: z.string(), // Allow null values and validate as a URL
  bank_name: z.string().min(1).max(50),
  bank_account_number: z.string(),
  bic_number: z.string(),
  bank_name2: z.string().max(50).optional().nullable(), // Allow null values and limit length
  bank_account_number2: z.string().optional().nullable(), // Allow null values
  bic_number2: z.string().optional().nullable(), // Allow null values
});
