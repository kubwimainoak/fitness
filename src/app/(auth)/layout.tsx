import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex-grow bg-gradient-to-br from-[#1E3A8A] to-[#2E4A9A] p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Universal Gym Membership</h1>
            <p className="text-blue-100">
              Access thousands of gyms with a single membership
            </p>
          </div>
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            {/* You can add an actual image here */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2E4A9A] to-[#4C6EF5] opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access to 1000+ gyms nationwide
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Book classes with ease
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Flexible pricing options
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No long-term contracts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex-grow bg-white flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
} 