import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function TwoStepRequirement({ administrators, onEnforcementChange }) {
  const [enforcementStatus, setEnforcementStatus] = useState('disabled') // disabled, enabled, scheduled
  const [enforcementDate, setEnforcementDate] = useState(null)
  const [showImmediateEditor, setShowImmediateEditor] = useState(false)
  const [showScheduleEditor, setShowScheduleEditor] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailTemplate, setEmailTemplate] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [notifyUsers, setNotifyUsers] = useState(true)
  
  const usersWithout2SV = administrators.filter(admin => admin.twoStepStatus === 'inactive')
  const usersWith2SV = administrators.filter(admin => admin.twoStepStatus === 'active')
  
  const getStatusBadge = () => {
    if (enforcementStatus === 'disabled') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
          DISABLED
        </span>
      )
    }
    if (enforcementStatus === 'enabled') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
          ENABLED
        </span>
      )
    }
    if (enforcementStatus === 'scheduled' && enforcementDate) {
      const date = new Date(enforcementDate)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
          SCHEDULED: {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      )
    }
    return null
  }
  
  const handleImmediateEnforcement = () => {
    setNotifyUsers(true) // Default to checked
    setEmailSubject('First USA Church Planning Center Login Requirement')
    setEmailTemplate(
      `Dear {first_name},

For the security of our church's data, we are now requiring all organization administrators to enable Two-Step Verification (2SV) for their accounts.

This requirement is being enforced immediately. You will need to set up 2SV on your next login to continue accessing your administrator account.

To set up 2SV:
1. You will be prompted to set up 2SV on your next login
2. Follow the on-screen instructions to link your phone number
3. Verify your phone can receive the verification codes

This additional security measure helps protect our church's sensitive information from unauthorized access.

If you have any questions, please contact your system administrator.

Thank you for helping keep our church secure.

First USA Church`
    )
    setShowImmediateEditor(true)
  }
  
  const handleScheduledEnforcement = () => {
    setSelectedDate('')
    setEmailSubject('First USA Church Planning Center Login Requirement')
    setEmailTemplate(
      `Dear {first_name},

For the security of our church's data, we will be requiring all organization administrators to enable Two-Step Verification (2SV) for their accounts.

Enforcement Date: {enforcement_date}

Starting on this date, administrators without 2SV enabled will be required to set it up on their next login.

To set up 2SV before the enforcement date:
1. Log into your Planning Center account
2. Go to your security settings
3. Enable Two-Step Verification
4. Follow the instructions to link your phone number

Setting up 2SV now will ensure uninterrupted access to your administrator account.

This additional security measure helps protect our church's sensitive information from unauthorized access.

If you have any questions, please contact your system administrator.

Thank you for helping keep our church secure.

First USA Church`
    )
    setShowScheduleEditor(true)
  }
  
  const handleImmediateEnforce = () => {
    setEnforcementStatus('enabled')
    setShowImmediateEditor(false)
    if (onEnforcementChange) {
      onEnforcementChange({ status: 'enabled', date: null, emailSent: notifyUsers })
    }
  }
  
  const updateScheduleEmailTemplate = (date) => {
    const currentTemplate = emailTemplate
    
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      
      // Replace the enforcement_date variable
      setEmailTemplate(currentTemplate.replace(/{enforcement_date}/g, formattedDate))
    } else {
      // If date is cleared, restore variable
      const datePattern = /Enforcement Date: .+$/m
      if (currentTemplate.match(datePattern)) {
        setEmailTemplate(currentTemplate.replace(datePattern, 'Enforcement Date: {enforcement_date}'))
      }
    }
  }
  
  const handleScheduleWithEmail = () => {
    if (selectedDate) {
      setEnforcementStatus('scheduled')
      setEnforcementDate(selectedDate)
      setShowScheduleEditor(false)
      if (onEnforcementChange) {
        onEnforcementChange({ status: 'scheduled', date: selectedDate, emailSent: true })
      }
    }
  }
  
  const handleDisableEnforcement = () => {
    setEnforcementStatus('disabled')
    setEnforcementDate(null)
  }

  return (
    <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
            <h3 className="text-[15px] font-medium text-gray-900">Two-Step Verification Requirement</h3>
            {getStatusBadge()}
          </div>
          
          <p className="text-[13px] text-gray-600">
            When enabled, organization administrators must have 2-Step Verification enabled for their Planning Center login. This protects them and your entire church from having your sensitive data stolen in the case of a user account takeover.
          </p>
        </div>
        
        <div>
          {enforcementStatus === 'disabled' ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded">
                Enable
                <ChevronDownIcon className="ml-1 h-3.5 w-3.5" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-1 w-56 origin-top-right bg-white border border-gray-200 rounded shadow-lg">
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={handleImmediateEnforcement}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                    >
                      <div className="font-medium">Enforce Immediately</div>
                      <div className="text-xs text-gray-500 mt-0.5">{usersWithout2SV.length} user{usersWithout2SV.length !== 1 ? 's' : ''} will be logged out and required to set it up</div>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleScheduledEnforcement}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                    >
                      <div className="font-medium">Enforce on Date</div>
                      <div className="text-xs text-gray-500 mt-0.5">Give {usersWithout2SV.length} user{usersWithout2SV.length !== 1 ? 's' : ''} time to enable 2SV</div>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={handleDisableEnforcement}
              className="px-4 py-1.5 text-[13px] text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded"
            >
              Disable
            </button>
          )}
        </div>
      </div>
      
      {/* Combined Immediate Enforcement Dialog */}
      {showImmediateEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-medium text-gray-900">Immediate Enforcement</h3>
              </div>
            </div>
            
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-[14px] text-amber-800">
                  <span className="font-medium">{usersWithout2SV.length} administrator{usersWithout2SV.length !== 1 ? 's' : ''}</span> will be immediately logged out and required to set up 2SV on their next login.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={notifyUsers}
                    onChange={(e) => setNotifyUsers(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-[14px] text-gray-700">
                    Send email notification to affected administrators
                  </span>
                </label>
              </div>
              
              {notifyUsers && (
                <>
                  <div className="mb-4">
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                      Email Message
                    </label>
                    <textarea
                      value={emailTemplate}
                      onChange={(e) => setEmailTemplate(e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                    <div className="mt-2 px-3 py-2 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Available variables:</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <span className="font-mono text-gray-600">{'{first_name}'}</span>
                        <span className="font-mono text-gray-600">{'{last_name}'}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowImmediateEditor(false)}
                className="px-4 py-1.5 text-[13px] text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleImmediateEnforce}
                className="px-4 py-1.5 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
              >
                {notifyUsers ? 'Enforce & Email Admins Now' : 'Enforce Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Combined Schedule and Email Dialog */}
      {showScheduleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Select Date and Notify Users</h3>
            </div>
            
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-[14px] text-blue-800">
                  <span className="font-medium">{usersWithout2SV.length} administrator{usersWithout2SV.length !== 1 ? 's' : ''}</span> currently don't have 2SV enabled.
                </p>
                <p className="text-[13px] text-blue-700 mt-1">
                  On the enforcement date, users without 2SV will be logged out and required to set it up on their next login.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Enforcement Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    updateScheduleEmailTemplate(e.target.value)
                  }}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Email Message
                </label>
                <textarea
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
                <div className="mt-2 px-3 py-2 bg-gray-50 rounded border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Available variables:</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="font-mono text-gray-600">{'{first_name}'}</span>
                    <span className="font-mono text-gray-600">{'{last_name}'}</span>
                    <span className="font-mono text-gray-600">{'{enforcement_date}'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowScheduleEditor(false)
                  setSelectedDate('')
                }}
                className="px-4 py-1.5 text-[13px] text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleWithEmail}
                disabled={!selectedDate}
                className="px-4 py-1.5 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-300"
              >
                Schedule & Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}