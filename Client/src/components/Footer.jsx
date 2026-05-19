/* Client/src/components/Footer.jsx */

import React from "react";

function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>

            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-[#0f172a]">Auth</h2>

              <p className="text-sm text-gray-500">MERN Authentication</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a href="https://akibo.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#0f172a] transition">
                Portfolio
              </a>

              <a href="https://github.com/MohammadAkib404" target="_blank" rel="noreferrer" className="hover:text-[#0f172a] transition">
                GitHub
              </a>

              <a href="https://www.linkedin.com/in/mdakib7394/" target="_blank" rel="noreferrer" className="hover:text-[#0f172a] transition">
                LinkedIn
              </a>

              <a href="mailto:akibo7394@gmail.com" className="hover:text-[#0f172a] transition">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
