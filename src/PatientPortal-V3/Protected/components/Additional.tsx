import { AlertCircle } from 'lucide-react'
const Additional = () => {
  return (
    <div className="w-full space-y-4 lg:sticky lg:top-24">
            {/* Purchase Tests Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Quality diagnostics. Simple access.
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                Primex helps you access accurate lab testing whenever you need it.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all">
                Learn More
              </button>
            </div>

            {/* Need Help Card */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-3 text-app-primary">
                <AlertCircle className="flex-shrink-0" size={24} />
                <h3 className="text-lg font-bold">Need help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                If you don't see your results or you need help correcting information in your account, <a href="#" className="text-app-primary hover:underline font-medium">contact us</a>.
              </p>
            </div>
          </div>
  )
}

export default Additional