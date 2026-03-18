import ContactVisuals from './ContactVisuals';

export default function Contact() {
  return (
    <section id="contact" className="mb-10 flex min-h-[calc(100vh-6rem)] scroll-mt-24 items-center rounded-3xl border border-slate-800 bg-slate-900/35 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-center text-4xl font-bold text-slate-100 sm:text-5xl">Get In Touch</h2>
        <p className="mt-3 text-center text-base text-slate-300 sm:text-lg">Find me on these platforms.</p>

        <ContactVisuals />
      </div>
    </section>
  );
}
