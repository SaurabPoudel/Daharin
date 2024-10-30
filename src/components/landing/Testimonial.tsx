"use client";
import { motion } from "framer-motion";
import { TestimonialCard } from "./TestinomialCard";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content:
      "Tracking calories through WhatsApp is genius! No more juggling between different apps.",
  },
  {
    name: "Mike Chen",
    role: "Personal Trainer",
    content:
      "I recommend this to all my clients. The simplicity and accuracy are unmatched.",
  },
  {
    name: "Emma Watson",
    role: "Nutrition Coach",
    content:
      "The instant nutrition feedback through WhatsApp has transformed how I guide my clients.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-20" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What our users say</h2>
          <p className="text-gray-600">
            Join thousands of satisfied users on their health journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
