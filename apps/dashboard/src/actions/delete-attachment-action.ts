"use server";

import { getUser } from "@midday/supabase/cached-queries";
import { deleteAttachment } from "@midday/supabase/mutations";
import { createClient } from "@midday/supabase/server";
import { revalidateTag } from "next/cache";
import { action } from "./safe-action";
import { deleteAttachmentSchema } from "./schema";

export const deleteAttachmentAction = action(
  deleteAttachmentSchema,
  async (files) => {
    const supabase = createClient();
    const user = await getUser();
    const data = await deleteAttachment(supabase, files);

    revalidateTag(`transactions_${user.data.team_id}`);

    return data;
  },
);