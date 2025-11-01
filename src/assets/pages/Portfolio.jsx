export default function Portfolio() {
  const projects = [
    { title: "Project One", desc: "Branding & Social Media" },
    { title: "Project Two", desc: "Website Design" },
    { title: "Project Three", desc: "Email Campaign" },
  ];

  return (
    <main className="pt-28 pb-20 max-w-6xl mx-auto px-6 text-center">
      <h1 className="text-4xl font-bold mb-12">Our Portfolio</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-slate-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
