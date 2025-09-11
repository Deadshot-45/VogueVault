const PrivacyPolicy = () => {
  return (
    <section className="w-full py-8 px-20">
      <article className="flex justify-center items-center gap-3 mb-14">
        <h1 className="font-bold text-3xl max-sm:text-2xl font-mono text-zinc-500">
          Privacy <span className="text-black">Policy</span>
        </h1>
        <div className="border-2 w-10"></div>
      </article>

      <div className="flex max-lg:flex-col flex-wrap w-full">
        <div className="space-y-6 w-[60%] max-lg:w-full text-gray-600">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Information We Collect
            </h2>
            <p className="mb-2">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              How We Use Your Information
            </h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process your orders and payments</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Information Sharing
            </h2>
            <p className="mb-2">
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. This includes encryption, secure servers,
              and regular security assessments. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-black">
              Your Rights
            </h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="w-[30%] max-lg:w-full max-lg:border-none max-lg:px-0 border border-gray-400 rounded-lg text-zinc-500 h-[300px] text-[15px] p-8">
          <h2 className="text-xl font-semibold mb-3 text-black">Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact
            us at:
          </p>
          <ul className="list-none space-y-2 mt-2">
            <li>Email: privacy@voguevault.com</li>
            <li>Phone: 1800-123-4567</li>
            <li>Address: VogueVault Headquarters, Mumbai, India</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
