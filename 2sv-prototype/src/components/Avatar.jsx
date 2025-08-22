function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

function getAvatarColor(name) {
  const colors = [
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
  ]
  
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export default function Avatar({ name, src }) {
  if (src) {
    return (
      <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-gray-200">
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
  
  return (
    <div className={`w-9 h-9 ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white text-[13px] font-medium ring-1 ring-gray-200`}>
      {getInitials(name)}
    </div>
  )
}