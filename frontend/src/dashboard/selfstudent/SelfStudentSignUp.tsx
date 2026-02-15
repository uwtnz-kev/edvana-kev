import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, Calendar, GraduationCap, ArrowLeft } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { SuccessToast } from "@/components/ui/success-toast";

// Form validation schema with conditional validation
const createStudentSignupSchema = () => z.object({
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
  curriculumStructure: z.string().min(1, "Curriculum structure is required"),
  level: z.string().min(1, "Education level is required"),
  grade: z.string().min(1, "Grade level is required"),
  combination: z.string().optional(),
  school: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),

}).refine((data) => {
  // Make combination required for A'Level students in both curriculum structures
  const isALevel = (data.curriculumStructure === "Rwanda National School Structure" && data.level === "Upper Secondary (A'Level)") ||
                  (data.curriculumStructure === "Cambridge Curriculum Structure" && data.level === "Upper Secondary");
  if (isALevel) {
    return data.combination && data.combination.length > 0;
  }
  return true;
}, {
  message: "Subject combination is required for upper secondary students",
  path: ["combination"],
}).refine((data) => {
  // Make parent information required for nursery and primary students
  const isYoungStudent = (data.curriculumStructure === "Rwanda National School Structure" && (data.level === "Nursery" || data.level === "Primary School")) ||
                        (data.curriculumStructure === "Cambridge Curriculum Structure" && (data.level === "Early Years Foundation Stage" || data.level === "Primary Years"));
  if (isYoungStudent) {
    return data.parentName && data.parentName.length >= 2;
  }
  return true;
}, {
  message: "Parent/Guardian name is required for nursery and primary students",
  path: ["parentName"],
}).refine((data) => {
  // Make parent phone required for nursery and primary students
  const isYoungStudent = (data.curriculumStructure === "Rwanda National School Structure" && (data.level === "Nursery" || data.level === "Primary School")) ||
                        (data.curriculumStructure === "Cambridge Curriculum Structure" && (data.level === "Early Years Foundation Stage" || data.level === "Primary Years"));
  if (isYoungStudent) {
    return data.parentPhone && data.parentPhone.length >= 10;
  }
  return true;
}, {
  message: "Parent/Guardian phone number is required for nursery and primary students",
  path: ["parentPhone"],
});

const studentSignupSchema = createStudentSignupSchema();

type StudentSignupForm = z.infer<typeof studentSignupSchema>;

// Curriculum structures
const curriculumStructures = [
  "Rwanda National School Structure",
  "Cambridge Curriculum Structure"
];

// Education levels by curriculum structure
const educationLevelsByStructure = {
  "Rwanda National School Structure": [
    "Nursery",
    "Primary School", 
    "Lower Secondary (O'Level)",
    "Upper Secondary (A'Level)"
  ],
  "Cambridge Curriculum Structure": [
    "Early Years Foundation Stage",
    "Primary Years",
    "Lower Secondary", 
    "Upper Secondary"
  ]
};

// Grade levels by curriculum structure and education level
const gradesByStructureAndLevel = {
  "Rwanda National School Structure": {
    "Nursery": ["Nursery 1", "Nursery 2", "Nursery 3"],
    "Primary School": ["P1", "P2", "P3", "P4", "P5", "P6"],
    "Lower Secondary (O'Level)": ["S1", "S2", "S3"],
    "Upper Secondary (A'Level)": ["S4", "S5", "S6"]
  },
  "Cambridge Curriculum Structure": {
    "Early Years Foundation Stage": ["Reception", "Year 1", "Year 2"],
    "Primary Years": ["Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8"],
    "Lower Secondary": ["Year 9", "Year 10", "Year 11"],
    "Upper Secondary": ["Year 12", "Year 13"]
  }
};

// A'Level combinations
const aLevelCombinations = [
  "Sciences",
  "Arts & Humanities",
  "Languages"
];

export default function SelfStudentSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<StudentSignupForm>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      curriculumStructure: "",
      level: "",
      grade: "",
      combination: "",
      school: "",
      parentName: "",
      parentPhone: "",

    },
  });

  // Watch curriculum structure and level fields
  const selectedStructure = form.watch("curriculumStructure");
  const selectedLevel = form.watch("level");
  
  // Get available education levels based on curriculum structure
  const availableLevels = selectedStructure ? educationLevelsByStructure[selectedStructure as keyof typeof educationLevelsByStructure] || [] : [];
  
  // Get available grades based on structure and level
  const availableGrades = (selectedStructure && selectedLevel) ? 
    (gradesByStructureAndLevel[selectedStructure as keyof typeof gradesByStructureAndLevel] as Record<string, string[]>)?.[selectedLevel] || [] : [];
  
  // Reset dependent fields when curriculum structure changes
  React.useEffect(() => {
    if (selectedStructure) {
      form.setValue("level", "");
      form.setValue("grade", "");
      form.setValue("combination", "");
    }
  }, [selectedStructure, form]);
  
  // Reset grade and combination when level changes
  React.useEffect(() => {
    if (selectedLevel) {
      form.setValue("grade", "");
      // Only show combination for A'Level in Rwanda structure and Upper Secondary in Cambridge
      const isALevel = (selectedStructure === "Rwanda National School Structure" && selectedLevel === "Upper Secondary (A'Level)") ||
                      (selectedStructure === "Cambridge Curriculum Structure" && selectedLevel === "Upper Secondary");
      if (!isALevel) {
        form.setValue("combination", "");
      }
      
      // Reset parent fields when level changes
      const isYoungStudent = (selectedStructure === "Rwanda National School Structure" && (selectedLevel === "Nursery" || selectedLevel === "Primary School")) ||
                            (selectedStructure === "Cambridge Curriculum Structure" && (selectedLevel === "Early Years Foundation Stage" || selectedLevel === "Primary Years"));
      if (!isYoungStudent) {
        form.setValue("parentName", "");
        form.setValue("parentPhone", "");
      }
    }
  }, [selectedLevel, selectedStructure, form]);

  // Check if student needs parent information
  const needsParentInfo = (selectedStructure === "Rwanda National School Structure" && (selectedLevel === "Nursery" || selectedLevel === "Primary School")) ||
                         (selectedStructure === "Cambridge Curriculum Structure" && (selectedLevel === "Early Years Foundation Stage" || selectedLevel === "Primary Years"));

  const handleNext = () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = currentStep === 1 
      ? ['firstName', 'lastName', 'email', 'dateOfBirth'] 
      : ['curriculumStructure', 'level', 'grade'];
    
    // Add conditional validation for parent info in step 1
    if (currentStep === 1 && needsParentInfo) {
      fieldsToValidate.push('parentName', 'parentPhone');
    }
    
    // Add conditional validation for combination in step 2
    if (currentStep === 2) {
      const isALevel = (selectedStructure === "Rwanda National School Structure" && selectedLevel === "Upper Secondary (A'Level)") ||
                      (selectedStructure === "Cambridge Curriculum Structure" && selectedLevel === "Upper Secondary");
      if (isALevel) {
        fieldsToValidate.push('combination');
      }
    }
    
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setCurrentStep(2);
      }
    });
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (data: StudentSignupForm) => {
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
            <GraduationCap className="h-12 w-12 text-brand-accent mb-2" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join Edvana</h1>
          <p className="text-white/80 text-lg">Create your student account to access Rwanda's premier educational platform</p>
        </div>

        {/* Signup Form */}
        <div className="glass-card border-white/20 rounded-lg backdrop-blur-md">
          <div className="p-6 text-center border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Student Registration</h2>
            <p className="text-white/70 mt-2">
              Step {currentStep} of {totalSteps}: {currentStep === 1 ? 'Personal Information' : 'Academic Information'}
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

                    {needsParentInfo && (
                      <div className="space-y-4 mt-6">
                        <h4 className="text-md font-medium text-white/90">Parent/Guardian Information (Required for young students)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="parentName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Parent/Guardian Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter parent/guardian name"
                                    className="glass-input"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="parentPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Parent/Guardian Phone *</FormLabel>
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
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Academic Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Academic Information
                    </h3>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="curriculumStructure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Curriculum Structure *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="glass-select">
                                  <SelectValue placeholder="Select curriculum structure" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-card border-white/20 bg-transparent">
                                {curriculumStructures.map((structure) => (
                                  <SelectItem key={structure} value={structure} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                    {structure}
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
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Education Level *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedStructure}>
                              <FormControl>
                                <SelectTrigger className="glass-select">
                                  <SelectValue placeholder={!selectedStructure ? "Select curriculum structure first" : "Select your education level"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-card border-white/20 bg-transparent">
                                {availableLevels.map((level) => (
                                  <SelectItem key={level} value={level} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                    {level}
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
                        name="grade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Grade Level *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedLevel || !selectedStructure}>
                              <FormControl>
                                <SelectTrigger className="glass-select">
                                  <SelectValue placeholder={!selectedStructure || !selectedLevel ? "Select curriculum and level first" : "Select your grade"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="glass-card border-white/20 bg-transparent">
                                {availableGrades.map((grade: string) => (
                                  <SelectItem key={grade} value={grade} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                    {grade}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      {((selectedStructure === "Rwanda National School Structure" && selectedLevel === "Upper Secondary (A'Level)") ||
                        (selectedStructure === "Cambridge Curriculum Structure" && selectedLevel === "Upper Secondary")) && (
                        <FormField
                          control={form.control}
                          name="combination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Subject Combination *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="glass-select">
                                    <SelectValue placeholder="Select your combination" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="glass-card border-white/20 bg-transparent max-h-60">
                                  {aLevelCombinations.map((combination) => (
                                    <SelectItem key={combination} value={combination} className="text-white hover:bg-white/10 focus:text-white focus:bg-white/10">
                                      {combination}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Current School (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your school name"
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
                        Create Account
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
        title="Create Student Account"
        description="Are you sure you want to create your Edvana student account with the information provided?"
        confirmText="Create Account"
        isLoading={isSubmitting}
      />

      {/* Success Toast */}
      <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Account Created Successfully!"
        description="Welcome to Edvana! You will be redirected to the login page shortly."
      />
    </div>
  );
}