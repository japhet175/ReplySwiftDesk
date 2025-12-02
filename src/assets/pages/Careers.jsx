import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
export default function Careers() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/xnnovyeq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (error) {
      alert(t("careers.errorMessage"));
    }
  }

  return (
    <>
    <Helmet>
        <title>Careers - ReplySwiftDesk</title>
        <meta
          name="description"
          content="Join the ReplySwiftDesk team. Explore open positions and opportunities to work in digital marketing, web development, and virtual assistance."
        />
      </Helmet>

      <h1 className="sr-only">Careers - ReplySwiftDesk</h1>
    <main className="min-h-screen w-full bg-gradient-to-r from-[#0f1114] via-[#16191D] to-[#0f1114] flex flex-col items-center justify-start py-20 px-4">
      
      {/* BACK ARROW ONLY */}
      <div className="w-full max-w-6xl mb-6 text-left">
        <Link
          to="/"
          className="inline-flex items-center text-[#00AEEF] hover:opacity-80 transition"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center max-w-6xl"
        style={{
          background: "linear-gradient(to right, #007BFF, #00AEEF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("careers.title")}
      </h1>

      {/* Intro */}
      <p className="text-base sm:text-lg md:text-xl mb-12 max-w-3xl text-center leading-relaxed text-[#C0C0C0]">
        {t("careers.intro")}
      </p>

      {/* Contact Form */}
      <div className="flex flex-col items-center justify-center w-full mb-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-[#1B1F24] p-6 sm:p-8 rounded-2xl shadow-2xl border border-[#007BFF]/40 w-full max-w-lg text-left"
        >
          <h3
            className="text-2xl font-semibold mb-4 text-center"
            style={{
              background: "linear-gradient(to right, #007BFF, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("careers.formTitle")}
          </h3>

          <input
            type="text"
            name="name"
            placeholder={t("careers.fullName")}
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("careers.email")}
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            required
          />
          <input
            type="text"
            name="company"
            placeholder={t("careers.company")}
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />

          <select
            name="service"
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            required
          >
            <option value="">{t("careers.selectService")}</option>
            <option>{t("services.redesign.title")}</option>
            <option>{t("services.email.title")}</option>
            <option>{t("services.digital.title")}</option>
            <option>{t("services.social.title")}</option>
            <option>{t("services.support.title")}</option>
            <option>{t("services.virtual.title")}</option>
            <option>{t("careers.other")}</option>
          </select>

          <select
            name="source"
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          >
            <option value="">{t("careers.hearAbout")}</option>
            <option>{t("careers.google")}</option>
            <option>{t("careers.social")}</option>
            <option>{t("careers.referral")}</option>
            <option>{t("careers.friendPartner")}</option>
            <option>{t("careers.other")}</option>
          </select>

          <textarea
            name="message"
            placeholder={t("careers.message")}
            rows="4"
            className="p-3 rounded-lg border border-[#C0C0C0]/40 bg-[#1B1F24] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
            required
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition bg-gradient-to-r from-[#007BFF] to-[#00AEEF]"
          >
            {t("careers.send")}
          </button>

          {submitted && (
            <p className="text-green-400 text-center font-medium mt-2">
              {t("careers.successMessage")}
            </p>
          )}
        </form>
      </div>
    </main>
    </>
  );
}
