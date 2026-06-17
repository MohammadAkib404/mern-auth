/* Client/src/components/Header.jsx */
import React, { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { SiReact, SiNextdotjs, SiExpress, SiTailwindcss, SiPrisma, SiMongodb, SiNodedotjs } from "react-icons/si";

const techStack = [
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiExpress, name: "Express" },
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "NodeJS" },
  { icon: SiTailwindcss, name: "Tailwind" },
];

const data = [
  {
    title: "JWT Authentication",
    desc: "Secure token-based authentication with protected session handling.",
  },
  {
    title: "Email Verification",
    desc: "OTP verification workflow with secure email confirmation flows.",
  },
  {
    title: "Password Recovery",
    desc: "Password reset infrastructure with encrypted recovery validation.",
  },
  {
    title: "Protected Routes",
    desc: "Route-level authorization for authenticated application access.",
  },
];

function Hero() {
  const { userData } = useContext(AppContent);

  const navigate = useNavigate();

  return (
    /* Hero Section */
    <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 max-w-6xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-gray-600 shadow-sm">
        Production Ready MERN Authentication
      </div>
      {/* Main Content */}
      <div className="max-w-5xl mt-12">
        <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold tracking-[-0.04em] leading-[0.95] text-[#0f172a] ">
          Secure Authentication
          <br />
          Infrastructure
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-20">
          <button className="px-7 py-3.5 rounded-xl bg-[#0f172a] text-white font-medium hover:opacity-90 transition" onClick={() => navigate("/login")}>
            Try Now
          </button>

          <button className="px-7 py-3.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition">
            <a href="https://github.com/MohammadAkib404/mern-auth" target="_blank">
              GitHub Repository
            </a>
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
        {data.map((item, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-200/80 rounded-3xl p-7 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-left">
              <h3 className="text-sm font-semibold tracking-tight text-[#0f172a]">{item.title}</h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-5 mt-12 text-gray-400">
        <p className="text-sm">Powered by industry-leading tools</p>
        <div className="flex gap-10">
          {techStack.map(({ icon: Icon, name }) => (
            <Icon key={name} className="size-10 hover:text-gray-700 transition" title={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
