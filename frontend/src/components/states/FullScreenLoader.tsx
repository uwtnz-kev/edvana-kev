export default function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="animate-spin rounded-full h-10 w-10
                      border-2 border-white/40 border-t-transparent" />
    </div>
  );
}
