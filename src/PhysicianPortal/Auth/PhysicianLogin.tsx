import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import logo from '@/assets/dark.png';
import AuthBackground from "../../PatientPortal-V3/Auth/components/AuthBackground";
import AuthFooter from "../../PatientPortal-V3/Auth/components/AuthFooter";

export default function PhysicianLogin() {
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
    <div className="min-h-screen relative overflow-hidden ">
      <AuthBackground />

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
            <div className="px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00c3e8]/50 to-[#00c3e8]" />
                <div
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                  style={{
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to right, #00c3e8 0%, #00c3e8 50%, #05e57e 50%, #05e57e 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: "linear-gradient(to right, #00c3e8, #05e57e)",
                    }}
                  />
                  <span className="text-primary font-bold text-xs tracking-widest uppercase">
                    Provider Portal
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#05e57e]/50 to-[#05e57e]" />
              </div>
              {step === "email" ? (
                <div>
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
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d1b4e] focus:border-[#2d1b4e] focus:outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleEmailSubmit}
                    className="w-full bg-[#2d1b4e] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-[#3d2b5e] transform hover:-translate-y-0.5"
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center mt-4 mb-6">
                    <div className="w-16 h-16 bg-[#00c3e8]/10 rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-[#2d1b4e]" />
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
                        className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d1b4e] focus:border-[#2d1b4e] focus:outline-none transition-colors"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                    className="w-full bg-[#2d1b4e] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-[#3d2b5e] transform hover:-translate-y-0.5"
                  >
                    Verify
                  </button>

                  <div className="mt-6 space-y-3 text-center">
                    <a
                      href="#"
                      className="block text-sm text-blue-700 font-normal transition-colors"
                    >
                      Forgot password?
                    </a>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="block w-full text-sm text-blue-700 font-normal transition-colors"
                    >
                      Back to sign in
                    </button>
                  </div>
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