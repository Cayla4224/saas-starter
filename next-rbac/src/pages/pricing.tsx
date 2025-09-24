export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="max-w-4xl w-full bg-white/90 rounded-3xl shadow-2xl p-12 space-y-10 border-4 border-blue-900">
        <h1 className="text-5xl font-extrabold text-left text-blue-900 mb-2 tracking-tight">Subscription Plans</h1>
        <p className="text-left text-xl text-blue-700 font-semibold mb-8">
          <span className="inline-flex items-center mr-2">
            <svg className="w-7 h-7 text-blue-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 8v-4m0 0V7m0 4h4m-4 0H8" /></svg>
            Have access to a network of developers at your fingertips with a subscription!
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {/* Weekly Plan */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 text-center bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-900">Weekly</h2>
            <p className="text-3xl font-extrabold mb-2 text-blue-700">$12.00</p>
            <p className="text-gray-600 mb-4">Billed every week</p>
            <button className="w-full rounded-full bg-blue-900 px-4 py-2 text-white font-bold hover:bg-blue-700 transition">Subscribe Weekly</button>
          </div>
          {/* Monthly Plan */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 text-center bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-900">Monthly</h2>
            <p className="text-3xl font-extrabold mb-2 text-blue-700">$35.00</p>
            <p className="text-gray-600 mb-4">Billed every month</p>
            <button className="w-full rounded-full bg-blue-900 px-4 py-2 text-white font-bold hover:bg-blue-700 transition">Subscribe Monthly</button>
          </div>
          {/* Annual Plan */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 text-center bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-900">Annually</h2>
            <p className="text-3xl font-extrabold mb-2 text-blue-700">$300.00</p>
            <p className="text-gray-600 mb-4">Billed every year</p>
            <button className="w-full rounded-full bg-blue-900 px-4 py-2 text-white font-bold hover:bg-blue-700 transition">Subscribe Annually</button>
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 shadow text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-2">What Our Users Say</h3>
          <p className="text-lg text-gray-700 italic mb-2">“This subscription gave me instant access to top developers for my project. Highly recommended!”</p>
          <span className="text-blue-700 font-semibold">— Alex, Startup Founder</span>
        </div>
      </div>
    </main>
  );
}
