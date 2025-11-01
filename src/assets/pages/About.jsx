import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="pt-28 pb-20 bg-[#1B1F24] text-[#C0C0C0] min-h-screen w-full">
      {/* Back Arrow */}
      <div className="mb-6 px-6 max-w-7xl mx-auto text-left">
        <Link
          to="/"
          className="inline-flex items-center text-[#00AEEF] hover:text-[#007BFF] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Title */}
      <h1
        className="text-5xl font-extrabold mb-8 px-6 max-w-7xl mx-auto text-center"
        style={{
          background: "linear-gradient(to right, #007BFF, #00AEEF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("about.title")}
      </h1>

      {/* Agency Description */}
      <div className="px-6 max-w-7xl mx-auto text-center space-y-4">
        <p className="text-lg leading-relaxed">{t("about.description1")}</p>
        <p className="text-lg leading-relaxed">{t("about.description2")}</p>
      </div>

      {/* Why Choose Us */}
      <section className="text-left mb-16 px-6 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-semibold mb-3"
          style={{
            background: "linear-gradient(to right, #007BFF, #00AEEF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("about.whyTitle")}
        </h2>
        <p className="text-lg">{t("about.whyDescription")}</p>
      </section>

      {/* How It Works */}
      <section className="text-left mb-16 px-6 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-semibold mb-3"
          style={{
            background: "linear-gradient(to right, #007BFF, #00AEEF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("about.howTitle")}
        </h2>
        <p className="text-lg mb-6">{t("about.howDescription1")}</p>
        <p className="text-lg">
          {t("about.howDescription2")}{" "}
          <Link
            to="/contact"
            className="text-[#00AEEF] underline font-semibold"
          >
            {t("about.contactLink")}
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-20 text-left max-w-7xl mx-auto px-6 space-y-8">
        <h2
          className="text-3xl font-semibold mb-8 text-center"
          style={{
            background: "linear-gradient(to right, #007BFF, #00AEEF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("about.faqTitle")}
        </h2>

        <div className="space-y-6">
          {t("about.faqItems", { returnObjects: true }).map((item, idx) => (
            <section key={idx}>
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              {item.answer && <p>{item.answer}</p>}
            </section>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-20 px-6 max-w-3xl mx-auto text-center bg-[#161A20] border border-[#007BFF]/40 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#00AEEF]">
          {t("newsletter.title")}
        </h2>
        <p className="text-[#C0C0C0] mb-6">{t("newsletter.description")}</p>
        <form
          action="https://formspree.io/f/xjkvkrlk"
          method="POST"
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="email"
            name="email"
            placeholder={t("newsletter.placeholder")}
            className="w-full sm:w-2/3 p-3 rounded-lg border border-[#007BFF]/40 bg-[#0f1114] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 w-full sm:w-auto rounded-lg font-semibold text-white bg-gradient-to-r from-[#007BFF] to-[#00AEEF] hover:opacity-90 transition"
          >
            {t("newsletter.button")}
          </button>
        </form>
      </section>
    </main>
  );
}
