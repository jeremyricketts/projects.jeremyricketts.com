export default function StatusBadge({ status }) {
  const isActive = status === 'active'
  
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold
        ${isActive 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-50 text-red-600'
        }
      `}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  )
}