import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();
  const services = ["redesign", "email", "digital", "social", "support", "virtual"];

  return (
    <section className="px-4 py-10 sm:py-16 md:py-20 bg-[#1B1F24] text-white">
      {/* Title */}
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-10"
        style={{
          background: "linear-gradient(to right, #007BFF, #00AEEF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("navbar.services")}
      </h2>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {services.map((key) => (
          <div
            key={key}
            className="bg-[#242830] rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#00AEEF]">
                {t(`services.${key}.title`)}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t(`services.${key}.desc`)}
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="mt-auto inline-block text-center bg-[#00AEEF] hover:bg-[#007BFF] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {t("cta.getInTouch")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
