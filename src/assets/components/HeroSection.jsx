import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // Ici tu peux connecter ton API ou FormSpree via fetch
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="bg-[#1B1F24] text-white pt-28 pb-20 text-center">
      <div className="max-w-6xl mx-auto px-6">

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-[#007BFF]"
        >
          {t("hero.title")}
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-base sm:text-lg md:text-xl mb-8 text-[#C0C0C0]"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          whileHover={{ scale: 1.05, backgroundColor: "#00AEEF" }}
          href="#services"
          className="px-6 py-3 bg-[#007BFF] text-white rounded-lg shadow-md hover:bg-[#00AEEF] transition"
        >
          {t("hero.button")}
        </motion.a>

        {/* Newsletter / Subscribe Form */}
        <form
          onSubmit={handleSubscribe}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("hero.newsletterPlaceholder")}
            className="px-4 py-3 rounded-lg w-full sm:w-auto flex-1 border border-[#007BFF]/40 bg-[#1F2228] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:scale-105 transition-transform duration-200"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t("hero.newsletterButton")}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-green-400 font-semibold">
            {t("hero.newsletterSuccess")}
          </p>
        )}

        {/* Image principale */}
        <motion.img
          src="/assets/images/hero-image.png"
          alt="Hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mx-auto mt-10 w-full max-w-2xl rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}
