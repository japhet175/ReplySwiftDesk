import { useTranslation } from "react-i18next";

export default function ServiceCard({ icon, titleKey, descKey }) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#1F2228] border border-[#007BFF]/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 flex flex-col items-start">
      
      {/* Icon */}
      <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#007BFF]/20 to-[#00AEEF]/20 text-[#00AEEF]">
        {icon}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold mb-3"
        style={{
          background: "linear-gradient(to right, #007BFF, #00AEEF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t(titleKey)}
      </h3>

      {/* Description */}
      <p className="text-[#C0C0C0] leading-relaxed">{t(descKey)}</p>

      {/* Optional Learn More Button */}
      {/* <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#007BFF] to-[#00AEEF] text-white rounded-lg font-semibold hover:opacity-90 transition">
        {t('service.learnMore')}
      </button> */}
    </div>
  );
}
