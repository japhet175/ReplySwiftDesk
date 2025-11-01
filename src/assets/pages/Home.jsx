import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import marketingTeam from "../images/marketingTeam.jpg";
import digitalTeam from "../images/digitalTeam.jpg";

export default function Home() {
  const { t } = useTranslation();
  const [subscribed, setSubscribed] = useState(false);

  const stats = [
    { number: "5+", labelKey: "yearsExperience" },
    { number: "300+", labelKey: "successfulCampaigns" },
    { number: "150+", labelKey: "satisfiedClients" },
    { number: "50+", labelKey: "projectsCompleted" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/xnnovyeq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setSubscribed(true);
        e.target.reset();
        setTimeout(() => setSubscribed(false), 4000);
      }
    } catch (err) {
      console.error("Subscription error:", err);
    }
  };

  return (
    <main className="pt-28 bg-[#1B1F24] text-[#C0C0C0] min-h-screen">

      {/* HERO Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-20">
        <div className="md:w-1/2 space-y-6">
          <h1
            className="text-5xl font-extrabold"
            style={{
              background: "linear-gradient(to right, #007BFF, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t('hero.title')}
          </h1>
          <p className="text-xl font-semibold leading-relaxed text-[#C0C0C0]">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg leading-relaxed text-[#C0C0C0]">
            {t('hero.description')}
          </p>
          <Link
            to="/services"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            {t('cta.exploreServices')}
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={marketingTeam}
            alt="Marketing Team"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Marketing Team Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-20 bg-[#16191D] rounded-xl">
        <div className="md:w-1/2 flex justify-center order-1 md:order-2">
          <img
            src={digitalTeam}
            alt="Digital Team"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-6 order-2 md:order-1">
          <h2
            className="text-4xl font-bold"
            style={{
              background: "linear-gradient(to right, #007BFF, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t('marketingTeam.title')}
          </h2>
          <p className="text-lg leading-relaxed text-[#C0C0C0]">
            {t('marketingTeam.paragraph1')}
          </p>
          <p className="text-lg leading-relaxed text-[#C0C0C0]">
            {t('marketingTeam.paragraph2')}
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            {t('cta.getInTouch')}
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2
          className="text-4xl font-bold mb-8"
          style={{
            background: "linear-gradient(to right, #007BFF, #00AEEF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t('ourStory.title')}
        </h2>
        <p className="text-lg leading-relaxed mb-12">
          {t('ourStory.description')}
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1F2228] rounded-lg p-6 shadow-md border border-[#007BFF]">
              <h3 className="text-3xl font-bold mb-2 text-[#00AEEF]">{stat.number}</h3>
              <p className="text-[#C0C0C0]">{t(`stats.${stat.labelKey}`)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-lg">{t('cta.exploreServicesDescription')}</p>
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            {t('cta.exploreServices')}
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2
          className="text-3xl font-bold mb-6"
          style={{
            background: "linear-gradient(to right, #007BFF, #00AEEF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t('newsletter.title')}
        </h2>
        <p className="text-lg mb-6">{t('newsletter.description')}</p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            name="email"
            placeholder={t('newsletter.placeholder')}
            required
            className="px-4 py-3 rounded-lg w-full sm:w-auto flex-1 border border-[#007BFF]/40 bg-[#1F2228] text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t('newsletter.button')}
          </button>
        </form>
        {subscribed && <p className="text-green-400 mt-4">{t('newsletter.successMessage')}</p>}
      </section>
    </main>
  );
}
