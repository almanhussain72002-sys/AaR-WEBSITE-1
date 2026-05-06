"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Facebook,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X
} from "lucide-react";

const services = [
  {
    title: "CCTV Installation",
    description:
      "Professional CCTV camera installation for homes, offices, and commercial spaces with clean setup and reliable performance.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90"
  },
  {
    title: "Smart Locks",
    description:
      "Advanced smart lock systems for secure, keyless entry with modern control and convenience.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=90"
  },
  {
    title: "Access Control & Attendance",
    description:
      "Secure access control and employee attendance solutions for offices and organizations.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90"
  },
  {
    title: "Video Door Phones",
    description:
      "Smart video door phone systems for real-time monitoring and secure visitor communication.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=90"
  },
  {
    title: "AMC & Maintenance",
    description:
      "Annual maintenance and support services to ensure your security systems run smoothly at all times.",
    image:
      "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1400&q=90"
  }
];

const reasons = [
  ["Professional Installation", "Clean wiring. Precise setup."],
  ["Trusted Quality", "Reliable systems built to last."],
  ["Honest Consultation", "Only what your space needs."],
  ["Fast Support", "Quick help when it matters."],
  ["Long-Term Maintenance", "AMC support for peace of mind."]
];

const industries = [
  "Homes",
  "Apartments",
  "Offices",
  "Shops",
  "Warehouses",
  "Schools",
  "Clinics",
  "Restaurants",
  "Commercial buildings"
];

const process = [
  "Site Inspection",
  "Requirement Understanding",
  "Solution Planning",
  "Installation",
  "Testing",
  "Support"
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Company Profile", href: "#about" },
  { label: "Contact", href: "#contact" }
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { scrollYProgress } = useScroll();
  const heroLift = useTransform(scrollYProgress, [0, 0.35], [0, -80]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (!popupShown && scrollable > 0 && window.scrollY / scrollable > 0.34) {
        setPopupOpen(true);
        setPopupShown(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [popupShown]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "AAR Security & Solutions",
      description:
        "CCTV installation, smart locks, access control and attendance, video door phones, and AMC services for homes and businesses.",
      areaServed: ["Karnataka", "Mangalore", "Udupi"],
      telephone: "+91 98765 43210",
      email: "info@aarsecuritysolutions.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    }),
    []
  );

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();

    ["name", "phone", "email", "service", "location"].forEach((field) => {
      if (!String(form.get(field) || "").trim()) {
        nextErrors[field] = "Required";
      }
    });

    if (phone && !/^[0-9+\-\s()]{8,}$/.test(phone)) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-night text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-night/58 backdrop-blur-2xl"
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center" aria-label="AAR Security & Solutions home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="AAR Security & Solutions logo"
              className="h-10 w-auto object-contain"
            />
          </a>
          <div className="hidden items-center gap-10 text-sm font-medium text-white/58 lg:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link-premium">
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+919876543210" className="apple-button-secondary nav-call-button">
              Call Now
            </a>
            <button onClick={() => setPopupOpen(true)} className="apple-button-primary nav-consult-button">
              Get Free Consultation
            </button>
          </div>
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-night/80 px-5 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-[4.5rem] items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="AAR Security & Solutions logo"
                className="h-10 w-auto object-contain"
              />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/8"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 rounded-[2rem] bg-white/[0.065] p-4 shadow-soft-lg backdrop-blur-2xl"
            >
              <div className="grid gap-1 text-3xl font-semibold tracking-tight">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-4 text-white/90 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              </div>
              <div className="mt-6 grid gap-3 border-t border-white/[0.07] pt-5">
                <a
                  href="tel:+919876543210"
                  onClick={() => setMobileOpen(false)}
                  className="apple-button-secondary justify-center py-4"
                >
                  Call Now
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setPopupOpen(true);
                  }}
                  className="apple-button-primary justify-center py-4"
                >
                  Get Free Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 lg:pt-28">
        <motion.div
          style={{ y: heroLift }}
          animate={{ opacity: [0.5, 0.82, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-20 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-pulse/18 blur-[130px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
            className="max-w-5xl"
          >
            <motion.p variants={fadeUp} className="mb-5 text-sm font-medium text-pulse">
              Premium smart security for modern spaces
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-balance text-6xl font-semibold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Security Built Around Trust
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-xl leading-8 text-white/62 sm:text-2xl sm:leading-9"
            >
              AAR Security & Solutions creates calm, intelligent protection for homes, offices, and
              businesses.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPopupOpen(true)}
                className="apple-button-hero"
              >
                Get Free Consultation
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+919876543210"
                className="apple-button-hero-secondary"
              >
                Call Now
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="premium-image relative min-h-[38rem] overflow-hidden rounded-[2.4rem] shadow-soft-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90"
              alt="Luxury modern smart home with cinematic lighting"
              width={1200}
              height={1200}
              priority
              className="h-full min-h-[38rem] w-full object-cover brightness-[0.58] saturate-[0.82] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/28 to-night/18" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(0,163,255,0.28),transparent_22rem)] mix-blend-screen" />
            <div className="absolute right-8 top-8 h-56 w-56 rounded-full bg-pulse/24 blur-[90px]" />
            <div className="service-glass-panel absolute bottom-7 left-7 right-7 p-7">
              <p className="text-sm font-medium text-pulse">Designed for trust</p>
              <p className="mt-3 max-w-md text-3xl font-semibold tracking-tight">
                Luxury spaces deserve invisible protection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" label="About" title="Security that feels effortless.">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <p className="max-w-3xl text-2xl leading-10 tracking-tight text-white/74">
            AAR Security & Solutions provides modern installation services for homes, offices, and
            businesses. Every system is planned clearly, installed neatly, and supported for the
            long term.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Plan", "Install", "Support"].map((item) => (
              <motion.div key={item} whileHover={{ y: -4 }} className="quiet-card p-7">
                <p className="text-3xl font-semibold tracking-tight">{item}</p>
                <p className="mt-3 text-sm leading-6 text-white/54">Simple. Clean. Reliable.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div id="blog" className="h-px scroll-mt-28" aria-hidden="true" />

      <section id="services" className="relative px-5 py-36 sm:px-8 lg:py-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,163,255,0.18),transparent_36rem)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,11,0)_0%,rgba(0,0,0,0.2)_46%,rgba(3,6,11,0)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl"
        >
          <div className="mx-auto mb-24 max-w-5xl text-center">
            <p className="text-sm font-medium text-pulse">AAR Security & Solutions Services</p>
            <h2 className="text-balance mt-5 text-6xl font-semibold leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Premium security, presented with precision.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-white/56">
              Five essential systems. Designed, installed, and maintained with the calm finish of a
              luxury technology brand.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ staggerChildren: 0.11 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`service-showcase-card group ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <div
                  className={
                    index === 0
                      ? "relative h-[38rem] overflow-hidden sm:h-[42rem]"
                      : "relative h-[32rem] overflow-hidden"
                  }
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} by AAR Security & Solutions`}
                    width={1500}
                    height={950}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover brightness-[0.68] saturate-[0.84] contrast-[1.08] transition duration-[1400ms] ease-out group-hover:scale-[1.05] group-hover:brightness-[0.76]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03060b]/92 via-[#03060b]/34 to-[#03060b]/12" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(0,163,255,0.2),transparent_18rem)] opacity-70 mix-blend-screen" />
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent opacity-40" />
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-pulse/24 blur-[100px]" />
                  </div>
                  <div className="absolute left-6 top-6 rounded-full bg-black/24 px-4 py-2 text-xs font-medium text-white/72 shadow-soft backdrop-blur-2xl">
                    0{index + 1}
                  </div>
                  <div className="service-glass-panel absolute inset-x-5 bottom-5 p-6 sm:inset-x-7 sm:bottom-7 sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                          {service.title}
                        </h3>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">
                          {service.description}
                        </p>
                      </div>
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-night shadow-soft transition duration-300 group-hover:bg-pulse group-hover:text-white">
                        <ArrowRightIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Section id="why-choose-us" label="Why Choose Us" title="Premium work, without the noise.">
        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/[0.07] md:grid-cols-2 xl:grid-cols-5">
          {reasons.map(([title, description]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              className="bg-[#090d14]/95 p-7"
            >
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-4 leading-7 text-white/52">{description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="industries" label="Industries We Serve" title="Built for real spaces.">
        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -3 }}
              className="rounded-full bg-white/[0.07] px-5 py-3 text-sm font-medium text-white/72 shadow-soft"
            >
              {industry}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="process" label="Process" title="A calm, clear installation journey.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {process.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.04 }}
              className="quiet-card p-6"
            >
              <span className="text-sm font-medium text-pulse">0{index + 1}</span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{step}</h3>
            </motion.div>
          ))}
        </div>
      </Section>

      <section id="contact" className="px-5 py-28 sm:px-8 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-7xl gap-12 rounded-[2.4rem] bg-white/[0.055] p-8 shadow-soft-lg backdrop-blur-2xl sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16"
        >
          <div>
            <p className="text-sm font-medium text-pulse">Contact</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Secure Your Space Today
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/62">
              Get expert advice and a customized security solution for your home or business.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-5">
            <ContactLink href="tel:+919876543210" icon={Phone} text="+91 98765 43210" />
            <ContactLink href="mailto:info@aarsecuritysolutions.com" icon={Mail} text="info@aarsecuritysolutions.com" />
            <div className="flex items-center gap-4 text-white/60">
              <MapPin className="h-5 w-5 shrink-0 text-pulse" />
              <span>Mangalore, Karnataka. Serving Karnataka and Udupi.</span>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/919876543210"
                className="apple-button-primary justify-center"
              >
                WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+919876543210"
                className="apple-button-secondary justify-center"
              >
                Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="px-5 pb-10 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/[0.06] pt-10 lg:grid-cols-[1.3fr_0.7fr_0.8fr_0.5fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="AAR Security & Solutions logo"
              className="h-12 w-auto object-contain"
            />
            <p className="mt-5 max-w-md leading-7 text-white/48">
              AAR Security & Solutions - Trusted Security Installation & Smart Protection Systems.
            </p>
          </div>
          <FooterColumn title="Quick links" items={navLinks.map((link) => link.label)} />
          <FooterColumn title="Services" items={services.map((service) => service.title)} />
          <div>
            <h3 className="font-semibold tracking-tight">Social</h3>
            <div className="mt-5 flex gap-3">
              {[
                [Instagram, "Instagram", "https://www.instagram.com/"],
                [Facebook, "Facebook", "https://www.facebook.com/"],
                [MessageCircle, "WhatsApp", "https://wa.me/919876543210"]
              ].map(([Icon, label, href]) => (
                <a
                  key={label as string}
                  href={href as string}
                  aria-label={`${label} for AAR Security & Solutions`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.07] text-white/60 transition hover:bg-white hover:text-night"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-night/76 px-4 py-6 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 170, damping: 25 }}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-[#10141c]/86 p-6 shadow-soft-lg backdrop-blur-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-pulse">Free Consultation</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">Tell us what you need.</h2>
                </div>
                <button
                  aria-label="Close inquiry form"
                  onClick={() => setPopupOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-[1.5rem] bg-white/[0.06] p-7">
                  <Headphones className="h-9 w-9 text-pulse" />
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight">Thank you.</h3>
                  <p className="mt-3 leading-7 text-white/58">
                    AAR Security & Solutions received your inquiry. Our team will contact you soon.
                  </p>
                  <button
                    onClick={() => setPopupOpen(false)}
                    className="apple-button-primary mt-7"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submitInquiry} className="mt-8 grid gap-4 sm:grid-cols-2" noValidate>
                  <Field name="name" label="Name" error={errors.name} />
                  <Field name="phone" label="Phone number" error={errors.phone} />
                  <Field name="email" label="Email" type="email" error={errors.email} />
                  <label className="grid gap-2 text-sm font-medium text-white/76">
                    Service needed
                    <select name="service" className="field-control" defaultValue="">
                      <option value="" className="bg-night">
                        Select service
                      </option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title} className="bg-night">
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && <span className="text-xs text-pulse">{errors.service}</span>}
                  </label>
                  <Field name="location" label="Location" error={errors.location} />
                  <label className="grid gap-2 text-sm font-medium text-white/76 sm:col-span-2">
                    Message
                    <textarea
                      name="message"
                      rows={4}
                      className="field-control h-auto py-4"
                      placeholder="Share a few details"
                    />
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="apple-button-primary mt-2 justify-center sm:col-span-2"
                  >
                    Submit Inquiry
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Section({
  id,
  label,
  title,
  children
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-28 sm:px-8 lg:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-14 max-w-4xl">
          <p className="text-sm font-medium text-pulse">{label}</p>
          <h2 className="text-balance mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            {title}
          </h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-white/76">
      {label}
      <input name={name} type={type} className="field-control" placeholder={label} />
      {error && <span className="text-xs text-pulse">{error}</span>}
    </label>
  );
}

function ContactLink({
  href,
  icon: Icon,
  text
}: {
  href: string;
  icon: typeof Phone;
  text: string;
}) {
  return (
    <a href={href} className="flex items-center gap-4 text-white/60 transition hover:text-white">
      <Icon className="h-5 w-5 shrink-0 text-pulse" />
      <span>{text}</span>
    </a>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5 10h10" />
      <path d="m11 6 4 4-4 4" />
    </svg>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold tracking-tight">{title}</h3>
      <div className="mt-5 grid gap-3 text-sm text-white/48">
        {items.map((item) => (
          <a
            key={item}
            href={
              title === "Quick links"
                ? navLinks.find((link) => link.label === item)?.href || "#"
                : "#services"
            }
            className="transition hover:text-white"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
