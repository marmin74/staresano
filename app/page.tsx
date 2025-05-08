import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-[#eaf7f0]">
      <img src="/logo.svg" alt="StareSano Logo" className="w-24 mb-4" />
      <h1 className="text-3xl font-bold text-[#355e3b]">Benvenuto su STARESANO</h1>
      <p className="text-[#355e3b] mt-2 mb-6 max-w-md">
        La tua guida per fitness, salute e benessere. Inizia ora il tuo percorso!
      </p>
      <div className="flex gap-4">
        <Link href="/signup">
          <button className="px-4 py-2 rounded-full bg-[#a8d5ba] text-white font-semibold shadow">
            Registrati
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 rounded-full border border-[#a8d5ba] text-[#355e3b] font-semibold">
            Accedi
          </button>
        </Link>
      </div>
    </main>
  );
}
