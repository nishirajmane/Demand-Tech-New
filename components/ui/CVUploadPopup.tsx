"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Upload, User, Briefcase } from "lucide-react";
import Button4 from "./Button4";

interface CVUploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVUploadPopup: React.FC<CVUploadPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
        setCvFile(file);
        setErrors((prev) => ({ ...prev, file: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "Please upload a PDF file under 10MB.",
        }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
        setCvFile(file);
        setErrors((prev) => ({ ...prev, file: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "Please upload a PDF file under 10MB.",
        }));
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!cvFile) {
      newErrors.file = "Please upload your CV";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('position', position);
      if (cvFile) {
        formData.append('cvFile', cvFile);
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
          setName("");
          setPosition("");
          setCvFile(null);
          setErrors({});
          onClose();
        }, 3000);
      } else {
        console.error('Submission error:', result.error);
        setErrors({ submit: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setName("");
    setPosition("");
    setCvFile(null);
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  const removeFile = () => {
    setCvFile(null);
    setErrors((prev) => ({ ...prev, file: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Success screen
  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 sm:p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">CV Submitted Successfully!</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Thank you for your interest in joining our team. We've received your CV and will review it carefully. Our HR team will get back to you within 2-3 business days.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain'
              }}
            >
              {/* Fixed Header */}
              <div className="relative bg-gradient-to-br from-[blue] to-black p-4 sm:p-6 text-white flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  style={{ color: "white" }}
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>

                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
                    <Upload size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h2
                    className="text-lg sm:text-xl font-semibold"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                  >
                    Submit Your CV
                  </h2>
                </div>

                <p className="text-white/90 text-xs sm:text-sm">
                  Join our team! Please fill out the form below and upload your
                  CV to apply.
                </p>
              </div>

              {/* Scrollable Content */}
              <div 
                className="flex-1 overflow-y-auto p-4 sm:p-6 popup-scrollable"
                style={{
                  scrollBehavior: 'smooth',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch'
                }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        placeholder="Enter your full name"
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                          errors.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        placeholder="Enter your email address"
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Position Field */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Position of Interest
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        id="position"
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="e.g., Marketing Manager, Developer"
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Upload CV (PDF only) *
                    </label>
                    {!cvFile ? (
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                          dragActive
                            ? "border-blue-500 bg-blue-50"
                            : errors.file
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <div className="text-xs sm:text-sm text-gray-600">
                          <span className="font-medium text-blue-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF files only (Max 10MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-900">
                                {cvFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                    {errors.file && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      >
                        {errors.file}
                      </motion.p>
                    )}
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Privacy Notice:</span> Your
                      information will only be used for recruitment purposes. We
                      respect your privacy and handle all data securely.
                    </p>
                  </div>

                  {/* Error Message */}
                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                    >
                      <p className="text-red-600 text-sm">{errors.submit}</p>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <div className="flex-1 order-2 sm:order-1">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors h-10 sm:h-12 flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex-1 order-1 sm:order-2">
                      <button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                        style={{ background: "none", border: "none", padding: 0 }}
                      >
                        <Button4
                          label={
                            isSubmitting ? "Submitting..." : "Submit CV"
                          }
                          disabled={isSubmitting}
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CVUploadPopup;
