"use client";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

export const TestimonialCard = ({ name, role, content }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <StarRating />
    <p className="mt-4 text-gray-600">{content}</p>
    <div className="mt-4">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </motion.div>
);
