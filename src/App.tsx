import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, Leaf, MapPin, House, Trees, ShieldCheck, MessageCircle, Maximize2 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from './lib/supabase'

gsap.registerPlugin(ScrollTrigger)

type Project = { id: string; name: string; location: string; category: string; description: string; cover: string; gallery: string[]; }
const projects: Project[] = [
  {
    id: 'maitama', name: 'Ollic Residences', location: 'Maitama, Abuja', category: 'Premium apartments',
    description: 'A contemporary apartment concept defined by sculpted balconies, generous glazing and considered shared amenities.',
    cover: '/projects/maitama/01-residences-warm.jpeg',
    gallery: [
      '/projects/maitama/01-residences-warm.jpeg', '/projects/maitama/02-residences-front.jpeg', '/projects/maitama/03-residences-angle.jpeg',
      '/projects/maitama/04-site-plan.jpeg', '/projects/maitama/05-floor-plan.jpeg', '/projects/maitama/06-detail.jpeg',
    ],
  },
  {
    id: 'the-grove', name: 'The Grove', location: 'Centenary City, Abuja', category: 'Luxury residences',
    description: 'A landscaped residential enclave with modern duplex architecture, considered streetscapes and a distinctive entrance experience.',
    cover: '/projects/the-grove/03-entrance.jpeg',
    gallery: [
      '/projects/the-grove/03-entrance.jpeg', '/projects/the-grove/01-residences.jpeg', '/projects/the-grove/02-residences.jpeg',
      '/projects/the-grove/04-aerial-masterplan.jpeg', '/projects/the-grove/05-street.jpeg', '/projects/the-grove/06-entrance.jpeg',
    ],
  },
]

export default function App() {
  const root = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', interest: 'Ollic Residences — Maitama, Abuja', message: '' })
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState('')
  const project = projects[selected]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.hero-image', { scale: 1.08, duration: 1.5, ease: 'power2.out' })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.from(el, {
        y: 26, opacity: 0, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }))
    }, root)
    return () => ctx.revert()
  }, [])

  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, '')
  const whatsappUrl = (message: string) => whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`

  async function submitEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSending(true); setNotice('')
    const payload = { ...form, name: form.name.trim(), phone: form.phone.trim(), message: form.message.trim() }
    const message = `Hello OLLIC, I would like to make an enquiry.\nName: ${payload.name}\nPhone: ${payload.phone}\nInterest: ${payload.interest}\nMessage: ${payload.message}`
    try {
      if (supabase) {
        const { error } = await supabase.from('enquiries').insert({ name: payload.name, phone: payload.phone, interest: payload.interest, message: payload.message || null, source: 'website' })
        if (error) throw error
        setNotice('Thank you. Your enquiry has been recorded. WhatsApp is opening so you can also contact our team.')
      } else setNotice('WhatsApp is opening so you can send your enquiry directly.')
      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
      setForm((f) => ({ ...f, name: '', phone: '', message: '' }))
    } catch {
      setNotice('We could not save the form just now. You can still send your enquiry through WhatsApp.')
      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    } finally { setSending(false) }
  }

  return <main ref={root}>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="OLLIC home"><span className="brand-mark">O<span>L</span></span><span className="brand-words"><strong>OLLIC</strong><small>REAL ESTATE DEVELOPMENT</small></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#developments" onClick={() => setMenuOpen(false)}>Developments</a><a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Talk to our team <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span/> PROPERTY, PLANNED WITH PURPOSE</div>
        <h1>Spaces for living.<br/><em>Places for growth.</em></h1>
        <p>We create considered real-estate opportunities, bringing thoughtful design, lasting value and a greener outlook together.</p>
        <div className="hero-actions"><a className="button button-light" href="#developments">Explore our developments <ArrowDownRight size={17}/></a><a className="text-link" href="#approach">Discover OLLIC <ArrowRight size={16}/></a></div>
        <div className="hero-proof"><div><strong>Designed with intent</strong><span>People and place first</span></div><i/><div><strong>Built for tomorrow</strong><span>Value that lasts</span></div></div>
      </div>
      <div className="hero-visual"><img className="hero-image" src={projects[0].cover} alt="Ollic Residences architectural visual, Maitama Abuja"/><div className="hero-image-shade"/><div className="hero-caption"><span>OLLIC RESIDENCES</span><strong>MAITAMA, ABUJA</strong></div><div className="floating-note"><span className="note-icon"><Leaf size={17}/></span><span><strong>Architecture in focus</strong><small>Explore our real project visuals</small></span></div></div>
      <a className="scroll-cue" href="#developments"><span>SCROLL TO EXPLORE</span><div><ArrowDownRight size={16}/></div></a>
    </section>

    <section className="intro section-pad" id="approach"><div className="section-kicker" data-reveal>01 — WHO WE ARE</div><div className="intro-grid"><h2 data-reveal>We see more than <em>property.</em></h2><div data-reveal><p className="intro-lead">We see the potential to create places where people can live well, communities can thrive and investments can stand the test of time.</p><p>OLLIC Real Estate Development Limited brings a development-led approach to land, housing and real-estate opportunities, with careful attention to planning, functionality and the environment.</p><a className="dark-link" href="#services">Discover our approach <ArrowRight size={16}/></a></div></div>
      <div className="principles" data-reveal><div><span className="principle-icon"><House/></span><strong>Purposeful design</strong><p>Spaces planned around how people actually live.</p></div><div><span className="principle-icon"><Trees/></span><strong>Nature-conscious</strong><p>Green spaces and sustainable thinking built into the vision.</p></div><div><span className="principle-icon"><ShieldCheck/></span><strong>Long-term value</strong><p>Development decisions made with tomorrow in mind.</p></div></div>
    </section>

    <section className="developments section-pad" id="developments"><div className="section-heading" data-reveal><div><div className="section-kicker">02 — OUR PORTFOLIO</div><h2>Explore the <em>developments.</em></h2></div><p>Start with two featured Abuja projects. More OLLIC developments can be added as the portfolio grows.</p></div>
      <div className="project-switcher" data-reveal>{projects.map((p, i) => <button key={p.id} className={selected === i ? 'project-tab active' : 'project-tab'} onClick={() => { setSelected(i); setForm((f) => ({ ...f, interest: `${p.name} — ${p.location}` })) }}><span>0{i+1}</span><span><strong>{p.name}</strong><small><MapPin size={12}/> {p.location}</small></span><ArrowUpRight size={18}/></button>)}</div>
      <div className="project-feature" data-reveal><button className="project-cover" onClick={() => setLightbox(project.cover)} aria-label={`View larger image of ${project.name}`}><img src={project.cover} alt={`${project.name}, ${project.location}`} loading="lazy"/><span className="image-zoom"><Maximize2 size={16}/> View image</span><span className="image-number">0{selected+1} / 02</span></button><div className="project-description"><span className="detail-category">{project.category}</span><h3>{project.name}</h3><p className="detail-location"><MapPin size={14}/> {project.location}</p><p>{project.description}</p><p className="project-disclaimer">Architectural visualisations are illustrative. Final specifications and availability are subject to confirmation.</p><a href="#contact" className="dark-link" onClick={() => setForm((f) => ({ ...f, interest: `${project.name} — ${project.location}` }))}>Enquire about this project <ArrowRight size={16}/></a></div></div>
      <div className="gallery-grid" data-reveal>{project.gallery.map((src, i) => <button className="gallery-tile" key={src} onClick={() => setLightbox(src)} aria-label={`Open ${project.name} image ${i+1}`}><img src={src} alt={`${project.name} project view ${i+1}`} loading="lazy"/><span><Maximize2 size={14}/></span></button>)}</div>
      <p className="gallery-note">Select any image to enlarge it. Choose the other project above to explore its gallery.</p>
    </section>

    <section className="services section-pad" id="services"><div className="section-heading" data-reveal><div><div className="section-kicker">03 — WHAT WE DO</div><h2>From vision to <em>place.</em></h2></div><p>Real-estate expertise across the stages that turn land and ideas into lasting places.</p></div><div className="service-grid" data-reveal>
      <article><span>01</span><div className="service-icon"><House/></div><h3>Property development</h3><p>Residential concepts and developments shaped around usability and quality.</p></article><article><span>02</span><div className="service-icon"><MapPin/></div><h3>Land and investment</h3><p>Property opportunities presented with clear information for informed decisions.</p></article><article><span>03</span><div className="service-icon"><Trees/></div><h3>Green communities</h3><p>Nature-conscious planning, landscaping and more thoughtful use of space.</p></article><article><span>04</span><div className="service-icon"><MessageCircle/></div><h3>Property advisory</h3><p>Talk to our team about your property interests and development goals.</p></article>
    </div></section>

    <section className="contact section-pad" id="contact"><div className="contact-copy"><div className="section-kicker">04 — LET'S TALK</div><h2>Have a place in mind?<br/><em>Let's talk.</em></h2><p>Tell us what you're interested in and the OLLIC team can help you take the next step.</p><div className="contact-note"><span className="principle-icon"><MessageCircle/></span><div><strong>Prefer WhatsApp?</strong><p>Submit the form to continue the conversation directly with our team.</p></div></div></div>
      <form className="enquiry-form" onSubmit={submitEnquiry}><h3>Make an enquiry</h3><p>Share a few details and we'll help direct your enquiry.</p><label>Full name<input required value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} placeholder="Your name" autoComplete="name"/></label><label>Phone number<input required value={form.phone} onChange={(e) => setForm({...form, phone:e.target.value})} placeholder="e.g. 080…" autoComplete="tel"/></label><label>I'm interested in<select value={form.interest} onChange={(e) => setForm({...form, interest:e.target.value})}><option>Ollic Residences — Maitama, Abuja</option><option>The Grove — Centenary City, Abuja</option><option>Property enquiry</option><option>Land and investment</option><option>Property advisory</option></select></label><label>Message (optional)<textarea rows={3} value={form.message} onChange={(e) => setForm({...form, message:e.target.value})} placeholder="Tell us what you'd like to know"/></label><button className="button button-dark" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={16}/></button>{notice && <p className="form-notice" role="status">{notice}</p>}<small className="privacy-note">Your details are used to respond to this enquiry.</small></form>
    </section>
    <footer className="footer"><a className="brand brand-footer" href="#home"><span className="brand-mark">O<span>L</span></span><span className="brand-words"><strong>OLLIC</strong><small>REAL ESTATE DEVELOPMENT</small></span></a><p>Spaces for living. Places for growth.</p><div className="footer-links"><a href="#developments">Developments</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} OLLIC Real Estate Development Limited. All rights reserved.</small></footer>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image viewer"><X/></button><img src={lightbox} alt="Enlarged OLLIC project visual" onClick={(e) => e.stopPropagation()}/><span>Tap outside the image to close</span></div>}
  </main>
}
