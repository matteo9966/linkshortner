import * as z from "zod";

const CreateLinkSchema = z.object({
  url: z.string(),
  slug: z.string().optional(),
});


type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export type { CreateLinkInput };