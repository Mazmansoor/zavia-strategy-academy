export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zavia-navy to-slate-900 px-4">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">
          Zavia Strategy Academy
        </h1>
        <p className="mt-2 text-slate-300">
          Master the art and science of strategy
        </p>
      </div>
      {children}
    </div>
  );
}
