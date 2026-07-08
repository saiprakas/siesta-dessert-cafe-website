import { useEffect, useState } from "react";
import { SITE } from "./siteConfig.js";
import Reveal from "./components/Reveal.jsx";
import { Icon } from "./components/Icons.jsx";
import "./styles/home.css";

/* The website is FULLY STATIC — cafe info comes straight from
   this build, no backend reads or writes. To change website
   text (phone, hours, address), edit src/data/menuData.js and
   rebuild. The QR menu is the live, ops-managed experience. */

/* Food photography only — no cafe/interior/location shots (by
   request). No prices, no menu links: the QR menu on the table
   is a separate experience. Every image falls back to a drawn
   art panel if it fails. */
const SHOWCASE = [
  {
    icon: "cake",
    img: "./images/cakes.jpg",
    tag: "Artisan Cakes",
    title: "Cakes Worth Celebrating",
    text: "From classic chocolate to red velvet and tiramisu — baked fresh, frosted by hand, made for your moments."
  },
  {
    icon: "waffle",
    img: "./images/waffles.jpg",
    tag: "Belgian Waffles",
    title: "Waffles, Pressed to Order",
    text: "Golden and crisp outside, soft inside — crowned with chocolate, berries, Biscoff and everything nice."
  },
  {
    icon: "cupcake",
    img: "./images/signature-dessert.jpg",
    tag: "Signature Desserts",
    title: "Handcrafted Indulgence",
    text: "Tres leches, Biscoff cheesecake, fudgy brownies and our signature delights — crafted in small batches daily."
  },
  {
    icon: "pizza",
    img: "./images/pizzas.jpg",
    tag: "Fresh & Cheesy",
    title: "Wood-Fired Style Pizzas",
    text: "Hand-stretched and loaded with cheese and fresh veggies — baked bubbling, golden and 100% vegetarian."
  },
  {
    icon: "burger",
    img: "./images/burgers.jpg",
    tag: "Loaded & Juicy",
    title: "Burgers Stacked Right",
    text: "Crispy veg patties, melty cheese and house-made sauces in a toasted bun — comfort you can hold."
  },
  {
    icon: "sandwich",
    img: "./images/sandwiches.jpg",
    tag: "Grilled Fresh",
    title: "Sandwiches, Warm & Melty",
    text: "Grilled paninis, cheesy clubs and veggie stacks — pressed golden and served piping hot."
  },
  {
    icon: "pasta",
    img: "./images/pastas.jpg",
    tag: "Creamy & Cheesy",
    title: "Pastas Done Right",
    text: "Silky Alfredo, tangy arrabbiata and cheesy bakes — twirled fresh to order, always vegetarian."
  },
  {
    icon: "shake",
    img: "./images/shakes.jpg",
    tag: "Thick & Dreamy",
    title: "Shakes & Thickshakes",
    text: "Blended thick, topped generously, served ice-cold — from Belgian chocolate to Nutella latte."
  },
  {
    icon: "noodles",
    img: "./images/maggie.jpg",
    tag: "Comfort Bowls",
    title: "Café-Style Maggie & More",
    text: "From classic masala to Korean-style and cheesy paneer — 20 ways to relive your favourite comfort food."
  }
];

/* Food image with graceful fallback to a drawn art panel */
function FoodImg({ src, icon, alt, iconSize = 64, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`artwrap ${className}`.trim()}>
        <Icon name={icon} size={iconSize} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Branded loading screen — shown until the page has fully
  // loaded (helps on slow connections).
  useEffect(() => {
    const done = () => setTimeout(() => setBooted(true), 400);
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
  }, []);

  if (!booted) {
    return (
      <div className="loader-screen">
        <div className="script">Siesta</div>
        <div className="bar"><i /></div>
        <p className="loader-note">brewing something sweet…</p>
      </div>
    );
  }

  const s = SITE;
  const waLink = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent("Hi Siesta! I'd like to place an order.")}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`;
  const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapQuery)}`;
  const igLink = `https://instagram.com/${s.instagram}`;

  const navLinks = (
    <>
      <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
      <a href="#showcase" onClick={() => setMenuOpen(false)}>Our World</a>
      <a href="#visit" onClick={() => setMenuOpen(false)}>Visit Us</a>
      <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Contact Us</a>
    </>
  );

  return (
    <div className="home-page fade-in">
      {s.announcement && <div className="announce show">✦ {s.announcement} ✦</div>}

      {/* ---------- NAV ---------- */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a className="brand" href="#top">
            <span className="script">Siesta</span>
            <small>Dessert Cafe</small>
          </a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>{navLinks}</div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header className="hero" id="top">
        <div className="hero-fx" aria-hidden="true">
          <i className="blob b1" />
          <i className="blob b2" />
          <span className="spark s1">✦</span>
          <span className="spark s2">✦</span>
          <span className="spark s3">✦</span>
          <span className="spark s4">✦</span>
          <span className="spark s5">✦</span>
          <span className="spark s6">✦</span>
        </div>
        <div className="container hero-grid">
          <div>
            <span className="hero-eyebrow">Vijayawada's Cosiest Dessert Cafe</span>
            <h1>
              Life is short,<br />
              make it <span className="script">sweet</span>.
            </h1>
            <p className="lead">
              Artisan cakes, Belgian waffles, thick shakes and comfort food — 100% pure veg,
              handcrafted fresh every single day. {s.tagline}.
            </p>
            <div className="hero-actions">
              <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-gold">Order on WhatsApp</a>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="btn btn-ghost">Call Us</a>
            </div>
            <div className="veg-chip">
              <span className="veg-badge" /> 100% PURE VEGETARIAN
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-frame">
              <FoodImg
                src="./images/hero-cake.jpg"
                icon="cake"
                iconSize={110}
                alt="Freshly baked celebration cake at Siesta"
                className="hero-img"
              />
              <span className="hero-tag"><Icon name="sparkles" size={13} /> 100% Veg</span>
            </div>
            <div className="hero-mini">
              <FoodImg
                src="./images/waffles.jpg"
                icon="waffle"
                iconSize={40}
                alt="Belgian waffle at Siesta"
                className="hero-mini-img"
              />
            </div>
            <div className="hero-badge">
              <Icon name="cake" size={26} className="gold-ic" />
              <div>
                <b>Freshly Baked</b>
                <span>every morning</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">Scroll<i /></div>
      </header>

      {/* ---------- MARQUEE ---------- */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              Sweet Moments <span /> Warm Memories <span /> Just a Siesta Away <span /> 100% Vegetarian <span /> Handcrafted Daily <span />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- ABOUT ---------- */}
      <section className="about" id="about">
        <div className="container about-grid">
          <Reveal className="about-art">
            <div className="about-photo">
              <FoodImg
                src="./images/about-brownie.jpg"
                icon="cake"
                iconSize={80}
                alt="Freshly baked treats at Siesta"
                className="about-main"
              />
            </div>
            <div className="stamp">
              <b>Siesta</b>
              est. 2026
            </div>
          </Reveal>
          <Reveal delay={1} className="about-copy">
            <span className="kicker">Our Story</span>
            <h2>Where Every Bite Feels Like a Warm Hug</h2>
            <p>{s.about}</p>
            <div className="about-stats">
              <div><b>100%</b><span>Pure Veg</span></div>
              <div><b>75+</b><span>Handcrafted Items</span></div>
              <div><b>10–11</b><span>Open Every Day</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SHOWCASE (food photos, no prices) ---------- */}
      <section className="showcase" id="showcase">
        <div className="container">
          <Reveal className="sec-head">
            <span className="kicker">A Peek Into Our World</span>
            <h2>Nine Reasons to Treat Yourself Today</h2>
            <p>Everything here is made in small batches, the slow way — because shortcuts never tasted this good. Visit us and scan the QR at your table for the full menu with today's specials.</p>
            <div className="divider">✦</div>
          </Reveal>
          <div className="show-grid">
            {SHOWCASE.map((c, i) => (
              <Reveal key={c.tag} delay={(i % 3) + 1} className="show-card">
                <div className="imgwrap">
                  <FoodImg src={c.img} icon={c.icon} alt={c.title} />
                  <span className="tagline">{c.tag}</span>
                </div>
                <div className="body">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className="show-wide">
              <div className="imgwrap wide-img">
                <FoodImg
                  src="./images/hero-cake.jpg"
                  icon="cake"
                  iconSize={90}
                  alt="Celebration cake from Siesta"
                />
              </div>
              <div className="body">
                <span className="script">book cakes with us</span>
                <h3>Custom Cakes for Every Celebration</h3>
                <p>
                  Birthdays, anniversaries, little wins — book your celebration cake with us and we'll bake
                  it fresh for your big moment. For bookings, simply call or WhatsApp us on {s.phone}.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="btn btn-gold">Call to Book</a>
                  <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-ghost light">WhatsApp Us</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- QUOTE BAND ---------- */}
      <section className="quote-band">
        <div className="container">
          <Reveal>
            <span className="q-mark">“</span>
            <div className="quote-rotator">
              <p className="q q1">Life is short. Eat dessert first.</p>
              <p className="q q2">Stressed spelled backwards is desserts.</p>
              <p className="q q3">Every sweet moment deserves a warm memory.</p>
            </div>
            <div className="q-caption">
              <Icon name="sparkles" size={14} /> words we live by, at Siesta <Icon name="sparkles" size={14} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- QR BANNER (info only — the menu opens via table QR) ---------- */}
      <section className="qr-banner">
        <div className="container">
          <Reveal>
            <span className="script">hungry already?</span>
            <h2>The Full Menu Lives on Your Table</h2>
            <p>
              Pull up a chair, scan the QR at your table, and explore every dish — today's specials,
              chef's favourites and what's fresh right now. Craving something before you visit? We're one tap away.
            </p>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-gold">Order on WhatsApp</a>
          </Reveal>
        </div>
      </section>

      {/* ---------- VISIT ---------- */}
      <section id="visit">
        <div className="container">
          <Reveal className="sec-head">
            <span className="kicker">Find Us</span>
            <h2>Come, Take a Siesta</h2>
            <p>Tucked into Satyanarayana Puram — follow the smell of fresh bakes.</p>
            <div className="divider">✦</div>
          </Reveal>
          <div className="visit-grid">
            <Reveal className="visit-card">
              <div className="visit-item">
                <div className="ic"><Icon name="pin" size={21} /></div>
                <div>
                  <b>Our Address</b>
                  <p>{s.address}</p>
                </div>
              </div>
              <div className="visit-item">
                <div className="ic"><Icon name="clock" size={21} /></div>
                <div>
                  <b>Opening Hours</b>
                  {s.hours.map((h, i) => (
                    <p key={i}>{h.label}: <strong>{h.time}</strong></p>
                  ))}
                </div>
              </div>
              <div className="visit-item">
                <div className="ic"><Icon name="phone" size={20} /></div>
                <div>
                  <b>Call Us</b>
                  <a className="link" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>
                </div>
              </div>
              <div className="visit-item">
                <div className="ic"><Icon name="chat" size={20} /></div>
                <div>
                  <b>Order on WhatsApp</b>
                  <a className="link" href={waLink} target="_blank" rel="noreferrer">{s.phone}</a>
                </div>
              </div>
              <div className="visit-item">
                <div className="ic"><Icon name="instagram" size={20} /></div>
                <div>
                  <b>Instagram</b>
                  <a className="link" href={igLink} target="_blank" rel="noreferrer">@{s.instagram}</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="map-wrap">
                <iframe title="Siesta Dessert Cafe on Google Maps" src={mapEmbed} allowFullScreen loading="lazy" />
              </div>
              <div className="map-actions">
                <a className="btn btn-gold" href={mapDirections} target="_blank" rel="noreferrer">Get Directions</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT (static — no forms, no backend) ---------- */}
      <section className="callback" id="contact">
        <div className="container">
          <Reveal className="sec-head">
            <span className="kicker">we're one tap away</span>
            <h2>For Orders & Enquiries</h2>
            <p>
              A celebration cake, a party booking or today's craving — just call or WhatsApp us
              and we'll take care of the sweet part.
            </p>
            <div className="divider">✦</div>
          </Reveal>
          <Reveal className="cb-card">
            <div className="contact-list">
              <a className="c-row" href={waLink} target="_blank" rel="noreferrer">
                <span className="cr-ic wa"><Icon name="chat" size={21} /></span>
                <span className="cr-tx"><b>Order on WhatsApp</b><small>Opens your WhatsApp chat with us · {s.phone}</small></span>
                <span className="cr-arrow">→</span>
              </a>
              <a className="c-row" href={`tel:${s.phone.replace(/\s/g, "")}`}>
                <span className="cr-ic"><Icon name="phone" size={19} /></span>
                <span className="cr-tx"><b>Call Us Directly</b><small>{s.phone}</small></span>
                <span className="cr-arrow">→</span>
              </a>
              <a className="c-row" href={igLink} target="_blank" rel="noreferrer">
                <span className="cr-ic"><Icon name="instagram" size={19} /></span>
                <span className="cr-tx"><b>Follow on Instagram</b><small>@{s.instagram}</small></span>
                <span className="cr-arrow">→</span>
              </a>
            </div>
            <p className="cb-note">
              <span className="veg-badge" style={{ verticalAlign: "-2px", marginRight: 6 }} />
              100% pure vegetarian · {s.hours[0]?.label}, {s.hours[0]?.time}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer>
        <div className="container">
          <div className="foot-grid">
            <div className="foot-brand">
              <span className="script">Siesta</span>
              <small>Dessert Cafe</small>
              <p>{s.tagline}</p>
              <div className="socials">
                <a href={igLink} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
                <a href={waLink} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="chat" size={18} /></a>
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} aria-label="Call"><Icon name="phone" size={17} /></a>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#showcase">Our World</a></li>
                <li><a href="#visit">Find Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul>
                <li>{s.address}</li>
                {s.hours.map((h, i) => (
                  <li key={i}>{h.label}: {h.time}</li>
                ))}
                <li><a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Siesta Dessert Cafe, Vijayawada. All rights reserved.</span>
            <span>Made with 💛 in Vijayawada</span>
          </div>
        </div>
      </footer>

      {/* ---------- FLOATING BUTTONS ---------- */}
      <div className="float-btns">
        <a className="float-wa" href={waLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <Icon name="chat" size={24} />
        </a>
        <a className="float-call" href={`tel:${s.phone.replace(/\s/g, "")}`} aria-label="Call">
          <Icon name="phone" size={22} />
        </a>
      </div>
    </div>
  );
}
