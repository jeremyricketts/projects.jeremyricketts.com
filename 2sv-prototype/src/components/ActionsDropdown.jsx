import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function ActionsDropdown({ administrator }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center px-2.5 py-1 text-[13px] text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500">
        Actions
        <ChevronDownIcon className="ml-1 h-3.5 w-3.5 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-1 w-44 origin-top-right bg-white border border-gray-200 rounded shadow-lg">
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50"
            >
              Edit Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50"
            >
              View Activity
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50"
            >
              Reset Password
            </a>
          </MenuItem>
          <div className="border-t border-gray-100 my-1"></div>
          <MenuItem>
            <a
              href="#"
              className="block px-3 py-1.5 text-[13px] text-red-600 hover:bg-red-50"
            >
              Remove Access
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}