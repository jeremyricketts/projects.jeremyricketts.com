import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'

export default function IconFeedback() {
  return (
    <div className="fixed top-16 right-4 z-50">
      <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 shadow-sm">
        <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}