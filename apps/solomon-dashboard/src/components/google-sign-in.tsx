"use client";

import { createClient } from "@midday/supabase/client";
import { Button } from "@midday/ui/button";
import { Icons } from "@midday/ui/icons";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function GoogleSignIn() {
  const [isLoading, setLoading] = useState(false);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return_to");

  const handleSignIn = async () => {
    setLoading(true);

    if (isDesktopApp()) {
      const redirectTo = new URL("/api/auth/callback", window.location.origin);

      redirectTo.searchParams.append("provider", "google");
      redirectTo.searchParams.append("client", "desktop");

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo.toString(),
          queryParams: {
            client: "desktop",
          },
        },
      });
    } else {
      console.log("return to", returnTo);
      const redirectTo = new URL("/api/auth/callback", window.location.origin);

      console.log("redirect to", redirectTo);

      console.log("executing return to conditional check")
      if (returnTo) {
        console.log("returning to", returnTo, "from google sign in appended");
        redirectTo.searchParams.append("return_to", returnTo);
      }

      redirectTo.searchParams.append("provider", "google");

      console.log("creating user in supabase")
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo.toString(),
        },
      });
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className="active:scale-[0.98] bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full rounded-2xl"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Icons.Google />
          <span>Continue with Google</span>
        </>
      )}
    </Button>
  );
}
