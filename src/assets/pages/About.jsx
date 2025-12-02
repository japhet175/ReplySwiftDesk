import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function About() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le rechargement
    setStatus("loading");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xjkvkrlk", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("network-error");
    }
  };

  return (
  
    <>
    <Helmet>
        <title>About Us - ReplySwiftDesk</title>
        <meta
          name="description"
          content="Learn about ReplySwiftDesk, our mission, services, and why customers choose us for digital marketing, support, and web solutions."
        />
      </Helmet>

      <h1 className="sr-only">About Us - ReplySwiftDesk</h1>
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

      {/* Services Highlights Section */}
      <section className="mt-20 px-6 max-w-5xl mx-auto text-center bg-[#161A20] border border-[#007BFF]/40 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-[#00AEEF]">
          {t("servicesHighlights.title", "Our Top Services")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1F2328] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
            <p className="text-[#C0C0C0] text-sm">
              Boost your online presence with tailored strategies and data-driven campaigns.
            </p>
          </div>
          <div className="bg-[#1F2328] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Email Marketing</h3>
            <p className="text-[#C0C0C0] text-sm">
              Reach your audience effectively with personalized email campaigns that convert.
            </p>
          </div>
          <div className="bg-[#1F2328] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Redesign & Redevelopment</h3>
            <p className="text-[#C0C0C0] text-sm">
              Modernize your website with a fresh design and optimized functionality.
            </p>
          </div>
          <div className="bg-[#1F2328] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Virtual Assistants</h3>
            <p className="text-[#C0C0C0] text-sm">
              Get support for your business tasks with skilled virtual assistants.
            </p>
          </div>
          <div className="bg-[#1F2328] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Social Media Management</h3>
            <p className="text-[#C0C0C0] text-sm">
              Grow and engage your audience across major social platforms.
            </p>
          </div>
        </div>
        <Link
          to="/services"
          className="mt-6 inline-block px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#007BFF] to-[#00AEEF] hover:opacity-90 transition"
        >
          {t("servicesHighlights.button", "Explore All Services")}
        </Link>
      </section>
    </main>
    </>
  );
}
