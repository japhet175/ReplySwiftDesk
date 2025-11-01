import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 shadow-md border-b border-[#007BFF]/20 bg-[#242830]">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-[#00AEEF]">
          ReplySwiftDesk
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <Link to="/" className="hover:text-[#00AEEF] transition-colors">{t("navbar.home")}</Link>
          <Link to="/about" className="hover:text-[#00AEEF] transition-colors">{t("navbar.about")}</Link>
          <Link to="/services" className="hover:text-[#00AEEF] transition-colors">{t("navbar.services")}</Link>
          <Link to="/contact" className="hover:text-[#00AEEF] transition-colors">{t("navbar.contact")}</Link>
          <Link to="/careers" className="hover:text-[#00AEEF] transition-colors font-bold">{t("navbar.careers")}</Link>

          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue="en"
            className="bg-[#1B1F24] border border-[#007BFF]/40 text-sm rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="rw">RW</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#1B1F24] border-t border-[#007BFF]/20 py-4 space-y-4">
          <Link to="/" className="hover:text-[#00AEEF] transition-colors">{t("navbar.home")}</Link>
          <Link to="/about" className="hover:text-[#00AEEF] transition-colors">{t("navbar.about")}</Link>
          <Link to="/services" className="hover:text-[#00AEEF] transition-colors">{t("navbar.services")}</Link>
          <Link to="/contact" className="hover:text-[#00AEEF] transition-colors">{t("navbar.contact")}</Link>
          <Link to="/careers" className="hover:text-[#00AEEF] transition-colors font-bold">{t("navbar.careers")}</Link>

          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue="en"
            className="bg-[#242830] border border-[#007BFF]/40 text-sm rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="rw">RW</option>
          </select>
        </div>
      )}
    </nav>
  );
}
