import { useState, useEffect, useRef } from "react";
import "../styles/portfolio.css";

import heroFrontFacade from "../assets/hero-front-facade.jpg";
import aerialPerspective from "../assets/aerial-perspective.jpg";
import siteDevelopmentPlan from "../assets/site-development-plan.jpg";
import shoppingCenterExterior from "../assets/shopping-center-exterior.jpg";
import supermarketExterior from "../assets/supermarket-exterior.jpg";
import eventHallExterior from "../assets/event-hall-exterior.jpg";
import hugpongConcept from "../assets/hugpong-concept.jpg";
import supermarketInteriorsStrip from "../assets/supermarket-interiors-strip.jpg";
import eventHallInteriorsStrip from "../assets/event-hall-interiors-strip.jpg";
import foodCourtInterior from "../assets/food-court-interior.jpg";
import materialsUsed from "../assets/materials-used.jpg";
import explodedAxonometry from "../assets/exploded-axonometry.jpg";
import thumbCommunityPlaza from "../assets/thumb-community-plaza.jpg";
import thumbShoppingCenter from "../assets/thumb-shopping-center.jpg";
import shoppingCenterFloorPlans from "../assets/shopping-center-floor-plans.jpg";
import supermarketFloorPlan from "../assets/supermarket-floor-plan.jpg";
import eventHallPlan from "../assets/event-hall-plan.jpg";
import shoppingCenterElevations from "../assets/shopping-center-elevations.jpg";
import supermarketEventElevations from "../assets/supermarket-event-elevations.jpg";
import presentationBoard01 from "../assets/presentation-board-01.jpg";
import presentationBoard02 from "../assets/presentation-board-02.jpg";

interface LightboxState {
  open: boolean;
  src: string;
  title: string;
}

function useRevealRef() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref as React.RefObject<any>;
}

function Reveal({ children, className = "" }: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pf-reveal ${className}`}>
      {children}
    </div>
  );
}

function ShowcaseTile({
  src, alt, num, label, className = "", onClick,
}: {
  src: string; alt: string; num: string; label: string; className?: string; onClick: () => void;
}) {
  const ref = useRevealRef();
  return (
    <figure
      ref={ref}
      className={`pf-feature-tile pf-reveal ${className}`}
      onClick={onClick}
      style={{ margin: 0 }}
    >
      <img src={src} alt={alt} />
      <figcaption>
        <span>{num}</span>
        <strong>{label}</strong>
      </figcaption>
    </figure>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false, src: "", title: "" });
  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: "work", element: document.getElementById("work") },
      { id: "concept", element: document.getElementById("concept") },
      { id: "drawings", element: document.getElementById("drawings") },
      { id: "details", element: document.getElementById("details") },
      { id: "contact", element: document.getElementById("contact") },
    ];

    const visibleSections = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, true);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size > 0) {
          // Find the section that's topmost (closest to viewport top)
          let topmost = Array.from(visibleSections.keys())[0];
          let topmostRect = document.getElementById(topmost)?.getBoundingClientRect();

          Array.from(visibleSections.keys()).forEach((sectionId) => {
            const rect = document.getElementById(sectionId)?.getBoundingClientRect();
            if (rect && topmostRect && rect.top < topmostRect.top) {
              topmost = sectionId;
              topmostRect = rect;
            }
          });

          setActiveSection(topmost);
        }
      },
      { threshold: 0.1 }
    );

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox.open) closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);

  function openLightbox(src: string, title: string) {
    setLightbox({ open: true, src, title });
  }

  function closeLightbox() {
    setLightbox({ open: false, src: "", title: "" });
  }

  function closeNav() {
    setNavOpen(false);
  }

  const galleryItems = [
    { src: hugpongConcept, label: "Design Concept", alt: "Hugpong design concept board" },
    { src: supermarketInteriorsStrip, label: "Supermarket Interiors", alt: "Supermarket interior perspectives" },
    { src: eventHallInteriorsStrip, label: "Event Hall Interiors", alt: "Event hall interior perspectives" },
    { src: foodCourtInterior, label: "Food Court", alt: "Food court interior render" },
    { src: materialsUsed, label: "Materials", alt: "Materials used board" },
    { src: explodedAxonometry, label: "Axonometry", alt: "Exploded axonometry showing roof and wall assemblies" },
    { src: thumbCommunityPlaza, label: "Community Plaza", alt: "Community plaza render" },
    { src: thumbShoppingCenter, label: "Facade Detail", alt: "Shopping center detail render" },
  ];

  const drawingCards = [
    { src: shoppingCenterFloorPlans, title: "Shopping Center Floor Plans", sub: "Ground + second floor", alt: "Shopping center ground and second floor plans" },
    { src: siteDevelopmentPlan, title: "Site Development Plan", sub: "Program, circulation, plaza, and support zones", alt: "Site development plan" },
    { src: supermarketFloorPlan, title: "Supermarket Ground Floor Plan", sub: "Retail and service organization", alt: "Supermarket ground floor plan" },
    { src: eventHallPlan, title: "Event Hall Plan", sub: "Gathering, pre-function, and support spaces", alt: "Event hall plan" },
    { src: shoppingCenterElevations, title: "Shopping Center Elevations", sub: "Front, rear, side elevations, and sections", alt: "Shopping center elevations and sections" },
    { src: supermarketEventElevations, title: "Supermarket + Event Hall Elevations", sub: "Exterior rhythm and section studies", alt: "Supermarket and event hall elevations and sections" },
  ];

  return (
    <div className="pf">
      <div className="pf-grain" aria-hidden="true" />

      {/* Header */}
      <header className={`pf-site-header${scrolled ? " scrolled" : ""}`}>
        <a className="pf-brand" href="#top" aria-label="Go to homepage">
          <span className="pf-brand-mark">NR</span>
          <span>
            <strong>Nicco John R. Roma</strong>
            <small>Architecture Portfolio</small>
          </span>
        </a>

        <button
          className={`pf-menu-toggle${navOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={navOpen}
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`pf-nav${navOpen ? " is-open" : ""}`}>
          <a href="#work" onClick={closeNav} className={activeSection === "work" ? "active" : ""}>Work</a>
          <a href="#concept" onClick={closeNav} className={activeSection === "concept" ? "active" : ""}>Concept</a>
          <a href="#drawings" onClick={closeNav} className={activeSection === "drawings" ? "active" : ""}>Drawings</a>
          <a href="#details" onClick={closeNav} className={activeSection === "details" ? "active" : ""}>Details</a>
          <a className={`pf-nav-cta${activeSection === "contact" ? " active" : ""}`} href="#contact" onClick={closeNav}>Inquire</a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="pf-hero pf-section-pad">
          <Reveal className="pf-hero-copy">
            <p className="pf-eyebrow">Thesis Project / 2026</p>
            <h1>A Community-Integrated Commercial Complex in Kabankalan City</h1>
            <p className="pf-hero-lead">
              A portfolio-focused digital experience built around architectural imagery,
              spatial storytelling, material language, and the thesis concept of{" "}
              <em>Hugpong</em> — coming together.
            </p>
            <div className="pf-hero-actions">
              <a className="pf-button primary" href="#work">View Project</a>
              <a className="pf-button ghost" href="#drawings">Explore Plans</a>
            </div>
          </Reveal>

          <Reveal className="pf-hero-gallery">
            <figure
              className="pf-hero-card pf-hero-card-large"
              onClick={() => openLightbox(heroFrontFacade, "Front Facade")}
              style={{ margin: 0 }}
            >
              <img src={heroFrontFacade} alt="Commercial complex front facade render" />
              <figcaption>Front Facade</figcaption>
            </figure>
            <figure
              className="pf-hero-card"
              onClick={() => openLightbox(aerialPerspective, "Aerial Perspective")}
              style={{ margin: 0 }}
            >
              <img src={aerialPerspective} alt="Aerial perspective of commercial complex and public plaza" />
              <figcaption>Aerial Perspective</figcaption>
            </figure>
            <figure
              className="pf-hero-card"
              onClick={() => openLightbox(siteDevelopmentPlan, "Site Development Plan")}
              style={{ margin: 0 }}
            >
              <img src={siteDevelopmentPlan} alt="Site development plan showing zones, parking, and community plaza" />
              <figcaption>Site Plan</figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Project Intro */}
        <section className="pf-project-intro pf-section-pad compact" id="work">
          <Reveal className="pf-section-heading">
            <p className="pf-eyebrow">The Work</p>
            <h2>Image-first architectural showcase.</h2>
          </Reveal>
          <Reveal className="pf-intro-grid">
            <div className="pf-intro-statement">
              <p>
                The website is designed to feel like a curated architectural board: wide images,
                quiet typography, precise spacing, and minimal text. The goal is to let the drawings,
                renders, material studies, and spatial planning carry the presentation.
              </p>
            </div>
            <div className="pf-metrics" aria-label="Project highlights">
              <article><strong>5.2 ha</strong><span>Total site area</span></article>
              <article><strong>Kabankalan</strong><span>Negros Occidental</span></article>
              <article><strong>Mixed-use</strong><span>Retail, service, event, public realm</span></article>
              <article><strong>Social</strong><span>Inclusive, adaptive, community-centered</span></article>
            </div>
          </Reveal>
        </section>

        {/* Showcase */}
        <section className="pf-showcase pf-section-pad">
          <div className="pf-showcase-grid">
            <ShowcaseTile
              src={shoppingCenterExterior}
              alt="Shopping center exterior render"
              num="01"
              label="Shopping Center"
              className="tall"
              onClick={() => openLightbox(shoppingCenterExterior, "Shopping Center")}
            />
            <ShowcaseTile
              src={supermarketExterior}
              alt="Supermarket exterior render"
              num="02"
              label="Supermarket"
              onClick={() => openLightbox(supermarketExterior, "Supermarket")}
            />
            <ShowcaseTile
              src={eventHallExterior}
              alt="Event hall exterior render"
              num="03"
              label="Event Hall"
              onClick={() => openLightbox(eventHallExterior, "Event Hall")}
            />
            <ShowcaseTile
              src={aerialPerspective}
              alt="Landscape and public realm aerial render"
              num="04"
              label="Landscape + Public Realm"
              className="wide"
              onClick={() => openLightbox(aerialPerspective, "Landscape and Public Realm")}
            />
          </div>
        </section>

        {/* Concept */}
        <section className="pf-concept pf-section-pad" id="concept">
          <Reveal className="pf-concept-panel">
            <div>
              <p className="pf-eyebrow">Design Concept</p>
              <h2>Hugpong</h2>
            </div>
            <p>
              Hugpong frames the complex as a shared place where commerce, community,
              and culture converge. The visual direction uses warm concrete, wood tones,
              breathable facades, landscaped open space, and human-scale circulation to
              keep the architecture grounded and approachable.
            </p>
          </Reveal>

          <Reveal className="pf-principles-grid">
            <article>
              <span>01</span>
              <h3>Socially Inclusive Design</h3>
              <p>Public-facing spaces support accessibility, gathering, and everyday civic interaction.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Climate Responsive Spaces</h3>
              <p>Shading, arcades, passive ventilation, and landscaped buffers improve comfort.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Flexible Community Use</h3>
              <p>Plazas, events, retail, and seating areas allow the complex to adapt across activities.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Local Material Expression</h3>
              <p>Bamboo-inspired panels, stone, concrete, and warm surfaces build identity and texture.</p>
            </article>
          </Reveal>
        </section>

        {/* Gallery */}
        <section className="pf-gallery-section pf-section-pad" aria-labelledby="gallery-title">
          <Reveal className="pf-section-heading split">
            <div>
              <p className="pf-eyebrow">Visual Gallery</p>
              <h2 id="gallery-title">Renders, interiors, materials, and studies.</h2>
            </div>
            <p>
              Each image opens in a focused lightbox view so the architect/client can inspect details cleanly.
            </p>
          </Reveal>

          <Reveal className="pf-masonry-gallery">
            {galleryItems.map(({ src, label, alt }) => (
              <button
                key={label}
                className="pf-gallery-item"
                onClick={() => openLightbox(src, label)}
              >
                <img src={src} alt={alt} />
                <span>{label}</span>
              </button>
            ))}
          </Reveal>
        </section>

        {/* Drawings */}
        <section className="pf-drawings pf-section-pad" id="drawings">
          <Reveal className="pf-section-heading split">
            <div>
              <p className="pf-eyebrow">Drawings</p>
              <h2>Technical clarity without visual clutter.</h2>
            </div>
            <p>
              Floor plans and elevations are presented as large review cards, not compressed thumbnails.
            </p>
          </Reveal>

          <Reveal className="pf-drawing-stack">
            {drawingCards.map(({ src, title, sub, alt }) => (
              <figure
                key={title}
                className="pf-drawing-card"
                onClick={() => openLightbox(src, title)}
                style={{ margin: 0 }}
              >
                <img src={src} alt={alt} />
                <figcaption>
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </section>

        {/* Details */}
        <section className="pf-details pf-section-pad" id="details">
          <Reveal className="pf-details-layout">
            <div className="pf-details-copy">
              <p className="pf-eyebrow">Project Details</p>
              <h2>Designed for review, presentation, and client confidence.</h2>
              <p>
                The interface keeps everything visual: full-width renders, balanced white space,
                and disciplined labels. It avoids heavy forms and unnecessary input fields so visitors
                focus on the architect's spatial output.
              </p>
            </div>
            <div className="pf-detail-list">
              <article><span>Type</span><strong>Architecture portfolio / project showcase</strong></article>
              <article><span>Sections</span><strong>Hero, Work, Concept, Gallery, Drawings, Contact</strong></article>
              <article><span>Interaction</span><strong>Image lightbox, scroll reveal, responsive navigation</strong></article>
              <article><span>Build</span><strong>React, Tailwind CSS — fast and deployable</strong></article>
            </div>
          </Reveal>
        </section>

        {/* Presentation Boards */}
        <section className="pf-boards pf-section-pad">
          <Reveal className="pf-section-heading split">
            <div>
              <p className="pf-eyebrow">Presentation Boards</p>
              <h2>Original boards preserved.</h2>
            </div>
            <p>Useful for clients who want to review the full architectural panel composition.</p>
          </Reveal>
          <Reveal className="pf-boards-grid">
            <figure
              style={{ margin: 0 }}
              onClick={() => openLightbox(presentationBoard01, "Presentation Board 01")}
            >
              <img src={presentationBoard01} alt="Full presentation board one" />
              <figcaption>Board 01</figcaption>
            </figure>
            <figure
              style={{ margin: 0 }}
              onClick={() => openLightbox(presentationBoard02, "Presentation Board 02")}
            >
              <img src={presentationBoard02} alt="Full presentation board two" />
              <figcaption>Board 02</figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Contact */}
        <section className="pf-section-pad" id="contact">
          <Reveal className="pf-contact-card">
            <p className="pf-eyebrow">Contact</p>
            <h2>Let the work open the conversation.</h2>
            <div className="pf-contact-actions">
              <a className="pf-button primary" href="mailto:niccojohn.roma@lccbonline.edu.ph">niccojohn.roma@lccbonline.edu.ph</a>
              <a className="pf-button ghost" href="tel:+639950581296">+63 995 058 1296</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="pf-footer">
        <p>© {new Date().getFullYear()} Roma ART-Chitech. Architecture Concept.</p>
        <a href="#top">Back to top</a>
      </footer>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="pf-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button
            className="pf-lightbox-close"
            type="button"
            aria-label="Close preview"
            onClick={closeLightbox}
          >
            ×
          </button>
          <img src={lightbox.src} alt={lightbox.title} />
          <p>{lightbox.title}</p>
        </div>
      )}
    </div>
  );
}
