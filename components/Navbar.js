import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-primary">StareSano</span>
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/login" className="text-gray-600 hover:text-primary">Login</Link>
          <Link href="/profilo" className="text-gray-600 hover:text-primary">Profilo</Link>
          <Link href="/meals" className="text-gray-600 hover:text-primary">Pasti</Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
