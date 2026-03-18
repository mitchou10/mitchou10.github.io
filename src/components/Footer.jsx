export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 px-4 py-7 text-center sm:px-6 lg:px-8">
      <p className="text-sm text-slate-500">
        Built with React &amp; Vite &mdash; &copy; {year} mitchou10
      </p>
    </footer>
  );
}
