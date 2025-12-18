import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Phone, Calendar, CheckCircle } from "lucide-react";
import logo from '@/assets/dark.png';
import AuthBackground from "./components/AuthBackground";
import AuthFooter from "./components/AuthFooter";

export default function PrimexRegister() {
  const [step, setStep] = useState(1); // 1: personal info, 2: account info, 3: success
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = (e: any) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.dateOfBirth && formData.phoneNumber && formData.gender) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e: any) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        console.log("Registration data:", formData);
        setStep(3);
      } else {
        alert("Passwords do not match!");
      }
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f6f9ff]">
      <AuthBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-app-primary px-8 py-3">
               <div className="flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Primex Logo"
                    className="w-55 h-auto object-contain"
                  />
                </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-6">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Create Account
                  </h2>
                  <p className="text-gray-600 text-sm mb-5">Step 1 of 2: Personal Information</p>

                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                            placeholder="First name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700 text-sm">Male</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700 text-sm">Female</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700 text-sm">Other</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStep1Submit}
                    className="w-full btn-primary font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Next
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <a href="#" className="text-blue-700">
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-14 h-14 bg-app-secondary rounded-full flex items-center justify-center mb-3">
                      <Lock className="w-7 h-7 text-app-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      Set up your account
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">Step 2 of 2: Account Security</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{formData.firstName} {formData.lastName}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus-2 focus:ring-app-primary focus:outline-none transition-colors text-sm"
                            placeholder="Confirm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStep2Submit}
                    className="w-full btn-primary font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Create Account
                  </button>

                  <div className="mt-6 text-center">
                    <button
                      onClick={handleBackToStep1}
                      className="text-sm text-blue-700"
                    >
                      Back to personal information
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Account Created Successfully!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Welcome to Primex Patient Portal. Your account has been created and you can now sign in.
                  </p>
                  <a
                    href="#"
                    className="inline-block w-full btn-primary text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Go to Sign In
                  </a>
                </div>
              )}
            </div>
          </div>

          <AuthFooter />
        </div>
      </div>
    </div>
  );
}