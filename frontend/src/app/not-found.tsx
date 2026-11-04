import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4 text-center">
      <h2 className="text-4xl font-black mb-2">404 - Page Not Found</h2>
      <p className="text-slate-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}

