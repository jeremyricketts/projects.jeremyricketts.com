import { Squares2X2Icon } from '@heroicons/react/24/outline'

export default function IconApps() {
  return (
    <div className="fixed top-40 right-4 z-50">
      <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 shadow-sm">
        <Squares2X2Icon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}