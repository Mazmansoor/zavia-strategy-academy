import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl font-bold text-zavia-navy">
            Zavia Strategy Academy
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/canon"
              className="text-sm font-medium text-slate-600 hover:text-zavia-navy"
            >
              The Canon
            </Link>
            <Link
              href="/guild"
              className="text-sm font-medium text-slate-600 hover:text-zavia-navy"
            >
              The Guild
            </Link>
            <Link
              href="/fellowship"
              className="text-sm font-medium text-slate-600 hover:text-zavia-navy"
            >
              The Fellowship
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-zavia-navy"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-zavia-navy px-4 py-2 text-sm font-medium text-white hover:bg-zavia-navy/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-zavia-navy py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-serif text-lg font-bold">Zavia Strategy Academy</h3>
              <p className="mt-2 text-sm text-slate-300">
                Master the art and science of strategy through structured learning,
                live mentorship, and an elite network.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Programs</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/canon" className="hover:text-white">
                    The Canon
                  </Link>
                </li>
                <li>
                  <Link href="/guild" className="hover:text-white">
                    The Guild
                  </Link>
                </li>
                <li>
                  <Link href="/fellowship" className="hover:text-white">
                    The Fellowship
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Zavia Strategy Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
