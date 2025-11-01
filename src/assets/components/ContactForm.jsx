import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    referral: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/xnnovyeq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          referral: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert(t("contact.errorMessage"));
      }
    } catch {
      alert(t("contact.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-r from-[#0f1114] via-[#16191D] to-[#0f1114] flex items-center justify-center py-12 px-4 sm:py-20">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-[#1B1F24] rounded-2xl shadow-2xl border border-[#007BFF]/40">

        {/* Navigation Links */}
        <div className="flex justify-between mb-6 text-sm sm:text-base flex-wrap">
          <Link to="/about" className="flex items-center text-[#00AEEF] hover:opacity-80 transition mb-2 sm:mb-0">
            <ArrowLeft className="w-5 h-5 mr-2" /> {t("contact.backToAbout")}
          </Link>
          <Link to="/services" className="flex items-center text-[#00AEEF] hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 mr-2 rotate-180" /> {t("contact.backToServices")}
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#007BFF] to-[#00AEEF]">
          {t("contact.title")}
        </h2>

        <p className="text-[#C0C0C0] mb-6 text-center text-sm sm:text-base">
          {t("contact.subtitle")}
        </p>

        {success && (
          <p className="text-green-400 mb-4 text-center font-semibold">
            {t("contact.successMessage")}
          </p>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("contact.form.name")}
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <input
            type="email"
            name="email"
            placeholder={t("contact.form.email")}
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <input
            type="text"
            name="company"
            placeholder={t("contact.form.company")}
            value={formData.company}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          >
            <option value="">{t("contact.form.selectService")}</option>
            <option>{t("services.redesign.title")}</option>
            <option>{t("services.email.title")}</option>
            <option>{t("DigitalMarketing")}</option>
            <option>{t("SocialMedia Management")}</option>
            <option>{t("CustomerSupport")}</option>
            <option>{t("VirtualAssistant")}</option>
            <option>{t("  Other services")}</option>
            
          </select>
          <input
            type="text"
            name="referral"
            placeholder={t("contact.form.referral")}
            value={formData.referral}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <textarea
            name="message"
            placeholder={t("contact.form.message")}
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting ? t("contact.sending") : t("contact.sendButton")}
          </button>
        </form>
      </div>
    </main>
  );
}
