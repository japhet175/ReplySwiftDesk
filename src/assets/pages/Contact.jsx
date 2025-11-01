import ContactForm from "../components/ContactForm";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#1B1F24] via-[#16191D] to-[#1B1F24] flex flex-col items-center justify-start pt-28 pb-20 px-6 text-center">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-[#C0C0C0]">
        Contact Us
      </h1>

      {/* Subtitle */}
      <p className="text-[#C0C0C0] mb-8 max-w-2xl">
        Get in touch with our team for your marketing needs.
      </p>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-12 text-[#C0C0C0]">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-[#00AEEF]" />
          <span>infoswiftreplydesk.com@swiftreplydesk.site</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-6 h-6 text-[#00AEEF]" />
          <span>+250 798980113</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-lg">
        <ContactForm />
      </div>
    </main>
  );
}
