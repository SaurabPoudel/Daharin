import React, { use } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

// TODO: Make a Get Started Page and show dialog in this page??
const WhatsAppDialog = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Connect with Daharin
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left side - WhatsApp message */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Send a WhatsApp message</h3>
            <p className="text-center text-gray-600">
              Use WhatsApp and send a message from your device to
            </p>

            <div className="flex items-center gap-2 text-lg font-medium">
              {/* <FontAwesomeIcon icon="fa-brands fa-whatsapp" /> */}
              {/* <img src="" alt="WhatsApp" className="w-6 h-6" /> */}
              +1 415 523 8886
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              with code
              <span className="font-bold text-black ">join out-western</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <span className="text-gray-600 mt-4">
              Start messaging with *help* command
            </span>

            <a
              href="https://wa.me/14155238886"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2"
            >
              Open WhatsApp
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Right side - QR code */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">
              Scan the QR code on mobile
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src="/wp.png"
                alt="WhatsApp QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppDialog;
