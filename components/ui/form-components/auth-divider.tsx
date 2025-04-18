export function AuthDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-zinc-700" />
      </div>
      <div className="relative flex justify-center text-xs uppercase font-medium">
        <span className="bg-black px-6 text-zinc-500">Ou continue com</span>
      </div>
    </div>
  )
}
