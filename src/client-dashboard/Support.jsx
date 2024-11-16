import React from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import whatsappNumber from "../utils/whatsappNumber";

function Support() {
  return (
    <div className="mt-2 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold mb-4">Support</h2>
      {/* Call Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center">
        <FaPhoneAlt className="text-primary dark:text-blue-400 text-2xl mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-medium">Call Support</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Speak to our support team directly.
          </p>
        </div>
        <a
          href={`tel:${whatsappNumber()}`}
          className="bg-primary dark:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Call Now
        </a>
      </div>

      {/* Email Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center">
        <FaEnvelope className="text-primary dark:text-blue-400 text-2xl mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-medium">Email Support</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Send us an email for assistance.
          </p>
        </div>
        <a
          href="mailto:support@tapnserve.net"
          target="_blank"
          className="bg-primary dark:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Email Us
        </a>
      </div>

      {/* WhatsApp Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center">
        <FaWhatsapp className="text-green-500 text-2xl mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-medium">WhatsApp Support</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Chat with us on WhatsApp.
          </p>
        </div>
        <a
          target="_blank"
          href={`https://wa.me/${whatsappNumber()}`}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Chat Now
        </a>
      </div>
    </div>
  );
}

export default Support;
