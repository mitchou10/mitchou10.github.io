import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default mail client with pre-filled content
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:mitchou10@github.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="mb-12 rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">Get In Touch</h2>
        <p className="mt-2 text-center text-slate-400">
          Have a project in mind or just want to say hi? I&apos;d love to hear from you.
        </p>

        {sent ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-300">
            <p>Thanks! Your mail client should have opened.</p>
            <button
              className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
              onClick={() => setSent(false)}
            >
              Send Another
            </button>
          </div>
        ) : (
          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/mitchou10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 transition hover:text-cyan-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
