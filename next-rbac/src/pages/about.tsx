export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-2xl p-12 space-y-8 border-4 border-blue-900">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center tracking-tight">About</h1>
        <div className="flex flex-col items-center">
          <p className="text-center text-blue-800 text-xl font-semibold mb-6 max-w-xl">
            I am a Full Stack Developer with 5+ years of experience.<br />
            I specialize in building scalable web applications and enjoy collaborating with teams to solve complex problems.
          </p>
          <p className="text-center text-gray-700 text-lg max-w-xl">
            I am passionate about learning new technologist, building, and designing products that make a difference.<br />
            I believe in delivering high-quality solutions.
          </p>
        </div>
      </div>
    </main>
  );
}
