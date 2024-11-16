import React from "react";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="mt-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[90px]">
        <h1 className="text-3xl font-bold mb-6">
          Privacy Policy & Data Protection
        </h1>
        <p className="mb-4">
          Tap n Serve is committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you use our
          platform.
        </p>

        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect personal information you provide when creating an account,
          making a transaction, or contacting us for support. This information
          may include your name, email address, phone number, payment
          information, and other necessary data to facilitate your experience on
          Tap n Serve.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          2. Use of Personal Information
        </h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Facilitate transactions and manage your account.</li>
          <li>Improve and personalize the Tap n Serve platform.</li>
          <li>Send notifications regarding updates, security, and features.</li>
          <li>Provide customer support and handle inquiries.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          3. Data Sharing and Disclosure
        </h2>
        <p className="mb-4">
          Tap n Serve does not sell, trade, or rent your personal information to
          third parties. However, we may share your data with trusted
          third-party service providers for the purpose of processing payments,
          providing support, or improving our platform. These third parties are
          obligated to keep your information confidential and use it solely for
          the services we authorize.
        </p>

        <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
        <p className="mb-4">
          We take data security seriously and use a variety of measures to
          protect your personal information from unauthorized access, loss, or
          alteration. This includes encryption, secure servers, and regular
          security audits.
        </p>

        <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
        <p className="mb-4">
          Tap n Serve retains your personal information for as long as necessary
          to fulfill the purposes outlined in this policy, or as required by
          law. When your data is no longer needed, we securely delete or
          anonymize it.
        </p>

        <h2 className="text-2xl font-bold mb-4">6. Your Data Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Access, update, or delete your personal information.</li>
          <li>Withdraw consent for data processing at any time.</li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Opt out of receiving marketing communications.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
        <p className="mb-4">
          Our platform may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these sites. We
          recommend reviewing the privacy policies of any third-party services
          you access through Tap n Serve.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          8. Changes to this Privacy Policy
        </h2>
        <p className="mb-4">
          Tap n Serve reserves the right to update this Privacy Policy at any
          time. We will notify users of any significant changes via email or an
          in-platform notification. Continued use of the platform after changes
          have been made constitutes your acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
        <p className="mb-4">
          If you have any questions regarding these terms, feel free to contact
          us at{" "}
          <a
            href="mailto:support@tapnserve.com"
            className="text-blue-500 underline mr-2"
          >
            support@tapnserve.com
          </a> 
           or visit <Link to={"/contact"} className="text-blue-500 " >Contact us page</Link>
        </p>
      </div>
    </div>
  );
}

export default Privacy;
