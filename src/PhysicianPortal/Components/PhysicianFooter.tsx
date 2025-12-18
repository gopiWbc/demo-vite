const PhysicianFooter = () => {
  return (
     <footer className="bg-app-primary text-white">
        <div className="mx-auto px-4 lg:px-8">
          <div className="py-4 flex justify-end gap-5">
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-50">
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
            </div>
            <p className="text-center text-sm text-gray-50 font-medium">
              © 2025 Primex Clinical Laboratories Inc., All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default PhysicianFooter