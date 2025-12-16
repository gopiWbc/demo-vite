import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import logo from '@/assets/dark.png';

export default function PrimexLogin() {
  const [step, setStep] = useState("email"); // 'email' or 'password'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      setStep("password");
    }
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  const handleBackToEmail = () => {
    setStep("email");
    setPassword("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Bottom Left Circle - Blue */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-[#00c3e8] rounded-full blur-[120px] opacity-40"></div>

      {/* Top Right Circle - Green */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-[#05e57e] rounded-full blur-[120px] opacity-40"></div>

      {/* Diagonal gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00c3e8]/15 via-transparent to-[#05e57e]/15"></div>

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(5,229,126,0.12),transparent_60%)]"></div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
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
            <div className="px-8 py-8">
              {step === "email" ? (
                <div onSubmit={handleEmailSubmit}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Sign In
                  </h2>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-app-primary focus:outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleEmailSubmit}
                    className="w-full btn-primary font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Next
                  </button>
                  <div className="mt-6 space-y-3 text-center">
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="block w-full text-sm btn-text-primary font-medium"
                    >
                      Register a new account
                    </button>
                  </div>
                </div>
              ) : (
                <div onSubmit={handlePasswordSubmit}>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-app-secondary rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-app-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Verify with your password
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{email}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-app-primary focus:outline-none transition-colors"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordSubmit}
                    className="w-full btn-primary text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Verify
                  </button>

                  <div className="mt-6 space-y-3 text-center">
                    <a
                      href="#"
                      className="block text-sm btn-text-primary font-medium"
                    >
                      Forgot password?
                    </a>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="block w-full text-sm btn-text-primary font-medium"
                    >
                      Back to sign in
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2025 Primex Clinical Laboratories Inc., All rights reserved</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="btn-text-primary transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="btn-text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}