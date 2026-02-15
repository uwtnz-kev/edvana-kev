// src/pages/Login.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SuccessToast } from "@/components/ui/success-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ColorFulBooks from "@/assets/images/ColorFulBooks.jpg";
import { useAuth } from "@/context/AuthContext";
import { useRedirectToDashboard } from "@/hooks/useRoleRedirect";

const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[+]?[\d\s\-()]+$/.test(val),
      { message: "Must be a valid email or phone number" }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function EdvanaLogin() {
  const { login, isAuthenticated } = useAuth();
  const redirectToDashboard = useRedirectToDashboard();
  const navigate = useNavigate();

  // UI states (spinner on button + toast)
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inputType, setInputType] = useState<"email" | "phone">("email");

  // Tracks a just-completed login so we can delay redirect for the toast
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  // If the user is already authenticated and they open /login manually,
  // send them to their dashboard immediately (no UI changes).
  useEffect(() => {
    if (isAuthenticated && !justLoggedIn) {
      redirectToDashboard();
    }
  }, [isAuthenticated, justLoggedIn, redirectToDashboard]);

  const handleGoBack = () => navigate("/");

  const onSubmit = async (data: LoginForm) => {
    setSubmitting(true);
    setLoginError(null);

    try {
      await login(data.emailOrPhone, data.password);
      setJustLoggedIn(true);
      setShowSuccessToast(true); // show toast
      // Delay redirect so the toast is visible
      setTimeout(() => {
        redirectToDashboard();
        setJustLoggedIn(false);
      }, 2000);
    } catch (error: any) {
      setLoginError(error?.message || "Login failed. Please try again.");
    }

    setSubmitting(false);
  };

  const detectInputType = (value: string) => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (phoneRegex.test(value) && value.length > 8) setInputType("phone");
    else if (emailRegex.test(value)) setInputType("email");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-brown to-brand-primary flex">
      {/* Left Half - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 relative">
        <button
          onClick={handleGoBack}
          className="absolute top-6 left-6 glass-effect px-4 py-2 rounded-lg text-white/80 hover:text-white glass-transition border-0 group flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 group-hover:animate-bounce" />
          Back to Homepage
        </button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="glass-brand-accent rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your Edvana account</p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emailOrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90 flex items-center gap-2">
                        {inputType === "email" ? (
                          <Mail className="h-4 w-4 text-brand-accent" />
                        ) : (
                          <Phone className="h-4 w-4 text-brand-teal" />
                        )}
                        Email or Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your email or phone number"
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-accent focus:ring-brand-accent/20"
                          onChange={(e) => {
                            field.onChange(e);
                            detectInputType(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-brand-accent" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand-accent focus:ring-brand-accent/20 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white/80 glass-transition"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-brand-accent" />
                            ) : (
                              <Eye className="h-4 w-4 text-brand-accent" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <button
                    type="button"
                    className="text-brand-teal hover:text-brand-accent glass-transition text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-accent py-3 rounded-xl text-white font-semibold text-lg glass-transition glass-hover hover:bg-brand-accent/40 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {loginError && (
                  <div className="text-sm text-brand-accent text-center mt-4">
                    {loginError}
                  </div>
                )}
              </form>
            </Form>

            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-white/70 text-sm">
                Don't have an account?{" "}
                <button className="text-brand-teal hover:text-brand-accent glass-transition font-semibold">
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 glass-effect opacity-20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-accent/20" />
        <div className="relative z-20 w-full h-full">
          <img
            src={ColorFulBooks}
            alt="Students learning"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-10 right-10 glass-brand-teal rounded-full w-16 h-16 opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 glass-brand-accent rounded-lg w-12 h-12 opacity-25 animate-bounce" />
        <div className="absolute top-1/2 right-5 glass-effect rounded-full w-8 h-8 opacity-20 animate-pulse" />
      </div>

      <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Login Successful!"
        description="Redirecting to your dashboard..."
      />
    </div>
  );
}
