export default function WelcomeHeader() {
  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-3">
        Welcome to School Admin Dashboard
      </h2>
      <p className="text-gray-700 text-lg">
        Manage your school's operations efficiently with real-time insights and comprehensive tools.
      </p>
    </div>
  );
}