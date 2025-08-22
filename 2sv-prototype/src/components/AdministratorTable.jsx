import { useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Avatar from './Avatar'
import StatusBadge from './StatusBadge'
import ActionsDropdown from './ActionsDropdown'
import TwoStepRequirement from './TwoStepRequirement'
import { getAdministrators, addAdministrator } from '../data/administrators'

export default function AdministratorTable() {
  const [administrators, setAdministrators] = useState(getAdministrators())
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [enforcementInfo, setEnforcementInfo] = useState(null)

  const handleEnforcementChange = (info) => {
    setEnforcementInfo(info)
    console.log('Enforcement changed:', info)
  }

  const handleAddAdministrator = (e) => {
    e.preventDefault()
    if (!newAdminEmail.trim()) return

    const emailParts = newAdminEmail.split('@')
    const name = emailParts[0]
      .split(/[+.-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')

    const newAdmin = {
      name,
      email: newAdminEmail.trim(),
      phone: null
    }

    const updated = addAdministrator(newAdmin)
    setAdministrators(updated)
    setNewAdminEmail('')
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center space-x-1.5 mb-3">
          <h2 className="text-[16px] font-medium text-gray-900">Organization Administrators</h2>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        
        <p className="text-[14px] text-gray-600 mb-4">
          These people can access and control nearly every part of your account.
        </p>

        <form onSubmit={handleAddAdministrator}>
          <input
            type="email"
            placeholder="Add a new organization administrator"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="w-full max-w-md px-3 py-2 text-[14px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 bg-gray-50"
          />
        </form>
      </div>

      <TwoStepRequirement 
        administrators={administrators}
        onEnforcementChange={handleEnforcementChange}
      />

      <div className="bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Organization Administrator
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                2-Step Verification
              </th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {administrators.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar name={admin.name} src={admin.avatar} />
                    <div>
                      <div className="text-[14px] font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {admin.name}
                      </div>
                      <div className="text-[14px] text-gray-500 mt-0.5">
                        {admin.phone && <span>{admin.phone} </span>}
                        {admin.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={admin.twoStepStatus} />
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionsDropdown administrator={admin} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}