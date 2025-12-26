const PhysicianFooter = () => {
  return (
    <>
      {/* Desktop / Tablet Footer */}
      <footer className="bg-app-primary text-white hidden sm:block">
          <div className="p-4 flex items-center justify-end gap-6">
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-50">
              <a href="#" className="hover:text-white transition-colors">
                Terms and Conditions
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-50 font-medium whitespace-nowrap">
              © 2025 Primex Clinical Laboratories Inc., All rights reserved.
            </p>
          </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="bg-white border-t border-gray-200 sm:hidden">
          <div className="p-3">
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-normal text-app-primary">
              <a href="#" className="hover:underline">Terms & Conditions</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>

            {/* Copyright */}
            <p className="mt-2 text-center text-[11px] text-navy-500">
              © 2025 Primex Clinical Laboratories Inc.
            </p>
          </div>
      </footer>
    </>
  );
};

export default PhysicianFooter;
