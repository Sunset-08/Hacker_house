import './App.css';
import './components/generator/generator.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import BuilderGenerator from './components/generator/BuilderGenerator';

function scrollToGenerator() {
  const el = document.getElementById('generator');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Nav onCTAClick={scrollToGenerator} />
      <main id="main" role="main">
        <Hero onCTAClick={scrollToGenerator} />
        <BuilderGenerator />
      </main>
    </>
  );
}
