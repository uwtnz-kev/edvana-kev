import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, Calendar, GraduationCap, ArrowLeft, BookOpen, Award } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { SuccessToast } from "@/components/ui/success-toast";

// Form validation schema for teacher signup
const createTeacherSignupSchema = () => z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name cannot exceed 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name cannot exceed 50 characters"),
  email: z.string()
    .min(1, "Email address is required")
    .refine((email) => {
      // More permissive email validation that accepts educational domains
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }, "Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")).refine((phone) => {
    if (!phone || phone === "") return true; // Allow empty phone
    // Rwanda phone number validation: +250 XXX XXX XXX or 07XX XXX XXX
    const phoneRegex = /^(\+250\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}|07[0-9]{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }, "Please enter a valid Rwanda phone number (+250 XXX XXX XXX or 07XX XXX XXX)"),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare only dates
      return selectedDate <= today;
    }, "Date of birth cannot be in the future")
    .refine((date) => {
      const selectedDate = new Date(date);
      const hundredYearsAgo = new Date();
      hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
      return selectedDate >= hundredYearsAgo;
    }, "Please enter a valid date of birth"),
  qualification: z.string().min(1, "Educational qualification is required"),
  experience: z.string().min(1, "Teaching experience is required"),
  currentSchool: z.string().optional(),
});

const teacherSignupSchema = createTeacherSignupSchema();

type TeacherSignupForm = z.infer<typeof teacherSignupSchema>;

// Educational qualifications
const qualifications = [
  "Other",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD"
];

// Teaching experience levels
const experienceLevels = [
  "New Graduate (0 years)",
  "1-2 years",
  "3-5 years", 
  "6-10 years",
  "11-15 years",
  "16-20 years",
  "20+ years"
];

export default function TeacherSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<TeacherSignupForm>({
    resolver: zodResolver(teacherSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      qualification: "",
      experience: "",
      currentSchool: "",
    },
  });

  const handleNext = () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = currentStep === 1 
      ? ['firstName', 'lastName', 'email', 'dateOfBirth'] 
      : ['qualification', 'experience'];
    
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setCurrentStep(2);
      }
    });
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (data: TeacherSignupForm) => {
    setShowConfirmModal(true);
  };

  const confirmSignup = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setShowSuccessToast(true);
      
      // Reset form after successful submission
      form.reset();
      
      // Navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <BookOpen className="h-12 w-12 text-brand-accent mb-2" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join Edvana as a Teacher</h1>
          <p className="text-white/80 text-lg">Create your educator account to inspire Rwanda's next generation</p>
        </div>

        {/* Signup Form */}
        <div className="glass-card border-white/20 rounded-lg backdrop-blur-md">
          <div className="p-6 text-center border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Teacher Registration</h2>
            <p className="text-white/70 mt-2">
              Step {currentStep} of {totalSteps}: {currentStep === 1 ? 'Personal Information' : 'Professional Information'}
            </p>
            
            {/* Progress Indicator */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-2">
                {[1, 2].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full ${
                      step <= currentStep ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">First Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your first name"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Last Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your last name"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your.email@example.com"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="+250 XXX XXX XXX"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Date of Birth *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="date"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <div></div> {/* Empty div to maintain grid layout */}
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Professional Information
                    </h3>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="qualification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Educational Qualification *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="glass-select">
                                  <SelectValue placeholder="Select your qualification" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-card border-white/20 bg-transparent">
                                {qualifications.map((qualification) => (
                                  <SelectItem key={qualification} value={qualification} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                    {qualification}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Teaching Experience *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="glass-select">
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-card border-white/20 bg-transparent">
                                {experienceLevels.map((experience) => (
                                  <SelectItem key={experience} value={experience} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                    {experience}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentSchool"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Current School (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your current school"
                                className="glass-input"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <div></div> {/* Empty div to maintain grid layout */}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <EnhancedButton
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="bg-gradient-to-r from-[#4C5454] to-[#523F38] hover:from-[#5A6262] hover:to-[#604940] text-white border-white/30 shadow-lg"
                    >
                      Previous
                    </EnhancedButton>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < totalSteps ? (
                      <EnhancedButton
                        type="button"
                        onClick={handleNext}
                        className="bg-gradient-to-r from-[#523F38] to-[#4C5454] hover:from-[#604940] hover:to-[#5A6262] text-white border-white/30 shadow-lg"
                      >
                        Next
                      </EnhancedButton>
                    ) : (
                      <EnhancedButton
                        type="submit"
                        loading={isSubmitting}
                        className="bg-gradient-to-r from-[#2D5A4A] to-[#3D6B58] hover:from-[#356B52] hover:to-[#4A7C69] text-white border-white/30 shadow-lg"
                      >
                        Create Teacher Account
                      </EnhancedButton>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSignup}
        title="Create Teacher Account"
        description="Are you sure you want to create your Edvana teacher account with the information provided?"
        confirmText="Create Teacher Account"
        isLoading={isSubmitting}
      />

      {/* Success Toast */}
      <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Teacher Account Created Successfully!"
        description="Welcome to Edvana! You will be redirected to the login page shortly."
      />
    </div>
  );
}