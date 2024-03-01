import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(3).max(50),
});
