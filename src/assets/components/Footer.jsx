import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1B1F24] text-white py-12 border-t border-[#007BFF]/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

        {/* Logo & Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#00AEEF]">ReplySwiftDesk</h1>
          <p className="mt-2 text-[#A0A0A0]">Marketing Agency in Kigali</p>
          <p className="text-[#A0A0A0]">infoswiftreplydesk.com@swiftreplydesk.site | +250 798980113</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-12 flex-1 text-center md:text-left">
          <div>
            <h3 className="font-semibold mb-2 text-[#00AEEF]">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-[#007BFF] transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#007BFF] transition">Services</Link></li>
              <li><Link to="/about" className="hover:text-[#007BFF] transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#007BFF] transition">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-[#007BFF] transition font-bold">Careers</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-2 text-[#00AEEF]">Follow Us</h3>
            <div className="flex gap-4 justify-center md:justify-start text-[#A0A0A0]">
              <a
                href="https://www.facebook.com/profile.php?id=61583156332887"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#007BFF] transition"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/swiftreplydesk?igsh=YzFoN3JqdHRxaGhu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#007BFF] transition"
              >
                <Instagram />
              </a>
              <a href="#" className="hover:text-[#007BFF] transition"><Twitter /></a>
              <a href="#" className="hover:text-[#007BFF] transition"><Linkedin /></a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-[#808080] text-sm">
        © {new Date().getFullYear()} ReplySwiftDesk. All rights reserved.
      </div>
    </footer>
  );
}
