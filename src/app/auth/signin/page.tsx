"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Shield } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function AdminSignInPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Check if this is the admin email
      const adminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";

      if (data.email !== adminEmail) {
        setError("Access denied. Only authorized administrators can sign in.");
        setIsLoading(false);
        return;
      }

      // Send OTP (in production, this would send a real OTP)
      const result = await signIn.email({
        email: data.email,
        callbackURL: "/admin",
      });

      if (result.error) {
        setError(result.error.message || "Failed to send OTP");
      } else {
        setEmail(data.email);
        setStep("otp");
        setOtpSent(true);
        // In development, show the OTP in console
        console.log("OTP sent to:", data.email);
        console.log("OTP (for development):", "123456"); // Replace with actual OTP
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Verify OTP and sign in
      const result = await signIn.email({
        email: email,
        otp: data.otp,
        callbackURL: "/admin",
      });

      if (result.error) {
        setError("Invalid OTP. Please try again.");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.email({
        email: email,
        callbackURL: "/admin",
      });

      if (result.error) {
        setError(result.error.message || "Failed to resend OTP");
      } else {
        setError("");
        // In development, show the OTP in console
        console.log("OTP resent to:", email);
        console.log("OTP (for development):", "123456"); // Replace with actual OTP
      }
    } catch (error) {
      setError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Access
          </CardTitle>
          <CardDescription className="text-center">
            {step === "email"
              ? "Enter your admin email to receive an OTP"
              : "Enter the OTP sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-10"
                    {...emailForm.register("email")}
                    disabled={isLoading}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-4"
            >
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  {...otpForm.register("otp")}
                  disabled={isLoading}
                  className="text-center text-lg tracking-widest"
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-red-500">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <div className="text-center text-sm text-zinc-400">
                OTP sent to: <span className="text-white">{email}</span>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resendOtp}
                  disabled={isLoading}
                  className="w-full"
                >
                  Resend OTP
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep("email");
                    setError("");
                    setOtpSent(false);
                  }}
                  className="w-full text-zinc-400 hover:text-white"
                >
                  Back to Email
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => router.push("/profile")}
              className="text-zinc-400 hover:text-white"
            >
              Back to Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
