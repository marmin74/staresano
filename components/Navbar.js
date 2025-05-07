import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">StareSano</Link>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-primary">Login</Link>
          <Link href="/profilo" className="text-gray-600 hover:text-primary">Profilo</Link>
          <Link href="/meals" className="text-gray-600 hover:text-primary">Pasti</Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}