"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 bg-emerald-500">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Start your journey today
            </h2>
            <p className="mb-8">Register your number and start instant.</p>
            <Link href={"/getStarted"}>
              <button className="bg-white text-emerald-500 px-8 py-3 rounded-lg hover:bg-gray-100">
                Get Started
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex md:flex-row flex-col items-center"
          >
            <img
              src="/3.png"
              alt="App Preview"
              className="object-contain max-h-96"
            />
            <img
              src="/1.png"
              alt="App Preview"
              className="object-contain max-h-96"
            />
            <img
              src="/2.png"
              alt="App Preview"
              className="object-contain max-h-96"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
