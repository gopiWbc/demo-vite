const Footer = () => {
  return (
    <>
     <footer className="bg-app-primary text-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="py-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-50 mb-4">
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Patient Portal User Agreement</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell or Share My Personal Information</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Notice of Nondiscrimination</a>
            </div>
            <p className="text-center text-sm text-gray-50 font-medium">
              © 2025 Primex Clinical Laboratories Inc., All rights reserved.
            </p>
          </div>
        </div>
      </footer>
       <footer className="bg-white border-t border-gray-200 sm:hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-3">
          {/* Links */}
          <div
            className="
              flex flex-wrap
              justify-center
              gap-x-4 gap-y-1
              text-xs
              font-normal
              text-app-primary
            "
          >
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              User Agreement
            </a>
            <a href="#" className="hover:underline">
              Do Not Sell Info
            </a>
            <a href="#" className="hover:underline">
              Nondiscrimination
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-2 text-center text-[11px] text-navy-500">
            © 2025 Primex Clinical Laboratories Inc.
          </p>
        </div>
      </div>
    </footer>
      </>
  )
}

export default Footer