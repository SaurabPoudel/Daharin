"use client";
import { motion } from "framer-motion";
import StarRating from "./StarRating";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import GSDialog from "./GSDialog";

const Header = () => {
  return (
    <header className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex  flex-col  items-center gap-2"
        >
          <StarRating />
          <p className="text-sm text-gray-600">
            "No more hassle to download another calorie tracker app and accurate
            too!"
          </p>
        </motion.div>

        <div className="grid  md:grid-cols-2 mt-20 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl font-bold mb-6">
              Stay healthy and maintain calories with{" "}
              <p className="text-emerald-600"> WhatsApp</p>
            </h1>
            <p className="text-gray-600 mb-8">
              Track your nutrition journey right where you chat. No downloads,
              no complications.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 flex items-center gap-2">
                  Start For Free <ChevronRight />
                </button>
              </DialogTrigger>
              <GSDialog />
            </Dialog>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full  "
          >
            <img
              src="/2.png"
              alt="WhatsApp Interface"
              className=" md:ml-32 max-h-96 md:scale-150 scale-110 object-contain  w-full "
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
