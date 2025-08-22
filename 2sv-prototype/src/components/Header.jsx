import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="bg-pc-header border-b border-gray-300">
      <div className="flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-1 text-[13px] text-gray-700 hover:text-gray-900 px-2 py-1">
              <Cog6ToothIcon className="w-4 h-4" />
              <span>Account settings</span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
            </MenuButton>
          </Menu>
          
          <nav className="flex items-center ml-6 space-x-6">
            <button className="text-[14px] text-gray-700 hover:text-gray-900">
              Organization
            </button>
            <button className="text-[14px] text-gray-700 hover:text-gray-900">
              Products
            </button>
            <button className="text-[14px] text-gray-700 hover:text-gray-900">
              Billing
            </button>
            <button className="text-[14px] font-semibold text-gray-900 px-5 py-1.5 bg-white rounded-full border-2 border-pc-blue-600 shadow-sm">
              People
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-1 text-[13px] text-gray-700 hover:text-gray-900">
              <span>First USA Church</span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
            </MenuButton>
          </Menu>
          
          <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-gray-300">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}