import { GlobeAltIcon } from '@heroicons/react/20/solid'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-2xs text-gray-500">
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-700">Terms of Service</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-700">Help</a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-2xs text-gray-400">
            <GlobeAltIcon className="w-3 h-3" />
            <span>planning.center</span>
          </div>
          <div className="flex items-center space-x-4 text-2xs text-gray-500">
            <span>Org 0444595</span>
            <span className="text-gray-300">|</span>
            <span>User J12875716</span>
          </div>
        </div>
      </div>
    </footer>
  )
}