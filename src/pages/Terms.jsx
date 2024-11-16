import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="mt-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[90px]">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to Tap n Serve. By accessing and using our service, you agree
          to comply with the following terms and conditions. Please read these
          terms carefully before using our platform.
        </p>

        <h2 className="text-2xl font-bold mb-4">1. Use of the Platform</h2>
        <p className="mb-4">
          Tap n Serve is designed to facilitate bar and restaurant operations,
          including inventory management, order processing, and payment
          handling. You are granted a limited license to use the platform for
          its intended purpose only. Any misuse or unauthorized use is strictly
          prohibited.
        </p>

        <h2 className="text-2xl font-bold mb-4">2. User Responsibilities</h2>
        <p className="mb-4">
          As a user of Tap n Serve, you are responsible for maintaining the
          security of your account, ensuring that all information provided is
          accurate and up to date. You must notify us immediately of any
          unauthorized access or breach of security.
        </p>

        <h2 className="text-2xl font-bold mb-4">3. Payment Processing</h2>
        <p className="mb-4">
          Tap n Serve integrates modern payment methods, including cashless
          operations and STK push services. All payments processed through the
          platform are subject to the terms and conditions of the respective
          payment provider. Tap n Serve is not responsible for payment disputes
          or failures caused by third-party services.
        </p>

        <h2 className="text-2xl font-bold mb-4">4. Subscription and Fees</h2>
        <p className="mb-4">
          By using Tap n Serve, you agree to any applicable subscription fees.
          These fees may be subject to change, and we will notify you of any
          changes in advance. Failure to pay subscription fees may result in the
          suspension or termination of your account.
        </p>

        <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
        <p className="mb-4">
          All content, features, and technology provided through Tap n Serve are
          the exclusive property of Tap n Serve or its licensors. You are not
          allowed to copy, modify, or distribute any content without prior
          written consent.
        </p>

        <h2 className="text-2xl font-bold mb-4">6. Termination of Service</h2>
        <p className="mb-4">
          Tap n Serve reserves the right to terminate or suspend your account at
          any time, with or without notice, for reasons including violation of
          these terms, failure to pay subscription fees, or any other breach of
          policy.
        </p>

        <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          Tap n Serve is not liable for any direct, indirect, incidental, or
          consequential damages arising from the use or inability to use the
          platform, including but not limited to, loss of revenue, profits, or
          data.
        </p>

        <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          Tap n Serve reserves the right to update these terms at any time. Any
          changes will be communicated to users through appropriate channels,
          and continued use of the platform after changes have been made
          signifies your acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
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

export default Terms;
