import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { School, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EnhancedButton } from "@/components/ui/enhanced-button";

const inquirySchema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  contactPersonName: z.string().min(2, "Contact person name is required"),
  contactPersonRole: z.string().min(1, "Please select your role"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specificNeeds: z.string().min(10, "Please describe your specific needs"),
  timelineExpectation: z.string().min(1, "Please select expected timeline"),
  budgetRange: z.string().min(1, "Please select budget range"),
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to be contacted"),
});

export default function SchoolInquiryForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      schoolName: "",
      contactPersonName: "",
      contactPersonRole: "",
      email: "",
      phone: "",
      specificNeeds: "",
      timelineExpectation: "",
      budgetRange: "",
      agreedToTerms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4C5454] via-[#523F38] to-[#4C5454] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <EnhancedButton
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              icon={<ArrowLeft className="h-4 w-4" />}
              className="absolute left-4 top-4"
            >
              Back to Home
            </EnhancedButton>
          </div>
        </div>
        <div className="mb-8 text-center">
          <School className="h-12 w-12 text-brand-accent mb-2 mx-auto" />
          <h1 className="text-4xl font-bold text-white mb-2">School Inquiry</h1>
          <p className="text-white/80 text-lg">
            Tell us about your school’s needs, and we’ll get in touch
          </p>
        </div>

        <div className="glass-card border-white/20 rounded-lg backdrop-blur-md p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        School Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your school's name"
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPersonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Contact Person *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactPersonRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Your Role *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="glass-input bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="glass-card border-white/20 bg-transparent">
                          <SelectItem value="headteacher">
                            Head Teacher
                          </SelectItem>
                          <SelectItem value="deputy">Deputy Head</SelectItem>
                          <SelectItem value="admin">
                            School Administrator
                          </SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="+250 7XX XXX XXX"
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timelineExpectation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Expected Timeline *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="glass-input bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="glass-card border-white/20 bg-transparent">
                          <SelectItem value="immediate">
                            Immediate (Within 1 month)
                          </SelectItem>
                          <SelectItem value="short-term">1–3 months</SelectItem>
                          <SelectItem value="medium-term">
                            3–6 months
                          </SelectItem>
                          <SelectItem value="long-term">6+ months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="specificNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Specific Needs *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe what your school needs..."
                          className="glass-input bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage className="text-brand-accent" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#2D5A4A] to-[#3D6B58] hover:from-[#356B52] hover:to-[#4A7C69] text-white border-white/30 shadow-lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
