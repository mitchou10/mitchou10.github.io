import { Github, Linkedin } from 'lucide-react';

const CONTACT_CHANNELS = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mitchou10',
    href: 'https://www.linkedin.com/in/mitchou10',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '@mitchou10',
    href: 'https://github.com/mitchou10',
    icon: Github,
  },
];

export default function ContactVisuals() {
  return (
    <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
      {CONTACT_CHANNELS.map((channel) => {
        const Icon = channel.icon;

        return (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith('http') ? '_blank' : undefined}
            rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group rounded-2xl border border-slate-700/80 bg-slate-950/55 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-500/70 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">{channel.label}</p>
              <Icon className="h-5 w-5 text-cyan-300 transition group-hover:scale-105" aria-hidden="true" />
            </div>
            <p className="mt-3 text-lg font-semibold text-slate-100 sm:text-xl">{channel.value}</p>
          </a>
        );
      })}
    </div>
  );
}
