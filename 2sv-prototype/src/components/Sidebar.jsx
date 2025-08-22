import { UserGroupIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon as UserGroupIconSolid } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Administrators', icon: UserGroupIcon, iconActive: UserGroupIconSolid, current: true },
  { name: 'Product Users', icon: UsersIcon, iconActive: UsersIcon, current: false },
  { name: 'Security History', icon: ClockIcon, iconActive: ClockIcon, current: false },
]

export default function Sidebar() {
  return (
    <div className="w-52 bg-gray-50 border-r border-gray-200 min-h-[600px]">
      <nav className="py-4">
        {navigation.map((item) => {
          const Icon = item.current ? item.iconActive : item.icon
          return (
            <a
              key={item.name}
              href="#"
              className={
                item.current
                  ? 'bg-blue-50 text-gray-900 flex items-center px-5 py-2.5 text-[14px] font-medium'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 flex items-center px-5 py-2.5 text-[14px]'
              }
            >
              <Icon className="mr-3 h-5 w-5 text-gray-500" />
              {item.name}
            </a>
          )
        })}
      </nav>
    </div>
  )
}