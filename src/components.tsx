import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  company,
  copy,
  photos,
  type Concept,
  type PhotoName,
  type PhotoAsset,
} from "./content";

export function Photo({
  name,
  className = "",
  priority = false,
  caption = false,
}: {
  name: PhotoName;
  className?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  const photo: PhotoAsset = photos[name];
  const titleId = useId();
  const style = { aspectRatio: `${photo.w} / ${photo.h}` } as CSSProperties;
  return (
    <figure className={`photo ${className}`} style={style}>
      <svg
        className="photo-window"
        viewBox={`${photo.x} ${photo.y} ${photo.w} ${photo.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-labelledby={titleId}
        data-priority={priority ? "high" : "normal"}
      >
        <title id={titleId}>{photo.alt}</title>
        <image
          href={photo.src}
          width={photo.baseWidth}
          height={photo.sourceHeight ?? photo.baseWidth * 1.5}
        />
      </svg>
      {caption && <figcaption>{copy.imageNote}</figcaption>}
    </figure>
  );
}

export function Brand() {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label={`${company.fullName} — início`}
    >
      <span>{company.name}</span>
      <small>{company.descriptor}</small>
    </a>
  );
}

export function Header({ concept }: { concept: Concept }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const region = concept === "regional";
  const portfolio = concept === "portfolio";
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    const query = window.matchMedia("(min-width: 761px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      query.removeEventListener("change", resize);
    };
  }, [open]);
  const links = portfolio
    ? [
        ["#atuacao", copy.nav.gallery],
        ["#expertise", copy.nav.expertise],
        ["#empresa", copy.nav.company],
        ["#contato", copy.nav.contact],
      ]
    : [
        ["#empresa", region ? copy.nav.regional : copy.nav.company],
        ["#servicos", copy.nav.services],
        ...(!region ? [["#atuacao", copy.nav.gallery]] : []),
        ["#contato", copy.nav.contact],
      ];
  return (
    <header className="site-header">
      <Brand />
      <button
        className="menu-toggle"
        ref={toggle}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar" : "Menu"}
        <span
          className={open ? "menu-glyph is-open" : "menu-glyph"}
          aria-hidden="true"
        >
          <i />
          <i />
        </span>
      </button>
      <nav
        id="main-navigation"
        aria-label="Navegação principal"
        className={open ? "navigation open" : "navigation"}
        onBlur={(e) => {
          if (
            !e.currentTarget.contains(e.relatedTarget) &&
            e.relatedTarget !== toggle.current
          )
            setOpen(false);
        }}
      >
        {links.map(([href, label]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        {!portfolio && (
          <a
            className="button nav-cta"
            href="#contato"
            onClick={() => setOpen(false)}
          >
            {region ? copy.talk : copy.proposal}
          </a>
        )}
      </nav>
    </header>
  );
}

export function Contact({ concept }: { concept: Concept }) {
  const [expanded, setExpanded] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);
  const content = copy[concept];
  const contacts = company.contacts;
  const configured = Boolean(
    contacts.email || contacts.phone || contacts.whatsappUrl,
  );
  useEffect(() => {
    if (expanded) firstInput.current?.focus({ preventScroll: true });
  }, [expanded]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSuccess(true);
  }
  return (
    <section
      id="contato"
      className="contact section-anchor"
      aria-labelledby="contact-heading"
    >
      <div className="contact-backdrop" aria-hidden="true">
        <Photo name="river" />
      </div>
      <div className="contact-content">
        <div className="contact-heading">
          <p className="eyebrow">{copy.contact.label}</p>
          <h2 id="contact-heading">{content.contactTitle}</h2>
        </div>
        <div className="contact-action">
          <p>{content.contactDescription}</p>
          <button
            className="button contact-toggle"
            aria-expanded={expanded}
            aria-controls="contact-details"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? copy.contact.close
              : concept === "industrial"
                ? copy.proposal
                : copy.talk}
          </button>
        </div>
      </div>
      <div id="contact-details" className="contact-details" hidden={!expanded}>
        <div>
          <h3>{copy.contact.open}</h3>
          <p>{copy.contact.intro}</p>
          <p>{contacts.location}</p>
          {configured ? (
            <div className="contact-links">
              {contacts.email && (
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              )}
              {contacts.phone && (
                <a href={contacts.phoneHref}>{contacts.phone}</a>
              )}
              {contacts.whatsappUrl && (
                <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              )}
            </div>
          ) : (
            <p className="contact-pending">{contacts.pending}</p>
          )}
        </div>
        <form onSubmit={submit} onChange={() => setSuccess(false)}>
          <p id="demo-notice" className="demo-notice">
            {copy.contact.demo}
          </p>
          <div className="form-row">
            <label>
              Nome
              <input
                ref={firstInput}
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Seu nome"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                autoComplete="email"
                type="email"
                required
                maxLength={150}
                placeholder="Seu e-mail"
              />
            </label>
          </div>
          <label>
            Empresa
            <input
              name="company"
              autoComplete="organization"
              required
              minLength={2}
              maxLength={150}
              placeholder="Nome da sua empresa"
            />
          </label>
          <label>
            Sobre o projeto
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={3}
              placeholder="Local, tipo de geração e escopo previsto"
            />
          </label>
          <button
            className="button"
            type="submit"
            aria-describedby="demo-notice"
          >
            {copy.contact.submit}
          </button>
          <p className="form-status" role="status">
            {success ? copy.contact.success : ""}
          </p>
        </form>
      </div>
      <footer className="site-footer">
        <a href="/">{copy.otherConcepts}</a>
        <span>{copy.footerNote}</span>
      </footer>
    </section>
  );
}
