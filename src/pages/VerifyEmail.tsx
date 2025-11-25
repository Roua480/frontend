import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import bgCircuit from "@/assets/background.png";
import { verifyEmail } from "@/lib/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    async function verify() {
      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }

    verify();
  }, [searchParams]);

  return (
    <div className="relative min-h-screen text-slate-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgCircuit})` }}
      />
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 shadow">

            {status === "loading" && (
              <p className="text-xl">Verifying your email...</p>
            )}

            {status === "success" && (
              <>
                <h1 className="text-2xl font-bold">Email Verified 🎉</h1>
                <p className="mt-2">You can now log in.</p>
              </>
            )}

            {status === "error" && (
              <>
                <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
                <p className="mt-2">Your token is invalid or expired.</p>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
