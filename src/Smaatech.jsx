import { useState, useEffect, useRef, useCallback } from 'react'
import './styles.css'
import heroConstruction from './assets/hero-construction.jpg'
import heroLiving from './assets/hero-living.jpg'
import projectHome1 from './assets/project-home-1.jpg'
import projectHome6 from './assets/project-home-6.jpg'
import buildingResidentialFrontElevation from './assets/building/building-residential-front-elevation.jpg'
import interiorFalseCeilingLivingRoom from './assets/interior/interior-false-ceiling-living-room.jpg'
import interiorFalseCeilingDetail from './assets/interior/interior-false-ceiling-detail.jpg'
import interiorModularKitchenMint from './assets/interior/interior-modular-kitchen-mint.jpeg'
import interiorTvUnitWoodPanel from './assets/interior/interior-tv-unit-wood-panel.jpeg'
import interiorWallPanelDisplay from './assets/interior/interior-wall-panel-display.jpeg'
import interiorFloatingTvUnitShelves from './assets/interior/interior-floating-tv-unit-shelves.jpeg'
import interiorBlueModularKitchenPartition from './assets/interior/interior-blue-modular-kitchen-partition.jpeg'
import interiorLivingRoomTvWall from './assets/interior/interior-living-room-tv-wall.jpeg'
import interiorGeometricCeilingChandelier from './assets/interior/interior-geometric-ceiling-chandelier.jpeg'
import interiorModernTvPanelWood from './assets/interior/interior-modern-tv-panel-wood.jpeg'
import interiorGreenCeilingWallPanel from './assets/interior/interior-green-ceiling-wall-panel.jpeg'
import interiorWoodenFeatureWallUnit from './assets/interior/interior-wooden-feature-wall-unit.jpeg'

const COMPANY_URL = 'https://www.smaatechengineering.com/'
const CAREERS_URL = 'https://www.smaatechengineering.com/'
const SOCIAL_LINKS = [
  ['Instagram', COMPANY_URL, 'IG'],
  ['LinkedIn', COMPANY_URL, 'in'],
  ['YouTube', COMPANY_URL, 'YT'],
  ['Facebook', COMPANY_URL, 'f'],
]

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const TICKER_ITEMS = [
  'Building Construction', 'Interior Work', 'Land Sale & Purchase',
  'Independent Home & Villa', 'Premium Interior Design',
  'Building Trust · Creating Futures', 'SmaaTech Engineering Pvt. Ltd.',
  'Bhubaneswar · Odisha',
]

const SERVICES = [
  { n: '01', ico: '🏢', title: 'Building', desc: 'Residential and commercial building construction with quality materials, skilled workforce, and strict quality control at every stage of the project.' },
  { n: '02', ico: '🛋', title: 'Interior Work', desc: 'Complete interior work — false ceiling, flooring, carpentry, painting — all under one roof with premium finishes and timely delivery.' },
  { n: '03', ico: '🤝', title: 'Land Sale & Purchase', desc: 'Trusted land dealing with transparent pricing, legal verification, and expert guidance for residential and commercial plots in Odisha.' },
  { n: '04', ico: '🏡', title: 'Independent Home & Villa', desc: 'Custom-designed independent homes and luxury villas built to your dream specifications — from foundation to final handover.' },
  { n: '05', ico: '✨', title: 'Premium Interior Design', desc: 'High-end interior design for homes, offices, and commercial spaces. Stunning, functional, and timeless interiors that reflect your lifestyle.' },
]

const PROJECTS = [
  { cat: 'Building', label: 'Building · Residential Elevation', title: 'Residential Front Elevation', img: buildingResidentialFrontElevation, wide: true },
  { cat: 'Building', label: 'Building · Bhubaneswar Site', title: 'Residential Site Execution', img: heroConstruction },
  { cat: 'Villa', label: 'Villa · Odisha Home Project', title: 'Independent Villa Development', img: projectHome1 },
  { cat: 'Building', label: 'Building · Home Elevation', title: 'Modern Residential Elevation', img: projectHome6 },
  { cat: 'Interior', label: 'Interior · False Ceiling Work', title: 'Premium False Ceiling Interior', img: interiorFalseCeilingLivingRoom },
  { cat: 'Interior', label: 'Interior · Ceiling Light Detail', title: 'False Ceiling Light Design', img: interiorFalseCeilingDetail },
  { cat: 'Interior', label: 'Interior · Modular Kitchen', title: 'Mint Modular Kitchen Design', img: interiorModularKitchenMint },
  { cat: 'Interior', label: 'Interior · Kitchen Partition', title: 'Blue Modular Kitchen Partition', img: interiorBlueModularKitchenPartition },
  { cat: 'Interior', label: 'Interior · TV Unit Design', title: 'Wood Panel TV Unit Interior', img: interiorTvUnitWoodPanel },
  { cat: 'Interior', label: 'Interior · Floating Shelves', title: 'Floating TV Unit With Shelves', img: interiorFloatingTvUnitShelves },
  { cat: 'Interior', label: 'Interior · Living Room Wall', title: 'Living Room TV Feature Wall', img: interiorLivingRoomTvWall },
  { cat: 'Interior', label: 'Interior · Chandelier Ceiling', title: 'Geometric Ceiling With Chandelier', img: interiorGeometricCeilingChandelier },
  { cat: 'Interior', label: 'Interior · Modern TV Panel', title: 'Modern Wood TV Panel', img: interiorModernTvPanelWood },
  { cat: 'Interior', label: 'Interior · Green Accent Design', title: 'Green Ceiling And Wall Panel', img: interiorGreenCeilingWallPanel },
  { cat: 'Interior', label: 'Interior · Wooden Feature Wall', title: 'Wooden Feature Wall Unit', img: interiorWoodenFeatureWallUnit },
  { cat: 'Interior', label: 'Interior · Wall Panel Display', title: 'Designer Wall Panel Display', img: interiorWallPanelDisplay },
]

const GALLERY = [
  { cls: 'gi tall', src: heroConstruction, lbl: 'On-Site Construction' },
  { cls: 'gi',      src: projectHome6,     lbl: 'Elevation Review'     },
  { cls: 'gi',      src: interiorModularKitchenMint, lbl: 'Modular Kitchen'      },
  { cls: 'gi wide', src: projectHome1,     lbl: 'Villa Development'    },
  { cls: 'gi',      src: interiorFalseCeilingDetail, lbl: 'Ceiling Light Detail' },
]

const STEPS = [
  { n: '01', ico: '💬', title: 'Consultation',      desc: 'We understand your vision, requirement, budget, and timeline in a free detailed consultation session.' },
  { n: '02', ico: '📐', title: 'Design & Planning', desc: 'Detailed drawings, 3D views, material schedule, and transparent cost estimates prepared by our expert team.' },
  { n: '03', ico: '🏗', title: 'Construction',       desc: 'Quality materials, skilled workforce, regular site visits, and progress updates at every milestone.' },
  { n: '04', ico: '🔑', title: 'Handover',           desc: 'Final quality check, documentation, and formal handover — on time, every time. Your dream, delivered.' },
]

const WHY = [
  { ico: '🛡', title: 'Quality You Can Trust',   desc: 'Premium materials and skilled professionals ensure every project meets the highest quality standards without compromise.' },
  { ico: '✅', title: 'Transparent Dealings',    desc: 'No hidden costs, no surprises. Full transparency in pricing, contracts, land documents, and all project updates.' },
  { ico: '⏱', title: 'On Time Delivery',        desc: 'We respect your time. Every SmaaTech project is planned and executed to be delivered on the committed date.' },
  { ico: '😊', title: 'Customer Satisfaction',  desc: 'Our 98% client satisfaction rate speaks for itself. Your happiness is our ultimate goal and greatest achievement.' },
]

const CLIENTS = [
  'Home Construction Clients', 'Interior Work Clients', 'Villa & Independent Home Owners',
  'Land Buyers & Sellers', 'Commercial Space Owners', 'Real Estate Partners',
  'Bhubaneswar Families', 'Odisha Property Clients',
]

const TESTIMONIALS = [
  {
    stars: '★★★★★',
    q: 'The team explained the construction plan clearly, kept the work organized on site, and gave regular updates through each stage of the project.',
    name: 'Residential Client', role: 'Bhubaneswar, Odisha',
    img: projectHome1,
  },
  {
    stars: '★★★★★',
    q: 'For interior work, the material selection, finish quality, and coordination were handled professionally. The space was delivered with a clean, premium look.',
    name: 'Interior Client', role: 'Odisha',
    img: interiorWallPanelDisplay,
  },
  {
    stars: '★★★★★',
    q: 'The land and home consultation was transparent from the first discussion. Budget, timeline, and documentation were discussed without confusion.',
    name: 'Property Client', role: 'Odisha',
    img: projectHome6,
  },
]

const VALUES = [
  { ico: '🛡', lbl: 'Quality',      strong: 'You Can Trust' },
  { ico: '😊', lbl: 'Customer',     strong: 'Satisfaction'  },
  { ico: '✅', lbl: 'Transparent',  strong: 'Dealings'      },
  { ico: '⏱', lbl: 'On Time',      strong: 'Delivery'      },
  { ico: '🏆', lbl: 'Commitment',   strong: 'For Excellence'},
]

const FT_SERVICES  = ['Building Construction','Interior Work','Land Sale & Purchase','Independent Home & Villa','Premium Interior Design']
const FT_COMPANY   = [['#about','About Us'],['#projects','Our Projects'],['#process','Our Process'],['#why','Why Choose Us'],['#testimonials','Testimonials'],[CAREERS_URL,'Careers']]

// ─────────────────────────────────────────
// HOOK — SCROLL REVEAL
// ─────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─────────────────────────────────────────
// PRELOADER
// ─────────────────────────────────────────
function Preloader({ hide }) {
  return (
    <div className={`pl${hide ? ' hide' : ''}`}>
      <div className="pl-logo">Smaa<span>Tech</span></div>
      <div className="pl-bar"><div className="pl-fill" /></div>
      <div className="pl-sub">Building Trust · Creating Futures</div>
    </div>
  )
}

// ─────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────
function Navbar({ stuck }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const NAV = [['#about','About'],['#services','Services'],['#projects','Projects'],['#process','Process'],['#contact','Contact']]
  return (
    <nav className={`nav${stuck ? ' sk' : ''}`}>
      <div className="nav-in">
        <a href="#hero" className="nav-logo" onClick={close}>
          Smaa<span>Tech</span><em>Infra &amp; Developer</em>
        </a>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a href="#contact" className="ncta" onClick={close}>Get Quote</a>
        </div>
        <button
          className={`hbg${open ? ' open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────
// HERO
// ─────────────────────────────────────────
function Hero() {
  return (
    <section id="hero">
      <div className="h-bg" />
      <div className="h-ov" />
      <div className="h-lines" />
      <div className="h-c">
        <div className="hpill">A Unit of SmaaTech Engineering Pvt. Ltd.</div>
        <h1 className="hh1">Build Smarter<br /><em>With SmaaTech</em></h1>
        <p className="h-sub">Infra &amp; Developer</p>
        <p className="hp">
          Modern construction, premium interiors, land solutions and villa projects
          delivered with clear planning, quality execution and on-time handover.
        </p>
        <div className="hbs">
          <a href="#services" className="btn-g">Our Services ↗</a>
          <a href="#contact" className="hero-outline">Get a Free Quote</a>
        </div>
        <div className="h-contact">
          <a href="tel:7608061738">📞 7608061738</a>
          <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer">smaatechengineering.com</a>
        </div>
      </div>
      <div className="h-visual" aria-hidden="true">
        <div className="hero-photo-card hero-photo-main">
          <img src={heroConstruction} alt="" decoding="async" fetchPriority="high" />
          <div className="hero-photo-tag">Live Site Execution</div>
        </div>
        <div className="hero-photo-card hero-photo-top">
          <img src={interiorFalseCeilingLivingRoom} alt="" decoding="async" />
        </div>
        <div className="hero-photo-card hero-photo-bottom">
          <img src={heroLiving} alt="" decoding="async" />
        </div>
        <div className="hero-chip chip-a">
          <strong>250+</strong>
          <span>Projects</span>
        </div>
        <div className="hero-chip chip-b">
          <strong>98%</strong>
          <span>Client Satisfaction</span>
        </div>
      </div>
      <div className="h-scroll" aria-hidden="true">Scroll</div>
    </section>
  )
}

// ─────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div id="ticker" aria-hidden="true">
      <div className="tkt">
        {doubled.map((t, i) => <span key={i} className="tki">{t}</span>)}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// VALUES BAR
// ─────────────────────────────────────────
function ValuesBar() {
  return (
    <div id="vbar">
      <div className="vb-grid">
        {VALUES.map((v, i) => (
          <div key={i} className={`vbi rv d${Math.min(i, 3)}`}>
            <span className="vbi-ico">{v.ico}</span>
            <div className="vbi-txt">
              {v.lbl}<br />
              <strong>{v.strong}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// STATS
// ─────────────────────────────────────────
function Stats() {
  const targets  = [250, 15, 80, 98]
  const suffixes = ['+', '+', '+', '%']
  const labels   = ['Projects Completed', 'Years of Excellence', 'Expert Team Members', 'Client Satisfaction']
  const icons    = ['🏗', '🏅', '👷', '⭐']
  const [vals, setVals] = useState([0, 0, 0, 0])
  const ran = useRef(false)

  useEffect(() => {
    const el = document.getElementById('stats')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true
        targets.forEach((tgt, i) => {
          const dur = 2000, fps = 60, frames = Math.round(dur / (1000 / fps))
          let frame = 0
          const timer = setInterval(() => {
            frame++
            const ease = 1 - Math.pow(1 - frame / frames, 3)
            setVals(v => { const n = [...v]; n[i] = Math.round(ease * tgt); return n })
            if (frame >= frames) {
              setVals(v => { const n = [...v]; n[i] = tgt; return n })
              clearInterval(timer)
            }
          }, 1000 / fps)
        })
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="stats">
      <div className="stats-g">
        {targets.map((_, i) => (
          <div key={i} className={`sb rv d${i}`}>
            <div className="si">{icons[i]}</div>
            <div className="sn">{vals[i]}{suffixes[i]}</div>
            <div className="sl">{labels[i]}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────
function About() {
  return (
    <section id="about" className="sp">
      <div className="container">
        <div className="ab-grid">

          {/* Images */}
          <div className="ab-imgs rv rl">
            <img className="ai1" src={projectHome1} alt="SmaaTech luxury villa project" loading="lazy" decoding="async" />
            <img className="ai2" src={interiorWallPanelDisplay} alt="Premium interior design" loading="lazy" decoding="async" />
            <div className="abadge">
              <div className="abn">15+</div>
              <div className="abt">Years of<br />Excellence</div>
            </div>
          </div>

          {/* Text */}
          <div className="rv rr">
            <span className="rule" />
            <span className="lbl">About SmaaTech</span>
            <h2 className="ttl">Building Trust.<br />Creating Futures.</h2>
            <p style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '.88rem', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '14px' }}>
              A Unit of SmaaTech Engineering Pvt. Ltd.
            </p>
            <p className="sub">
              SmaaTech Infra &amp; Developer is Bhubaneswar's trusted name in building construction,
              interior design, and real estate. We transform your dreams into reality with quality,
              integrity, and excellence — delivering on time, every time.
            </p>
            <div className="abl">
              {[
                'Expert building construction for residential and commercial projects across Odisha.',
                'Premium interior design and complete interior work tailored to your taste and budget.',
                'Land sale & purchase with transparent dealings and full legal guidance.',
                'Custom independent homes and luxury villas built to your exact vision.',
              ].map((t, i) => <div key={i} className="abli">{t}</div>)}
            </div>
            <div className="abbs">
              <a href="#services" className="btn-g">Our Services</a>
              <a href="tel:7608061738" className="btn-o">📞 Call Now</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="sp">
      <div className="container">
        <div className="sh c">
          <span className="rule" />
          <span className="lbl">We Make</span>
          <h2 className="ttl">Our Core Services</h2>
          <p className="sub">Complete real estate and infrastructure solutions under one roof — from construction to interior to land.</p>
        </div>
        <div className="svc-g">
          {SERVICES.map((s, i) => (
            <div key={i} className={`svc rv d${i % 3}`}>
              <div className="svn">{s.n}</div>
              <div className="svico">{s.ico}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#contact" className="svlnk">Get a Quote →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const cats = ['all', 'Building', 'Interior', 'Villa']
  const visible = filter === 'all'
    ? cats.slice(1).map(cat => PROJECTS.find(p => p.cat === cat)).filter(Boolean)
    : PROJECTS.filter(p => p.cat === filter)

  return (
    <section id="projects" className="sp">
      <div className="container">
        <div className="pj-hd">
          <div>
            <span className="rule" />
            <span className="lbl">Work Showcase</span>
            <h2 className="ttl" style={{ marginBottom: 0 }}>SmaaTech Project Work</h2>
          </div>
          <div className="fb">
            {cats.map(c => (
              <button
                key={c}
                className={`fbn${filter === c ? ' a' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>
        </div>
        <div className="pj-g">
          {visible.map((p, i) => (
            <button
              key={`${p.title}-${i}`}
              type="button"
              className={`pc${p.wide ? ' wide' : ''}`}
              onClick={() => setActive(p)}
              aria-label={`Open ${p.title} project image`}
            >
              <img src={p.img} alt={p.title} loading="lazy" decoding="async" />
              <div className="pov">
                <div className="pjcat">{p.label}</div>
                <h4>{p.title}</h4>
                <span className="pview">View Image</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {active && (
        <div className="pmodal" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <div className="pmodal-in" onClick={e => e.stopPropagation()}>
            <button type="button" className="pmodal-close" onClick={() => setActive(null)} aria-label="Close project image">Close</button>
            <img src={active.img} alt={active.title} decoding="async" />
            <div className="pmodal-cap">
              <span>{active.label}</span>
              <h3>{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="sp">
      <div className="container">
        <div className="sh c">
          <span className="rule" />
          <span className="lbl">Site & Interior Gallery</span>
          <h2 className="ttl">Project Execution Moments</h2>
          <p className="sub">Construction, elevation, villa and interior visuals from the current SmaaTech website assets.</p>
        </div>
      </div>
      <div className="gg">
        {GALLERY.map((g, i) => (
          <div key={i} className={`${g.cls} rv`}>
            <img src={g.src} alt={g.lbl} loading="lazy" decoding="async" />
            <div className="glbl">{g.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// VIDEO SECTION
// ─────────────────────────────────────────
function VideoSection() {
  return (
    <section id="vid">
      <div className="v-bg">
        <img src={heroConstruction} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="v-ov" />
      <div className="v-c">
        <a
          className="pbtn"
          href={COMPANY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit SmaaTech Engineering website"
        >
          ▶
        </a>
        <h3>Visit SmaaTech Engineering</h3>
        <p>Explore the official company website for more details about our work and services.</p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────
function Process() {
  return (
    <section id="process" className="sp">
      <div className="container">
        <div className="sh c">
          <span className="rule" />
          <span className="lbl">How We Work</span>
          <h2 className="ttl">Our Build Process</h2>
          <p className="sub">A transparent 4-step approach ensuring quality, precision, and on-time delivery.</p>
        </div>
        <div className="prg">
          {STEPS.map((s, i) => (
            <div key={i} className={`prs rv d${i}`}>
              {i < 3 && <div className="praro">→</div>}
              <div className="prn">{s.n}</div>
              <div className="prico">{s.ico}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// WHY CHOOSE US
// ─────────────────────────────────────────
function Why() {
  return (
    <section id="why" className="sp">
      <div className="container">
        <div className="sh c">
          <span className="rule" />
          <span className="lbl">Our Edge</span>
          <h2 className="ttl">Why Choose SmaaTech</h2>
          <p className="sub">The pillars that make us Bhubaneswar's most trusted infra &amp; developer company.</p>
        </div>
        <div className="wyg">
          {WHY.map((w, i) => (
            <div key={i} className={`wyc rv ${i % 2 === 0 ? 'rl' : 'rr'}`}>
              <div className="wyico">{w.ico}</div>
              <div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// CLIENTS
// ─────────────────────────────────────────
function Clients() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <section id="clients">
      <div className="container">
        <p className="clt">Serving homeowners, property clients, interior customers and developers across Odisha</p>
      </div>
      <div className="clw">
        <div className="cltr">
          {doubled.map((c, i) => <span key={i} className="cllo">{c}</span>)}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────
function Testimonials() {
  const [cur, setCur]   = useState(0)
  const autoRef         = useRef(null)
  const touchStart      = useRef(0)

  const goTo = useCallback(i => setCur(((i % 3) + 3) % 3), [])

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setCur(c => (c + 1) % 3), 5000)
  }, [])

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current) }, [startAuto])

  const handleDot = i => { clearInterval(autoRef.current); goTo(i); startAuto() }

  return (
    <section id="testimonials" className="sp">
      <div className="container">
        <div className="sh c rv">
          <span className="rule" />
          <span className="lbl">Client Feedback</span>
          <h2 className="ttl">Service Experience</h2>
          <p className="sub">Anonymized feedback themes focused on planning clarity, work quality and transparent coordination.</p>
        </div>

        <div
          className="twr"
          onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const diff = touchStart.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) { clearInterval(autoRef.current); goTo(diff > 0 ? cur + 1 : cur - 1); startAuto() }
          }}
        >
          <div className="ttr" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tsl">
                <div className="tin">
                  <div className="tst">{t.stars}</div>
                  <p className="tq">{t.q}</p>
                  <div className="tau">
                    <img className="tav" src={t.img} alt={t.name} loading="lazy" decoding="async" />
                    <div>
                      <div className="tnm">{t.name}</div>
                      <div className="tro">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tdt">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`tdot${cur === i ? ' a' : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────
const CONTACT_INFO = [
  { ico: '📍', lbl: 'Address',      val: 'Bhubaneswar, Odisha' },
  { ico: '📞', lbl: 'Phone',        val: <a href="tel:7608061738" style={{ color: 'inherit', fontWeight: 700 }}>7608061738</a> },
  { ico: '✉',  lbl: 'Email',        val: <a href="mailto:Info@smaatechengineering.com" style={{ color: 'inherit' }}>Info@smaatechengineering.com</a> },
  { ico: '🌐', lbl: 'Website',      val: <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>www.smaatechengineering.com</a> },
  { ico: '⏰', lbl: 'Working Hours', val: <span>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: By Appointment Only</span> },
]

const EMPTY_FORM = { name: '', phone: '', email: '', service: '', details: '' }

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [msg,  setMsg]  = useState({ text: '', type: '' })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service) {
      setMsg({ text: '⚠ Please fill all required fields.', type: 'err' })
      setTimeout(() => setMsg({ text: '', type: '' }), 4000)
      return
    }
    setMsg({ text: '✓ Thank you! We will contact you within 24 hours.', type: 'ok' })
    setForm(EMPTY_FORM)
    setTimeout(() => setMsg({ text: '', type: '' }), 7000)
  }

  const handleWhatsAppSubmit = e => {
    e.preventDefault()
    const clean = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service.trim(),
      details: form.details.trim(),
    }

    if (!clean.name || !clean.phone || !clean.service) {
      setMsg({ text: 'Please fill all required fields.', type: 'err' })
      setTimeout(() => setMsg({ text: '', type: '' }), 4000)
      return
    }

    const enquiry = [
      'New SmaaTech enquiry',
      `Name: ${clean.name}`,
      `Phone: ${clean.phone}`,
      clean.email ? `Email: ${clean.email}` : '',
      `Service: ${clean.service}`,
      clean.details ? `Details: ${clean.details}` : '',
    ].filter(Boolean).join('\n')

    const whatsappUrl = `https://wa.me/917608061738?text=${encodeURIComponent(enquiry)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setMsg({ text: 'Enquiry is ready on WhatsApp. Please tap Send to share it with us.', type: 'ok' })
    setForm(EMPTY_FORM)
    setTimeout(() => setMsg({ text: '', type: '' }), 7000)
  }

  return (
    <section id="contact" className="sp">
      <div className="container">
        <div className="sh">
          <span className="rule" />
          <span className="lbl">Get In Touch</span>
          <h2 className="ttl">Start Your Dream Project</h2>
          <p className="sub">Free consultation · Transparent pricing · On-time delivery. Call us today!</p>
        </div>

        <div className="cong">
          {/* Contact info */}
          <div>
            {CONTACT_INFO.map((r, i) => (
              <div key={i} className={`cir rv rl d${Math.min(i, 3)}`}>
                <div className="cico">{r.ico}</div>
                <div>
                  <div className="cilbl">{r.lbl}</div>
                  <div className="cival">{r.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleWhatsAppSubmit} noValidate>
              <div className="cof-g">
                <div className="fg rv">
                  <label htmlFor="f-name">Full Name *</label>
                  <input id="f-name" type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div className="fg rv d1">
                  <label htmlFor="f-phone">Phone *</label>
                  <input id="f-phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                </div>
                <div className="fg rv d2">
                  <label htmlFor="f-email">Email Address</label>
                  <input id="f-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="fg rv d3">
                  <label htmlFor="f-svc">Service Required *</label>
                  <select id="f-svc" value={form.service} onChange={e => set('service', e.target.value)} required>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="fg full rv">
                  <label htmlFor="f-det">Project Details</label>
                  <textarea id="f-det" placeholder="Tell us about your project — type, size, location, budget..." value={form.details} onChange={e => set('details', e.target.value)} />
                </div>
                <div className="full">
                  <button type="submit" className="btn-g" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '.9rem' }}>
                    Send Enquiry →
                  </button>
                  <a
                    className="mail-fallback"
                    href="mailto:Info@smaatechengineering.com?subject=SmaaTech%20Project%20Enquiry"
                  >
                    Prefer email? Send enquiry by mail
                  </a>
                  {msg.text && (
                    <div className={`fsuc show${msg.type === 'err' ? ' err' : ''}`}>{msg.text}</div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// MAP STRIP
// ─────────────────────────────────────────
function MapStrip() {
  return (
    <div id="mstr">
      <img
        src={projectHome6}
        alt="SmaaTech Infra & Developer — Bhubaneswar, Odisha"
        loading="lazy"
        decoding="async"
      />
      <div className="mpin">SmaaTech Infra &amp; Developer, Bhubaneswar, Odisha</div>
    </div>
  )
}

// ─────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────
function Footer() {
  return (
    <footer id="ft">
      <div className="container">
        <div className="ftg">

          {/* Brand */}
          <div>
            <div className="ftl">Smaa<span>Tech</span></div>
            <div className="ft-sub">Infra &amp; Developer</div>
            <p className="fttg">A unit of SmaaTech Engineering Pvt. Ltd.<br />Building Trust. Creating Futures.</p>
            <div className="fts">
              {SOCIAL_LINKS.map(([label, href, text]) => (
                <a key={label} href={href} className="fsa" aria-label={label} target="_blank" rel="noopener noreferrer">{text}</a>
              ))}
              <a href="https://wa.me/917608061738" className="fsa" aria-label="WhatsApp">💬</a>
            </div>
          </div>

          {/* Services */}
          <div className="ftc">
            <h4>Services</h4>
            <ul>{FT_SERVICES.map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
          </div>

          {/* Company */}
          <div className="ftc">
            <h4>Company</h4>
            <ul>
              {FT_COMPANY.map(([href, lbl]) => {
                const external = href.startsWith('http')
                return (
                  <li key={lbl}>
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{lbl}</a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="ftc">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:7608061738">📞 7608061738</a></li>
              <li><a href="mailto:Info@smaatechengineering.com">Info@smaatechengineering.com</a></li>
              <li><a href={COMPANY_URL} target="_blank" rel="noopener noreferrer">www.smaatechengineering.com</a></li>
              <li><a href="#mstr">Bhubaneswar, Odisha</a></li>
              <li><a href="#contact">Get a Free Quote</a></li>
            </ul>
          </div>

        </div>

        <div className="ftb">
          <span>© 2024 SmaaTech Engineering Pvt. Ltd. All rights reserved.</span>
          <div className="crts">
            <span className="crt">Quality You Can Trust</span>
            <span className="crt">On Time Delivery</span>
            <span className="crt">Transparent Dealings</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────
function BackToTop({ vis }) {
  return (
    <button
      id="btt"
      className={vis ? 'vis' : ''}
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  )
}

// ─────────────────────────────────────────
// WHATSAPP FLOAT
// ─────────────────────────────────────────
function WhatsApp() {
  return (
    <a
      id="wa"
      href="https://wa.me/917608061738?text=Hi%20SmaaTech!%20I%27m%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SmaaTech on WhatsApp"
    >
      <span className="watip">Chat with us on WhatsApp</span>
      💬
    </a>
  )
}

// ─────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────
export default function SmaaTech() {
  const [plHide,   setPlHide]   = useState(false)
  const [navStuck, setNavStuck] = useState(false)
  const [bttVis,   setBttVis]   = useState(false)

  // Activate scroll reveal
  useReveal()

  // Preloader — hide after 2.2s (fallback 3.6s)
  useEffect(() => {
    const t1 = setTimeout(() => setPlHide(true), 2200)
    const t2 = setTimeout(() => setPlHide(true), 3600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Scroll listener — nav + back-to-top
  useEffect(() => {
    const onScroll = () => {
      setNavStuck(window.scrollY > 60)
      setBttVis(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Preloader hide={plHide} />
      <Navbar stuck={navStuck} />
      <Hero />
      <Ticker />
      <ValuesBar />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Gallery />
      <VideoSection />
      <Process />
      <Why />
      <Clients />
      <Testimonials />
      <Contact />
      <MapStrip />
      <Footer />
      <BackToTop vis={bttVis} />
      <WhatsApp />
    </>
  )
}
