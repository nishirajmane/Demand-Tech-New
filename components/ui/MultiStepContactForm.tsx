"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Button4 from "./Button4";


type StepKey = "about" | "project" | "company" | "meeting";
type ContactFormData = {
  // Step 1
  firstName: string;
  lastName: string;
  workEmail: string;
  phoneCountry: string;
  phoneNumber: string;
  // Step 2
  projectType: string;
  projectDetails: string;
  priority: string;
  // Step 3
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  // Step 4
  meetingDate: string;
  meetingTime: string;
  meetingFormat: string;
};

const COUNTRY_CODES = [
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
];

const STEP_ORDER: StepKey[] = ["about", "project", "company", "meeting"];

const stepTitle: Record<StepKey, string> = {
  about: "Tell us about yourself",
  project: "How can we help you",
  company: "Tell us about your company",
  meeting: "Book a meeting",
};

const stepIcons: Record<StepKey, React.ReactNode> = {
  about: (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  project: (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  company: (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  meeting: (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const card = "rounded-2xl sm:rounded-3xl bg-transparent shadow-sm border border-gray-100";
const field = "block w-full rounded-lg sm:rounded-xl border-0 bg-gray-50 px-3 py-2 sm:px-4 sm:py-2.5 text-gray-900 placeholder-gray-400 ring-1 ring-inset ring-gray-200 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base";
const label = "block mb-2 sm:mb-3 text-sm sm:text-base font-medium text-gray-700 font-neu";

const stepVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 } 
  },
};

const MultiStepContactForm = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    phoneCountry: "US",
    phoneNumber: "",
    projectType: "",
    projectDetails: "",
    priority: "",
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    meetingDate: "",
    meetingTime: "",
    meetingFormat: "",
  });

  const currentStep = STEP_ORDER[stepIndex];

  const set = <K extends keyof ContactFormData>(key: K, val: ContactFormData[K]) =>
    setData((d) => ({ ...d, [key]: val }));

  // Enhanced validation
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail);
  const phoneOk = data.phoneNumber.length >= 10;
  const urlOk = !data.website || 
    /^https?:\/\/[^\s.]+\.[^\s]{2,}.*$/i.test(data.website) ||
    /^[^\s.]+\.[^\s]{2,}.*$/i.test(data.website);
  
  const requiredOk: Record<StepKey, boolean> = {
    about: !!data.firstName && !!data.lastName && emailOk && !!data.phoneCountry && phoneOk,
    project: !!data.projectType && !!data.projectDetails && !!data.priority,
    company: !!data.companyName && !!data.industry && !!data.companySize && urlOk,
    meeting: !!data.meetingDate && !!data.meetingTime && !!data.meetingFormat,
  };

  const canNext = requiredOk[currentStep];
  const progress = ((stepIndex + 1) / STEP_ORDER.length) * 100;

  const next = () => setStepIndex((i) => Math.min(i + 1, STEP_ORDER.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setStepIndex(0);
          setData({
            firstName: "",
            lastName: "",
            workEmail: "",
            phoneCountry: "US",
            phoneNumber: "",
            projectType: "",
            projectDetails: "",
            priority: "",
            companyName: "",
            website: "",
            industry: "",
            companySize: "",
            meetingDate: "",
            meetingTime: "",
            meetingFormat: "",
          });
        }, 3000);
      } else {
        console.error("Submission error:", result.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again later.");
    }
  };

  if (isSubmitted) {
    return (
      <div
        
        className="flex items-center justify-center px-4"
      >
        <motion.div 
          className={`${card} p-6 sm:p-8 lg:p-12 text-center max-w-lg mx-auto`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Thank you!</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Your inquiry has been submitted successfully. We&apos;ll get back to you within 24 hours to discuss how we can accelerate your path to revenue.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-6xl bg-gray-50 rounded-2xl">
        <div
          className="rounded-2xl sm:rounded-3xl overflow-hidden p-3 sm:p-4 lg:p-6 xl:p-8"
        >
          {/* Progress bar for mobile */}
          <div className="block lg:hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {stepIndex + 1} of {STEP_ORDER.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-[#1D00F8] h-2 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Mobile horizontal stepper */}
          <div className="block sm:hidden mb-6">
            <div className="flex items-center justify-between">
              {STEP_ORDER.map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      index <= stepIndex
                        ? "bg-[#1D00F8] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                    animate={{ 
                      scale: index === stepIndex ? 1.1 : 1,
                    }}
                  >
                    {stepIcons[step]}
                  </motion.div>
                  {index < STEP_ORDER.length - 1 && (
                    <div className={`hidden`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">           
            {/* Desktop/Tablet Left Side Stepper */}
            <div className="hidden sm:block lg:w-64 xl:w-80 flex-shrink-0">
              <div className="bg-gray-100 rounded-xl lg:rounded-2xl p-4 sm:p-6 h-full">
                <div className="space-y-4 sm:space-y-6">
                  {STEP_ORDER.map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                          index <= stepIndex
                            ? "bg-[#1D00F8] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                        animate={{ 
                          scale: index === stepIndex ? 1.1 : 1,
                        }}
                      >
                        {stepIcons[step]}
                      </motion.div>
                      <div className={`hidden sm:block text-xs sm:text-sm font-medium text-center mt-2 ${
                        index <= stepIndex ? "text-[#1D00F8]" : "text-gray-500"
                      }`}>
                        {stepTitle[step]}
                      </div>
                      {index < STEP_ORDER.length - 1 && (
                        <div className={`w-0.5 h-6 sm:h-8 mt-2 transition-all ${
                          index < stepIndex ? "bg-[#1D00F8]" : "bg-gray-200"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="flex-1 flex flex-col min-h-[500px] sm:min-h-[600px]">
              <div className="mb-6 sm:mb-8">
                <motion.h2 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4"
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepTitle[currentStep]}
                </motion.h2>
              </div>

              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  {currentStep === "about" && (
                    <motion.div key="step-about" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className={label}>First name *</label>
                          <input 
                            className={field} 
                            value={data.firstName} 
                            onChange={(e) => set("firstName", e.target.value)} 
                            placeholder="Jane" 
                          />
                        </div>
                        <div>
                          <label className={label}>Last name *</label>
                          <input 
                            className={field} 
                            value={data.lastName} 
                            onChange={(e) => set("lastName", e.target.value)} 
                            placeholder="Doe" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className={label}>Work email *</label>
                        <input 
                          type="email" 
                          className={`${field} ${!emailOk && data.workEmail ? 'ring-red-300 focus:ring-red-500' : ''}`}
                          value={data.workEmail} 
                          onChange={(e) => set("workEmail", e.target.value)} 
                          placeholder="name@company.com" 
                        />
                        {!emailOk && data.workEmail && (
                          <motion.p 
                            className="mt-2 text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Please enter a valid email address
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className={label}>Mobile phone *</label>
                        <div className="grid grid-cols-[120px,1fr] sm:grid-cols-[160px,1fr] gap-2">
                          <select
                            className={field}
                            value={data.phoneCountry}
                            onChange={(e) => set("phoneCountry", e.target.value)}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.code} {c.dial}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            className={`${field} ${!phoneOk && data.phoneNumber ? 'ring-red-300 focus:ring-red-500' : ''}`}
                            placeholder="Phone number"
                            value={data.phoneNumber}
                            onChange={(e) => set("phoneNumber", e.target.value.replace(/\D/g, ''))}
                          />
                        </div>
                        {!phoneOk && data.phoneNumber && (
                          <motion.p 
                            className="mt-2 text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Please enter at least 10 digits
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === "project" && (
                    <motion.div key="step-project" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={label}>What type of project are you interested in? *</label>
                        <select
                          className={field}
                          value={data.projectType}
                          onChange={(e) => set("projectType", e.target.value)}
                        >
                          <option value="">Select project type...</option>
                          <option>Demand Generation</option>
                          <option>Marketing Automation</option>
                          <option>Account-Based Marketing</option>
                          <option>Content Syndication</option>
                          <option>Lead Generation</option>
                          <option>Sales Intelligence</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={label}>Tell us more about your project *</label>
                        <textarea
                          rows={4}
                          className={field}
                          placeholder="Describe your goals, requirements, timeline, and any specific challenges you're facing. The more details you provide, the better we can help you..."
                          value={data.projectDetails}
                          onChange={(e) => set("projectDetails", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={label}>How would you rate the priority of this project? *</label>
                        <select
                          className={field}
                          value={data.priority}
                          onChange={(e) => set("priority", e.target.value)}
                        >
                          <option value="">Select priority...</option>
                          <option>High - Need to start ASAP</option>
                          <option>Medium - Within next 2-3 months</option>
                          <option>Low - Just exploring options</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === "company" && (
                    <motion.div key="step-company" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={label}>Company name *</label>
                        <input 
                          className={field} 
                          value={data.companyName} 
                          onChange={(e) => set("companyName", e.target.value)} 
                          placeholder="Acme Inc." 
                        />
                      </div>

                      <div>
                        <label className={label}>Website URL</label>
                        <input
                          className={`${field} ${!urlOk && data.website ? 'ring-red-300 focus:ring-red-500' : ''}`}
                          placeholder="https://yourcompany.com"
                          value={data.website}
                          onChange={(e) => set("website", e.target.value)}
                        />
                        {!urlOk && data.website && (
                          <motion.p 
                            className="mt-2 text-sm text-red-600"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Please provide a valid URL
                          </motion.p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={label}>Industry *</label>
                          <select className={field} value={data.industry} onChange={(e) => set("industry", e.target.value)}>
                            <option value="">Select industry...</option>
                            <option>Software & Technology</option>
                            <option>FinTech & Financial Services</option>
                            <option>Healthcare & Life Sciences</option>
                            <option>Manufacturing & Industrial</option>
                            <option>Education & E-learning</option>
                            <option>E-commerce & Retail</option>
                            <option>Real Estate & Construction</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className={label}>Company size *</label>
                          <select className={field} value={data.companySize} onChange={(e) => set("companySize", e.target.value)}>
                            <option value="">Select size...</option>
                            <option>1–10 employees</option>
                            <option>11–50 employees</option>
                            <option>51–200 employees</option>
                            <option>201–500 employees</option>
                            <option>501–1000 employees</option>
                            <option>1000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === "meeting" && (
                    <motion.div key="step-meeting" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className={label}>Preferred date *</label>
                          <input 
                            type="date" 
                            className={field} 
                            value={data.meetingDate} 
                            onChange={(e) => set("meetingDate", e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className={label}>Preferred time *</label>
                          <input 
                            type="time" 
                            className={field} 
                            value={data.meetingTime} 
                            onChange={(e) => set("meetingTime", e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className={label}>Meeting format *</label>
                        <select className={field} value={data.meetingFormat} onChange={(e) => set("meetingFormat", e.target.value)}>
                          <option value="">Select format...</option>
                          <option>Zoom</option>
                          <option>Google Meet</option>
                          <option>Microsoft Teams</option>
                          <option>Phone Call</option>
                        </select>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h4 className="font-semibold text-blue-900 mb-3 sm:mb-4 text-base sm:text-lg">Review your information</h4>
                        <div className="text-blue-900 space-y-2 text-sm sm:text-base">
                          <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
                          <p><strong>Email:</strong> {data.workEmail}</p>
                          <p><strong>Company:</strong> {data.companyName}</p>
                          <p><strong>Project:</strong> {data.projectType}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <Button4
                  label="Back"
                  onClick={back}
                  disabled={stepIndex === 0}
                  variant="secondary"
                />

                {stepIndex < STEP_ORDER.length - 1 ? (
                  <Button4
                    label="Next Step"
                    onClick={next}
                    disabled={!canNext}
                    variant="primary"
                  />
                ) : (
                  <Button4
                    label="Submit Request"
                    onClick={handleSubmit}
                    disabled={!requiredOk.meeting}
                    variant="primary"
                  />
                )}
              </div>
              {/* Consent disclaimer */}
              <p className="mt-12 text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed px-2">
                By submitting this form, you agree to our{' '}
                <a href="/privacy-policy" className="underline underline-offset-2 text-gray-700 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{' '}
                and consent to receive communications from DemandTech regarding updates, offers, and other promotional content. You can unsubscribe at any time by clicking the link in the footer of our emails.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepContactForm;