import portfolioData from '../public/assets/data/portfolio.json';
import Nav from './components/Nav';
import ThemeInitializer from './components/ThemeInitializer';
import HomePage from './pages/home/HomePage';
import type { Portfolio } from './types/portfolio';

export default function Home() {
  const data = portfolioData as Portfolio;
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.personal.name,
    alternateName: ['mdomorfaruk', 'iamomor', 'Muhammad Omor Faruk', 'Muhammad Omor', 'Omor Faruk'],
    jobTitle: data.personal.title,
    description: data.personal.bio,
    email: data.personal.email,
    url: 'https://iamomor.com',
    image: data.personal.avatar,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    sameAs: Object.values(data.personal.social).filter(Boolean),
  };

  return (
    <>
      <ThemeInitializer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Nav />
      <HomePage data={data} />
    </>
  );
}
