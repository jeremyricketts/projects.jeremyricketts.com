const initialAdministrators = [
  {
    id: '1',
    name: 'Bobby Newadmin',
    email: 'jeremy+bobbynewadmin@planningcenter.com',
    phone: null,
    twoStepStatus: 'inactive',
    role: 'organization_administrator'
  },
  {
    id: '2', 
    name: 'Chelsea Edgerly',
    email: 'chelsea.edgerly@planningcenter.com',
    phone: null,
    twoStepStatus: 'inactive',
    role: 'organization_administrator'
  },
  {
    id: '3',
    name: 'Erin Baker',
    email: 'erin.baker@planningcenter.com',
    phone: '(518) 306-1135',
    twoStepStatus: 'inactive',
    role: 'organization_administrator'
  },
  {
    id: '4',
    name: 'Jeremy Nogiving',
    email: 'jeremy+nogiving@planningcenter.com', 
    phone: null,
    twoStepStatus: 'inactive',
    role: 'organization_administrator'
  },
  {
    id: '5',
    name: 'Jeremy Ricketts',
    email: 'jeremy+other@planningcenter.com',
    phone: '(951) 743-1224',
    twoStepStatus: 'active',
    role: 'organization_administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

export function getAdministrators() {
  const stored = localStorage.getItem('administrators')
  if (stored) {
    return JSON.parse(stored)
  }
  
  localStorage.setItem('administrators', JSON.stringify(initialAdministrators))
  return initialAdministrators
}

export function saveAdministrators(administrators) {
  localStorage.setItem('administrators', JSON.stringify(administrators))
}

export function addAdministrator(administrator) {
  const administrators = getAdministrators()
  const newAdministrator = {
    ...administrator,
    id: Date.now().toString(),
    twoStepStatus: 'inactive',
    role: 'organization_administrator'
  }
  
  const updated = [...administrators, newAdministrator]
  saveAdministrators(updated)
  return updated
}