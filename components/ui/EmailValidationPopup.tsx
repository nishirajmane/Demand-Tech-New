"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Download } from 'lucide-react';
import Button4 from './Button4';

interface EmailValidationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onValidEmail: (email: string) => void;
  fileName: string;
}

const EmailValidationPopup: React.FC<EmailValidationPopupProps> = ({
  isOpen,
  onClose,
  onValidEmail,
  fileName
}) => {
  const [email, setEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsValidating(true);
    
    // Simulate validation delay
    setTimeout(() => {
      setIsValidating(false);
      onValidEmail(email);
      setEmail('');
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    onClose();
  };

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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[blue] to-black p-4 sm:p-6 text-white">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  style={{ color: 'white' }}
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
                
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
                    <Download size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h2 
                    className="text-lg sm:text-xl font-semibold"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    Download Case Study
                  </h2>
                </div>
                
                <p className="text-white/90 text-xs sm:text-sm">
                  Please enter your email to download: <span className="font-medium">{fileName}</span>
                </p>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="Enter your email address"
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        disabled={isValidating}
                      />
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Privacy Notice:</span> Your email will only be used to send you this case study and occasional updates about our services. You can unsubscribe at any time.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <div className="flex-1 order-2 sm:order-1">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors h-10 sm:h-12 flex items-center justify-center"
                        disabled={isValidating}
                      >
                        Cancel
                      </button>
                    </div>
                    
                    <div className="flex-1 order-1 sm:order-2">
                      <button
                        type="submit"
                        className="w-full"
                        disabled={isValidating}
                        style={{ background: 'none', border: 'none', padding: 0 }}
                      >
                        <Button4
                          label={isValidating ? "Validating..." : "Download"}
                          disabled={isValidating}
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

export default EmailValidationPopup;
