import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        Built with React &amp; Vite &mdash; &copy; {year} mitchou10
      </p>
    </footer>
  );
}
