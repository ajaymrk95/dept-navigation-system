type Props = {
  onClick: () => void
}

export default function LocateButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-6 right-6 z-[2000]
        bg-red-600 text-white
        shadow-lg shadow-red-300/40
        border border-red-700
        px-4 py-3 rounded-xl
        text-sm font-semibold
        hover:bg-red-700 active:scale-95
        transition-all duration-200
      "
    >
      📍 My Location
    </button>
  )
}

