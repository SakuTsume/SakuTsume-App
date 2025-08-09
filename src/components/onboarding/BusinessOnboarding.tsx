import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Mail, Check, ChevronRight, ChevronLeft, 
  Shield, Users, Briefcase, Star, Upload, Plus,
  AlertCircle, CheckCircle
} from 'lucide-react';

interface BusinessOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BusinessOnboarding: React.FC<BusinessOnboardingProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyEmail: '',
    companySize: '',
    industry: '',
    website: '',
    description: '',
    logo: null as File | null,
    firstJob: {
      title: '',
      description: '',
      budget: '',
      deadline: '',
    },
    skipFirstJob: false,
  });
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const steps = [
    { title: 'Create Account', description: 'Set up your SakuTsume business account' },
    { title: 'Company Email', description: 'Verify your business email for credibility' },
    { title: 'Company Profile', description: 'Tell us about your business' },
    { title: 'First Job (Optional)', description: 'Post your first opportunity' },
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees',
  ];

  const industries = [
    'Film & Television',
    'Gaming',
    'Animation',
    'Music & Audio',
    'Advertising',
    'Theater',
    'Digital Media',
    'Publishing',
    'Education',
    'Other',
  ];

  const verifyEmail = async () => {
    setIsVerifyingEmail(true);
    
    // Simulate email verification process
    setTimeout(() => {
      const isBusinessEmail = formData.companyEmail.includes('@') && 
                             !formData.companyEmail.includes('@gmail.com') &&
                             !formData.companyEmail.includes('@yahoo.com') &&
                             !formData.companyEmail.includes('@hotmail.com');
      
      setEmailVerificationStatus(isBusinessEmail ? 'verified' : 'failed');
      setIsVerifyingEmail(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: 
        return formData.username.length >= 3 && 
               formData.email.includes('@') && 
               formData.password.length >= 8 && 
               formData.password === formData.confirmPassword;
      case 1: 
        return formData.companyEmail && emailVerificationStatus === 'verified';
      case 2: 
        return formData.companyName && formData.companySize && formData.industry;
      case 3: 
        return formData.skipFirstJob || (formData.firstJob.title && formData.firstJob.description);
      default: 
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Pass the complete form data to the parent
      onComplete({
        ...formData,
        role: 'business',
        avatar: formData.logo ? URL.createObjectURL(formData.logo) : undefined
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={32} className="text-blue-800" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Create Your Business Account</h2>
            <p className="text-neutral-600 mb-8">
              Set up your SakuTsume business account to start hiring talent.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                  Username *
                </label>
                <input
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formData.username && formData.username.length < 3 && (
                  <p className="text-sm text-orange-600 mt-1">Username must be at least 3 characters</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formData.password && formData.password.length < 8 && (
                  <p className="text-sm text-orange-600 mt-1">Password must be at least 8 characters</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Shield size={16} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Business Benefits</span>
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Get verified business badge</li>
                <li>• Access to verified talent pool</li>
                <li>• 3 free gig promotions</li>
                <li>• Priority customer support</li>
              </ul>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-blue-800" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Verify Your Business Email</h2>
            <p className="text-neutral-600 mb-8">
              Use your company email to get verified status and build trust with talent.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="your.name@company.com"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {formData.companyEmail && emailVerificationStatus === 'pending' && (
                <button
                  onClick={verifyEmail}
                  disabled={isVerifyingEmail}
                  className="w-full py-3 bg-primary-800 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isVerifyingEmail ? 'Verifying...' : 'Verify Email'}
                </button>
              )}

              {emailVerificationStatus === 'verified' && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-success-600 mr-2" />
                    <span className="font-medium text-success-800">Email Verified!</span>
                  </div>
                  <p className="text-success-700 text-sm mt-1">
                    Your business email has been verified. You'll get a verified badge on your profile.
                  </p>
                </div>
              )}

              {emailVerificationStatus === 'failed' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="text-orange-600 mr-2" />
                    <span className="font-medium text-orange-800">Verification Failed</span>
                  </div>
                  <p className="text-orange-700 text-sm mt-1">
                    Please use a business email address. Personal emails (Gmail, Yahoo, etc.) cannot be verified.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Shield size={16} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Why verify?</span>
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Get a verified business badge</li>
                <li>• Build trust with talent</li>
                <li>• Access to premium features</li>
                <li>• Priority in search results</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-secondary-800" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Company Profile</h2>
              <p className="text-neutral-600">
                Tell talent about your company and what makes you unique.
              </p>
            </div>

            <div className="space-y-6">
              {/* Company Logo */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company Logo (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                    {formData.logo ? (
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Company logo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Building size={24} className="text-neutral-500" />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                      <Upload size={16} className="inline mr-2" />
                      Upload Logo
                    </div>
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company Size *
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company Description (Optional)
                </label>
                <textarea
                  placeholder="Tell talent about your company, your mission, and what makes you unique..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-accent-500" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Post Your First Job</h2>
              <p className="text-neutral-600">
                Optional: Start attracting talent by posting your first opportunity.
              </p>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.skipFirstJob}
                  onChange={(e) => setFormData({ ...formData, skipFirstJob: e.target.checked })}
                  className="mr-3 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-neutral-700">Skip for now - I'll post jobs later</span>
              </label>
            </div>

            {!formData.skipFirstJob && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Voice Actor for Animated Series"
                    value={formData.firstJob.title}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      firstJob: { ...formData.firstJob, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    placeholder="Describe the role, requirements, and what you're looking for..."
                    value={formData.firstJob.description}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      firstJob: { ...formData.firstJob, description: e.target.value }
                    })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Budget (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., $500-1000"
                      value={formData.firstJob.budget}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        firstJob: { ...formData.firstJob, budget: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Deadline (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.firstJob.deadline}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        firstJob: { ...formData.firstJob, deadline: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Star size={16} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Business Benefits</span>
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Get 3 free gig promotions</li>
                <li>• Access to verified talent pool</li>
                <li>• Priority customer support</li>
                <li>• Advanced hiring tools</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold text-neutral-800">Business Onboarding</h1>
          </div>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep
                      ? 'bg-secondary-600 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-secondary-600 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-neutral-600 mt-2">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 0 ? onBack : () => setCurrentStep(currentStep - 1)}
            className="flex items-center px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            {currentStep === 0 ? 'Back to Role Selection' : 'Previous'}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessOnboarding;