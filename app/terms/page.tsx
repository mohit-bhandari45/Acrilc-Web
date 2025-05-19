"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="max-w-8xl mx-auto py-12 px-6 font-[Helvetica]  min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Terms of Service for <span className="text-[#FAA21B]">Acrilc</span>
        </h1>
        <p className="text-gray-600 mb-2">Last Updated: May 18, 2025</p>
        <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
      </div>

        <Card className="bg-white">
          <CardContent className="space-y-8 text-gray-800 leading-relaxed px-8 py-10">
            <p className="text-lg">
              Welcome to{" "}
              <span className="font-semibold text-[#FAA21B]">Acrilc</span>, the
              artsy hub where you can explore, create, sell, and discover
              awesome art! These Terms of Service (&quot;Terms&quot;) are the rules for
              using our website (
              <a
                href="https://www.acrilc.com"
                className="underline text-[#FAA21B] hover:text-[#fa8a1b] transition-colors"
              >
                www.acrilc.com
              </a>
              ) and mobile app (if applicable). By using Acrilc, you agree to
              these Terms, so please read them carefully.
            </p>

            <Section title="1. Who We Are">
              Acrilc is an Indian company based in Dehradun, Uttarakhand,
              bringing artists and art lovers together to create, sell, and
              discover art worldwide.
            </Section>

            <Section title="2. Who Can Use Acrilc">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>
                  You must be at least 18 years old or have parental consent.
                </li>
                <li>You need a valid email address to sign up.</li>
                <li>
                  Don&apos;t use Acrilc if you&apos;re banned or if it&apos;s illegal in your
                  country.
                </li>
              </ul>
            </Section>

            <Section title="3. What You Can Do on Acrilc">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <FeatureCard title="Explore" description="Check out cool art from artists worldwide" icon="🔍" />
                <FeatureCard title="Create" description="Upload your art to share your creative genius" icon="🎨" />
                <FeatureCard title="Sell" description="List your artwork for sale and cash in on your creations" icon="💰" />
                <FeatureCard title="Discover" description="Find awesome art vibes and connect with art pals" icon="✨" />
              </div>
            </Section>

            <Section title="4. Your Responsibilities">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>
                  <span className="font-medium text-gray-900">Keep It Legal:</span> Don&lsquo;t upload illegal or stolen art.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Be Nice:</span> No bullying, spamming, or shady behavior.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Your Art:</span> You&apos;re responsible for what you upload.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Account Safety:</span> Keep your password secret.
                </li>
              </ul>
            </Section>

            <Section title="5. Our Rights">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>We can remove content that breaks laws or rules.</li>
                <li>We may ban accounts for misconduct.</li>
                <li>
                  We don&apos;t own your art, but we can display and promote it.
                </li>
              </ul>
            </Section>

            <Section title="6. Buying and Selling Art">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>
                  <span className="font-medium text-gray-900">Sellers:</span> You set prices, Acrilc takes commission.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Buyers:</span> Pay promptly. Acrilc helps with disputes.
                </li>
                <li>
                  <span className="font-medium text-gray-900">Refunds:</span> Buyer-seller disputes only; we help if needed.
                </li>
              </ul>
            </Section>

            <Section title="7. Intellectual Property">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Respect others&apos; work. Don&apos;t copy designs.</li>
                <li>
                  Report infringements to{" "}
                  <a
                    href="mailto:support@acrilc.com"
                    className="text-[#FAA21B] underline hover:text-[#fa8a1b] transition-colors"
                  >
                    support@acrilc.com
                  </a>
                  .
                </li>
              </ul>
            </Section>

            <Section title="8. Limitation of Liability">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#FAA21B]">
                <p>
                  We&apos;re not liable for bugs, downtime, or data loss. Use at your
                  own risk.
                </p>
              </div>
            </Section>

            <Section title="9. Termination">
              <p>
                You may delete your account anytime. We may suspend accounts for
                violations or if we shut down.
              </p>
            </Section>

            <Section title="10. Indian Laws Apply">
              <p>
                These Terms follow Indian law, and disputes are handled in
                Dehradun courts.
              </p>
            </Section>

            <Section title="11. Changes to These Terms">
              <p>
                We&apos;ll notify you about changes by email or website. Continued
                use means you agree to the new Terms.
              </p>
            </Section>

            <Section title="12. Contact Us">
              <div className="bg-[#fa621b15] p-5 rounded-lg flex flex-col space-y-2">
                <div className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span>Prem Nagar, Dehradun, Uttarakhand 248001, India</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">📧</span>
                  <a
                    href="mailto:support@acrilc.com"
                    className="text-[#FAA21B] underline hover:text-[#fa871b] transition-colors"
                  >
                    support@acrilc.com
                  </a>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">📞</span>
                  <span>+91-........</span>
                </div>
              </div>
            </Section>
          </CardContent>
        </Card>
{/* 
      <div className="mt-8 flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
          Accept & Continue
        </button>
      </div> */}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
        <div className="w-1 h-6 bg-orange-400 mr-3 rounded"></div>
        {title}
      </h2>
      <div className="ml-4">{children}</div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}