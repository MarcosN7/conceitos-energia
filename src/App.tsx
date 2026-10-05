import { useEffect, useState } from "react";
import {
  company,
  concepts,
  copy,
  filters,
  galleryItems,
  services,
  type Concept,
} from "./content";
import { Contact, Header, Photo } from "./components";

function Industrial() {
  const text = copy.industrial;
  return (
    <div className="concept industrial" id="inicio">
      <Header concept="industrial" />
      <main id="main">
        <section className="industrial-hero section-anchor" id="empresa">
          <div>
            <h1>
              {text.title[0]}
              <br />
              {text.title[1]}
              <em>.</em>
            </h1>
            <p className="hero-subtitle">{text.subtitle}</p>
          </div>
          <aside>
            <span className="concept-index">01 / Industrial</span>
            <p>{text.aside}</p>
          </aside>
        </section>
        <section
          id="atuacao"
          className="industrial-panorama section-anchor"
          aria-label="Implantação de sistemas de geração"
        >
          <Photo name="industrialHero" priority caption />
        </section>
        <section
          className="industrial-services section-anchor"
          id="servicos"
          aria-labelledby="services-heading"
        >
          <p className="eyebrow line">{text.serviceLabel}</p>
          <div className="industrial-service-grid">
            <h2 id="services-heading">
              {text.serviceTitle}
              <em>.</em>
            </h2>
            <p className="service-intro">{text.serviceIntro}</p>
            <div className="service-rows">
              {services.map((service) => (
                <a className="service-row" href="#contato" key={service.id}>
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-plus" aria-hidden="true">
                    +
                  </span>
                </a>
              ))}
            </div>
            <Photo name="industrialElectrical" caption />
          </div>
        </section>
        <Contact concept="industrial" />
      </main>
    </div>
  );
}

function Regional() {
  const text = copy.regional;
  return (
    <div className="concept regional" id="inicio">
      <Header concept="regional" />
      <main id="main">
        <section className="regional-hero">
          <div className="regional-opening">
            <p className="eyebrow">
              <span />
              02 / Regional
            </p>
            <h1>
              {text.title}
              <em>{text.accentTitle}</em>
            </h1>
            <p className="hero-subtitle">{text.subtitle}</p>
            <a className="button" href="#empresa">
              {text.explore}
            </a>
          </div>
          <Photo name="regionalHero" priority caption />
        </section>
        <section className="regional-story section-anchor" id="empresa">
          <p className="eyebrow accent-rule">{company.territory}</p>
          <h2>{text.sectionTitle}</h2>
          <div className="regional-story-grid">
            <Photo name="regionalTeam" caption />
            <div className="regional-story-copy section-anchor" id="servicos">
              <h3>{text.serviceTitle}</h3>
              <p>{text.body}</p>
              <div className="regional-services" aria-label="Serviços">
                {services.map((service) => (
                  <details key={service.id}>
                    <summary>{service.title}</summary>
                    <p>{service.description}</p>
                    <a href="#contato">{copy.talk}</a>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Contact concept="regional" />
      </main>
    </div>
  );
}

function Portfolio() {
  const text = copy.portfolio;
  const [filter, setFilter] = useState("Todas");
  // A primeira seleção mantém as duas imagens da referência; os filtros revelam as outras frentes.
  const items =
    filter === "Todas"
      ? galleryItems.slice(0, 2)
      : galleryItems.filter((item) => item.category === filter);
  const [allExpanded, setAllExpanded] = useState(false);
  const visible = filter === "Todas" && allExpanded ? galleryItems : items;
  return (
    <div className="concept portfolio" id="inicio">
      <Header concept="portfolio" />
      <main id="main">
        <section className="portfolio-hero section-anchor" id="empresa">
          <div className="portfolio-opening">
            <p className="eyebrow">
              03 / Portfólio
              <span />
            </p>
            <h1>{text.title}</h1>
            <p className="hero-subtitle">{text.subtitle}</p>
            <a className="text-link" href="#atuacao">
              {text.explore}
            </a>
          </div>
          <Photo name="portfolioHero" priority caption />
        </section>
        <section className="portfolio-work section-anchor" id="atuacao">
          <div className="portfolio-work-header">
            <h2>{text.galleryTitle}</h2>
            <div
              className="filters"
              role="group"
              aria-label="Filtrar frentes de atuação"
            >
              {filters.map((value) => (
                <button
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => {
                    setFilter(value);
                    setAllExpanded(true);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <p className="gallery-note">{text.galleryNote}</p>
          <div
            className="portfolio-gallery"
            aria-live="polite"
            aria-atomic="false"
          >
            {visible.map((item) => (
              <article key={item.id} className="gallery-item">
                <a
                  href="#contato"
                  aria-label={`Conversar sobre ${item.title.toLowerCase()}`}
                >
                  <Photo name={item.photo} />
                  <h3>
                    {item.title}
                    <span aria-hidden="true">+</span>
                  </h3>
                </a>
                <p className="image-caption">
                  {copy.imageNote} · {item.category}
                </p>
                <p className="gallery-description">{item.description}</p>
              </article>
            ))}
          </div>
          {filter === "Todas" && !allExpanded && (
            <button
              className="text-link gallery-more"
              onClick={() => setAllExpanded(true)}
            >
              Ver todas as frentes
            </button>
          )}
          <p className="sr-only" role="status">
            {visible.length} frentes exibidas. Filtro: {filter}.
          </p>
          <div className="portfolio-expertise section-anchor" id="expertise">
            <span className="eyebrow">{copy.nav.expertise}</span>
            <p>{company.description}</p>
          </div>
        </section>
        <Contact concept="portfolio" />
      </main>
    </div>
  );
}

function Gallery() {
  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <div className="gallery-wordmark">
          {company.name}
          <span>{company.descriptor}</span>
        </div>
        <span className="eyebrow">Estudo de identidade digital</span>
      </header>
      <main id="main">
        <section className="gallery-intro">
          <p className="eyebrow">Três perspectivas. Uma atuação.</p>
          <h1>
            Engenharia e energia.
            <br />
            <span>Escolha uma direção.</span>
          </h1>
          <p>
            Três conceitos para apresentar a implantação civil e elétrica de
            sistemas de geração no Amazonas.
          </p>
        </section>
        <div className="concept-choices">
          {concepts.map((concept) => (
            <a
              className={`concept-choice choice-${concept.id}`}
              href={`/${concept.id}`}
              key={concept.id}
            >
              <div className="choice-preview">
                <div className="preview-bar">
                  <span>{company.name}</span>
                  <span>{concept.number} / Conceito</span>
                </div>
                <h2>{concept.previewTitle}</h2>
                <Photo
                  name={
                    concept.id === "industrial"
                      ? "industrialHero"
                      : concept.id === "regional"
                        ? "regionalHero"
                        : "portfolioHero"
                  }
                  priority
                />
              </div>
              <div className="choice-meta">
                <span className="choice-number">{concept.number}</span>
                <h3>{concept.title}</h3>
                <div className="swatches" aria-hidden="true">
                  {concept.palette.map((color) => (
                    <i key={color} style={{ background: color }} />
                  ))}
                </div>
              </div>
              <p>{concept.description}</p>
              <span className="choice-link">Explorar conceito</span>
            </a>
          ))}
        </div>
      </main>
      <footer className="gallery-footer">
        <p>{company.fullName}</p>
        <p>Demonstração · Conteúdo e imagens ilustrativos</p>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">404 / Página não encontrada</p>
      <h1>
        Vamos voltar
        <br />
        ao início.
      </h1>
      <a className="button" href="/">
        Ver os três conceitos
      </a>
    </main>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const concept = concepts.find((item) => `/${item.id}` === path);
  useEffect(() => {
    document.title = `${concept ? concept.title : path === "/" ? "Conceitos" : "Página não encontrada"} | ${company.fullName}`;
  }, [concept, path]);
  const pages: Record<Concept, React.ReactNode> = {
    industrial: <Industrial />,
    regional: <Regional />,
    portfolio: <Portfolio />,
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      {concept ? pages[concept.id] : path === "/" ? <Gallery /> : <NotFound />}
    </>
  );
}
