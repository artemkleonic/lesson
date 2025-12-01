// ==================== AOS ====================
AOS.init({ once: true, duration: 700 });

// ==================== SWIPER ====================
const servicesSwiper = new Swiper('.swiper-services', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: '.services-pagination',
    clickable: true
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

const testimonialsSwiper = new Swiper('.swiper-testimonials', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: '.testimonials-pagination',
    clickable: true
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// ==================== HEADER SCROLL + BACK TO TOP ====================
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  header.classList.toggle('scrolled', scrolled);
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== MOBILE MENU ====================
const burger = document.getElementById('burger');
const navMobile = document.getElementById('nav-mobile');

const toggleMenu = () => {
  if (!burger || !navMobile) return;
  burger.classList.toggle('active');
  navMobile.classList.toggle('open');
  document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
};

if (burger && navMobile) {
  burger.addEventListener('click', toggleMenu);
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
}

// ==================== SMOOTH SCROLL FOR ANCHORS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const offset = header ? header.offsetHeight + 10 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==================== COUNTERS ====================
const counters = document.querySelectorAll('[data-counter]');
const countersObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-counter');
        const duration = 1500;
        const start = performance.now();

        const animate = time => {
          const progress = Math.min((time - start) / duration, 1);
          const value = Math.floor(target * progress);
          // 20+, 30+ — но без плюса у 1000
          if (target >= 1000) {
            el.textContent = value.toString();
          } else {
            el.textContent = value + '+';
          }
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach(c => countersObserver.observe(c));

// ==================== I18N TRANSLATIONS ====================
let currentLang = 'en';

const translations = {
  // ==================== ENGLISH ====================
  en: {
    // NAV
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.parents': 'Intended Parents',
    'nav.agencies': 'Agencies & Clinics',
    'nav.surrogates': 'Surrogates & Donors',
    'nav.news': 'News & Events',
    'nav.resources': 'Resources',
    'nav.contacts': 'Contacts',

    // HERO
    'hero.kicker': 'International reproductive law agency',
    'hero.titleLine1': 'Creating families',
    'hero.titleLine2': 'around the world',
    'hero.subtitle':
      'We guide surrogacy and gamete donation programs in more than 30 countries, ensuring legal safety for parents and children.',
    'hero.meta': '20+ years of experience · 30+ countries · 1000+ successful cases',
    'hero.ctaPrimary': 'Book a consultation',
    'hero.ctaSecondary': 'Learn more',
    'hero.note': 'We are fully independent from clinics and act only in the interests of our clients.',
    'hero.cardTitle': 'Independent legal expertise',
    'hero.cardText':
      'We help evaluate countries, clinics and programs before you start, minimise risks and build the best strategy for your family.',

    // ABOUT
    'about.title': 'About us',
    'about.text':
      'REPRONOVA is an independent international agency focused on the legal support of surrogacy and gamete donation programs.',
    'about.body':
      'We act as a bridge between intended parents, clinics, surrogates and donors, ensuring transparency, legal compliance and protection of the child’s rights in both your home country and the jurisdiction where the program is carried out. Our team of lawyers and coordinators speaks several languages and supports families from the first consultation to obtaining the child’s documents.',

    // EXPERTISE / STATS
    'expertise.title': 'Our expertise',
    'expertise.text':
      'We combine international reproductive law, medical insight and hands-on experience with complex cross-border cases.',
    'stats.years': 'years of experience',
    'stats.countries': 'countries',
    'stats.families': 'families supported',
    'seen.label': 'As Seen In',

    // FOUNDER
    'founder.title': 'Founder',
    'founder.subtitle': 'The face and philosophy behind REPRONOVA.',
    'founder.badge': 'Founder',
    'founder.name': 'Dr. Anna Kovalenko',
    'founder.text1':
      'A leading expert in international reproductive law with experience in Europe, the US, Asia and Latin America. For more than 20 years she has advised families, clinics and public authorities on surrogacy and gamete donation.',
    'founder.text2':
      'Author of over 50 scientific and practical publications, speaker at key conferences and expert for international media.',
    'founder.button': 'Read more',

    // SERVICES
    'services.title': 'Services',
    'services.subtitle': 'Core directions of our work for intended parents, agencies and clinics.',
    'services.surrogacy.title': 'Surrogacy programs',
    'services.surrogacy.text':
      'Legal and organisational support of programs in safe jurisdictions: country selection, contract review and full coordination until the child’s documents are issued.',
    'services.donation.title': 'Gamete donation',
    'services.donation.text':
      'Work with vetted donor banks in Europe, the US, Canada and other countries. Legal analysis of agreements and protection of the rights of parents and the child.',
    'services.audit.title': 'Independent legal audit',
    'services.audit.text':
      'Review of contracts, programs and clinics before signing. Risk assessment and mapping of parentage and citizenship scenarios for the child.',
    'services.link': 'Learn more',

    // WHY
    'why.title': 'Why REPRONOVA',
    'why.subtitle': 'Three pillars of our approach: independence, legal accuracy and global experience.',
    'why.independence.title': 'Independence',
    'why.independence.text':
      'We do not sell clinic packages and do not receive commissions for referrals. Our only interest is your legal safety and a realistic plan.',
    'why.legal.title': 'Legal certainty',
    'why.legal.text':
      'We analyse parentage and citizenship scenarios in your home country before you start, so you avoid unexpected legal traps.',
    'why.global.title': 'International reach',
    'why.global.text':
      'We track legislative changes in 30+ jurisdictions and update strategies for our clients in real time.',
    'why.button': 'Why Us?',

    // TESTIMONIALS
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'Stories of families who have already walked this path with REPRONOVA.',
    'testimonials.1.text':
      '“Thanks to REPRONOVA we are finally holding our daughter. Every step was transparent and the team was available even on weekends.”',
    'testimonials.1.name': 'Sofia & Marco',
    'testimonials.1.location': 'Italy',
    'testimonials.2.text':
      '“They explained the pros and cons of different countries, helped us avoid legally risky options and choose the best route to our son.”',
    'testimonials.2.name': 'Alexey & Anna',
    'testimonials.2.location': 'Germany',
    'testimonials.3.text':
      '“Our complex case in Mexico ended with recognition of parentage and citizenship in both countries. Without REPRONOVA it would not have been possible.”',
    'testimonials.3.name': 'Li & Chen',
    'testimonials.3.location': 'China',

    // NEWS
    'news.title': 'News & Events',
    'news.subtitle': 'Key legal changes and practical case studies from our clients.',
    'news.1.title': 'Greece 2025: new opportunities for same-sex couples',
    'news.1.text':
      'On 1 December 2025 amendments come into force expanding access to surrogacy programs for same-sex couples. We explain the conditions and risks.',
    'news.2.title': 'Mexico limits commercial surrogacy from 2026',
    'news.2.text':
      'What should clients already in programs do, and which jurisdictions can be considered as alternatives — our detailed analysis.',
    'news.3.title': 'Canada: successful dual citizenship case',
    'news.3.text':
      'Our clients received passports of two countries within 45 days after birth. We share how we built the strategy.',
    'news.readMore': 'Read more',
    'news.all': 'See all news',

    // PARTNERS
    'partners.title': 'Partners',
    'partners.subtitle': 'Recommended clinics, law firms, cryobanks and DNA labs.',
    'partners.all': 'All partners',

    // RESOURCES
    'resources.title': 'Resources',
    'resources.text': 'Legal overviews, guides and answers to the most common questions.',
    'resources.legislation.title': 'Legislation',
    'resources.legislation.text':
      'Overview of key rules on surrogacy and gamete donation in more than 30 countries.',
    'resources.publications.title': 'Publications',
    'resources.publications.text': 'Articles and research by our experts in international reproductive law.',
    'resources.faq.title': 'FAQ',
    'resources.faq.text':
      'Answers to the questions we hear most often from families, agencies and clinics.',
    'resources.guides.title': 'Guides',
    'resources.guides.text':
      'Practical checklists and step-by-step guides for choosing a country and building a strategy.',
    'resources.open': 'Open',

    // CONTACT
    'contact.title': 'Contacts',
    'contact.text':
      'Send us a short request — we will outline several strategies already during the introductory consultation.',
    'contact.label.email': 'Email:',
    'contact.label.phone': 'Phone:',
    'contact.label.location': 'Location:',
    'contact.location.value': 'Switzerland · Remote worldwide',
    'contact.placeholder.name': 'Your name',
    'contact.placeholder.email': 'Email',
    'contact.placeholder.country': 'Country of residence',
    'contact.placeholder.phone': 'Phone (optional)',
    'contact.placeholder.message': 'Briefly describe your situation',
    'contact.button': 'Send request',
    'contact.success': 'Thank you! We will get back to you within 1–2 business days.',

    // FOOTER
    'footer.brand.title': 'REPRONOVA',
    'footer.brand.text':
      'International reproductive law agency since 2004.\nLegal support for surrogacy and gamete donation programs.',
    'footer.about.title': 'About Us',
    'footer.about.mission': 'Mission',
    'footer.about.team': 'Team',
    'footer.about.founder': 'Founder',
    'footer.about.media': 'Media about us',
    'footer.services.title': 'Services',
    'footer.services.all': 'Full list',
    'footer.services.legalOpinions': 'Legal opinions',
    'footer.services.advisor': 'Independent legal advisor',
    'footer.resources.title': 'Resources',
    'footer.resources.legislation': 'Legislation',
    'footer.resources.publications': 'Publications',
    'footer.resources.faq': 'FAQ',
    'footer.resources.guides': 'Guides',
    'footer.news.title': 'News & Events',
    'footer.news.industry': 'Industry news',
    'footer.news.our': 'Our events',
    'footer.news.other': 'Other events',
    'footer.partners.title': 'Partners',
    'footer.partners.clinics': 'Clinics',
    'footer.partners.lawFirms': 'Law firms',
    'footer.partners.cryobanks': 'Cryobanks',
    'footer.partners.dnaLabs': 'DNA labs',
    'footer.subscribe.title': 'Subscribe',
    'footer.subscribe.placeholder': 'your@email.com',
    'footer.subscribe.button': 'Subscribe',
    'footer.subscribe.success': 'Thank you for subscribing!',
    'footer.bottom': '© 2025 REPRONOVA. All rights reserved.'
  },

  // ==================== ESPAÑOL ====================
  es: {
    'nav.about': 'Sobre nosotros',
    'nav.services': 'Servicios',
    'nav.parents': 'Padres intencionales',
    'nav.agencies': 'Agencias y clínicas',
    'nav.surrogates': 'Gestantes y donantes',
    'nav.news': 'Noticias y eventos',
    'nav.resources': 'Recursos',
    'nav.contacts': 'Contactos',

    'hero.kicker': 'Agencia internacional de derecho reproductivo',
    'hero.titleLine1': 'Creando familias',
    'hero.titleLine2': 'en todo el mundo',
    'hero.subtitle':
      'Acompañamos programas de gestación subrogada y donación de gametos en más de 30 países, garantizando seguridad jurídica para padres e hijos.',
    'hero.meta': '20+ años de experiencia · 30+ países · 1000+ casos exitosos',
    'hero.ctaPrimary': 'Reservar una consulta',
    'hero.ctaSecondary': 'Más información',
    'hero.note':
      'Somos totalmente independientes de las clínicas y actuamos únicamente en interés de nuestros clientes.',
    'hero.cardTitle': 'Experiencia jurídica independiente',
    'hero.cardText':
      'Ayudamos a evaluar países, clínicas y programas antes de empezar, minimizar riesgos y construir la mejor estrategia para su familia.',

    'about.title': 'Sobre nosotros',
    'about.text':
      'REPRONOVA es una agencia internacional independiente centrada en el apoyo jurídico de programas de gestación subrogada y donación de gametos.',
    'about.body':
      'Actuamos como puente entre padres intencionales, clínicas, gestantes y donantes, garantizando transparencia, cumplimiento de la ley y protección de los derechos del niño tanto en su país de origen como en la jurisdicción donde se realiza el programa. Nuestro equipo de abogados y coordinadores habla varios idiomas y acompaña a las familias desde la primera consulta hasta la obtención de la documentación del niño.',

    'expertise.title': 'Nuestra experiencia',
    'expertise.text':
      'Combinamos derecho reproductivo internacional, conocimiento médico y experiencia práctica en casos transfronterizos complejos.',
    'stats.years': 'años de experiencia',
    'stats.countries': 'países',
    'stats.families': 'familias acompañadas',
    'seen.label': 'En los medios',

    'founder.title': 'Fundadora',
    'founder.subtitle': 'El rostro y la filosofía detrás de REPRONOVA.',
    'founder.badge': 'Fundadora',
    'founder.name': 'Dra. Anna Kovalenko',
    'founder.text1':
      'Reconocida experta en derecho reproductivo internacional con experiencia en Europa, Estados Unidos, Asia y América Latina. Durante más de 20 años ha asesorado a familias, clínicas y autoridades públicas en materia de gestación subrogada y donación de gametos.',
    'founder.text2':
      'Autora de más de 50 publicaciones científicas y prácticas, ponente en congresos clave y experta para medios internacionales.',
    'founder.button': 'Leer más',

    'services.title': 'Servicios',
    'services.subtitle': 'Líneas principales de trabajo para padres intencionales, agencias y clínicas.',
    'services.surrogacy.title': 'Programas de gestación subrogada',
    'services.surrogacy.text':
      'Acompañamiento jurídico y organizativo en jurisdicciones seguras: elección del país, revisión de contratos y coordinación completa hasta la obtención de la documentación del bebé.',
    'services.donation.title': 'Donación de gametos',
    'services.donation.text':
      'Trabajo con bancos de donantes verificados en Europa, Estados Unidos, Canadá y otros países. Análisis jurídico de acuerdos y protección de los derechos de los padres y del niño.',
    'services.audit.title': 'Auditoría jurídica independiente',
    'services.audit.text':
      'Revisión de contratos, programas y clínicas antes de firmar. Evaluación de riesgos y escenarios de filiación y ciudadanía del niño.',
    'services.link': 'Más información',

    'why.title': 'Por qué REPRONOVA',
    'why.subtitle': 'Tres pilares de nuestro enfoque: independencia, seguridad jurídica y experiencia global.',
    'why.independence.title': 'Independencia',
    'why.independence.text':
      'No vendemos paquetes de clínicas ni cobramos comisiones por derivaciones. Nuestro único interés es su seguridad jurídica y un plan realista.',
    'why.legal.title': 'Seguridad jurídica',
    'why.legal.text':
      'Analizamos los posibles escenarios de filiación y ciudadanía en su país antes de iniciar el programa, para evitar sorpresas legales.',
    'why.global.title': 'Alcance internacional',
    'why.global.text':
      'Seguimos los cambios legislativos en más de 30 jurisdicciones y actualizamos las estrategias de nuestros clientes en tiempo real.',
    'why.button': 'Por qué nosotros',

    'testimonials.title': 'Testimonios',
    'testimonials.subtitle': 'Historias de familias que ya han recorrido este camino con REPRONOVA.',
    'testimonials.1.text':
      '«Gracias a REPRONOVA por fin tenemos a nuestra hija en brazos. Cada paso fue transparente y el equipo siempre estuvo disponible, incluso los fines de semana.»',
    'testimonials.1.name': 'Sofía y Marco',
    'testimonials.1.location': 'Italia',
    'testimonials.2.text':
      '«Nos explicaron las ventajas y desventajas de diferentes países, nos ayudaron a evitar opciones legalmente riesgosas y a elegir la ruta más segura hacia nuestro hijo.»',
    'testimonials.2.name': 'Alexey y Anna',
    'testimonials.2.location': 'Alemania',
    'testimonials.3.text':
      '«Nuestro complejo caso en México terminó con el reconocimiento de la filiación y la ciudadanía en ambos países. Sin REPRONOVA no habría sido posible.»',
    'testimonials.3.name': 'Li y Chen',
    'testimonials.3.location': 'China',

    'news.title': 'Noticias y eventos',
    'news.subtitle': 'Principales cambios legislativos y casos prácticos de nuestros clientes.',
    'news.1.title': 'Grecia 2025: nuevas oportunidades para parejas del mismo sexo',
    'news.1.text':
      'El 1 de diciembre de 2025 entran en vigor enmiendas que amplían el acceso a la gestación subrogada para parejas del mismo sexo. Explicamos condiciones y riesgos.',
    'news.2.title': 'México limita la subrogación comercial desde 2026',
    'news.2.text':
      'Qué deben hacer los clientes que ya están en programas y qué jurisdicciones considerar como alternativa: nuestro análisis detallado.',
    'news.3.title': 'Canadá: caso exitoso de doble ciudadanía',
    'news.3.text':
      'Nuestros clientes obtuvieron pasaportes de dos países en 45 días tras el nacimiento. Compartimos la estrategia que utilizamos.',
    'news.readMore': 'Leer más',
    'news.all': 'Todas las noticias',

    'partners.title': 'Socios',
    'partners.subtitle': 'Clínicas, despachos de abogados, criobancos y laboratorios de ADN recomendados.',
    'partners.all': 'Todos los socios',

    'resources.title': 'Recursos',
    'resources.text': 'Resúmenes legales, guías y respuestas a las preguntas más frecuentes.',
    'resources.legislation.title': 'Legislación',
    'resources.legislation.text':
      'Resumen de las normas clave sobre gestación subrogada y donación de gametos en más de 30 países.',
    'resources.publications.title': 'Publicaciones',
    'resources.publications.text':
      'Artículos e investigaciones de nuestros expertos en derecho reproductivo internacional.',
    'resources.faq.title': 'FAQ',
    'resources.faq.text': 'Respuestas a las preguntas que más a menudo recibimos de familias, agencias y clínicas.',
    'resources.guides.title': 'Guías',
    'resources.guides.text':
      'Listas de comprobación prácticas y guías paso a paso para elegir país y construir una estrategia.',
    'resources.open': 'Abrir',

    'contact.title': 'Contactos',
    'contact.text':
      'Envíenos una breve descripción de su caso: durante la consulta inicial ya podremos proponerle varias estrategias.',
    'contact.label.email': 'Email:',
    'contact.label.phone': 'Teléfono:',
    'contact.label.location': 'Ubicación:',
    'contact.location.value': 'Suiza · Asesoría a distancia en todo el mundo',
    'contact.placeholder.name': 'Nombre',
    'contact.placeholder.email': 'Email',
    'contact.placeholder.country': 'País de residencia',
    'contact.placeholder.phone': 'Teléfono (opcional)',
    'contact.placeholder.message': 'Describa brevemente su situación',
    'contact.button': 'Enviar solicitud',
    'contact.success': '¡Gracias! Nos pondremos en contacto con usted en 1–2 días laborables.',

    'footer.brand.title': 'REPRONOVA',
    'footer.brand.text':
      'Agencia internacional de derecho reproductivo desde 2004.\nApoyo jurídico para programas de gestación subrogada y donación de gametos.',
    'footer.about.title': 'Sobre nosotros',
    'footer.about.mission': 'Misión',
    'footer.about.team': 'Equipo',
    'footer.about.founder': 'Fundadora',
    'footer.about.media': 'Medios sobre nosotros',
    'footer.services.title': 'Servicios',
    'footer.services.all': 'Lista completa',
    'footer.services.legalOpinions': 'Informes jurídicos',
    'footer.services.advisor': 'Asesor jurídico independiente',
    'footer.resources.title': 'Recursos',
    'footer.resources.legislation': 'Legislación',
    'footer.resources.publications': 'Publicaciones',
    'footer.resources.faq': 'FAQ',
    'footer.resources.guides': 'Guías',
    'footer.news.title': 'Noticias y eventos',
    'footer.news.industry': 'Noticias del sector',
    'footer.news.our': 'Nuestros eventos',
    'footer.news.other': 'Otros eventos',
    'footer.partners.title': 'Socios',
    'footer.partners.clinics': 'Clínicas',
    'footer.partners.lawFirms': 'Despachos de abogados',
    'footer.partners.cryobanks': 'Criobancos',
    'footer.partners.dnaLabs': 'Laboratorios de ADN',
    'footer.subscribe.title': 'Suscripción',
    'footer.subscribe.placeholder': 'tu@email.com',
    'footer.subscribe.button': 'Suscribirse',
    'footer.subscribe.success': '¡Gracias por suscribirte!',
    'footer.bottom': '© 2025 REPRONOVA. Todos los derechos reservados.'
  },

  // ==================== DEUTSCH ====================
  de: {
    'nav.about': 'Über uns',
    'nav.services': 'Leistungen',
    'nav.parents': 'Wunscheltern',
    'nav.agencies': 'Agenturen & Kliniken',
    'nav.surrogates': 'Leihmütter & Spender',
    'nav.news': 'News & Events',
    'nav.resources': 'Ressourcen',
    'nav.contacts': 'Kontakt',

    'hero.kicker': 'Internationale Agentur für Reproduktionsrecht',
    'hero.titleLine1': 'Wir schaffen Familien',
    'hero.titleLine2': 'weltweit',
    'hero.subtitle':
      'Wir begleiten Programme der Leihmutterschaft und Gametenspende in über 30 Ländern und sorgen für rechtliche Sicherheit für Eltern und Kinder.',
    'hero.meta': '20+ Jahre Erfahrung · 30+ Länder · 1000+ erfolgreiche Fälle',
    'hero.ctaPrimary': 'Beratung buchen',
    'hero.ctaSecondary': 'Mehr erfahren',
    'hero.note':
      'Wir sind vollständig unabhängig von Kliniken und handeln ausschließlich im Interesse unserer Mandantinnen und Mandanten.',
    'hero.cardTitle': 'Unabhängige Rechtsberatung',
    'hero.cardText':
      'Wir bewerten Länder, Kliniken und Programme bereits vor dem Start, minimieren Risiken und entwickeln die passende Strategie für Ihre Familie.',

    'about.title': 'Über uns',
    'about.text':
      'REPRONOVA ist eine unabhängige, international tätige Agentur, die auf die rechtliche Begleitung von Programmen zur Leihmutterschaft und Gametenspende spezialisiert ist.',
    'about.body':
      'Wir schlagen die Brücke zwischen Wunscheltern, Kliniken, Leihmüttern und Spendern und gewährleisten Transparenz, Rechtskonformität und den Schutz der Kinderrechte – sowohl in Ihrem Heimatland als auch in der Jurisdiktion, in der das Programm durchgeführt wird. Unser Team aus Juristinnen, Juristen und Koordinatoren spricht mehrere Sprachen und begleitet Familien von der ersten Beratung bis zur Ausstellung der Kinderpapiere.',

    'expertise.title': 'Unsere Expertise',
    'expertise.text':
      'Wir verbinden internationales Reproduktionsrecht, medizinisches Know-how und praktische Erfahrung in komplexen grenzüberschreitenden Fällen.',
    'stats.years': 'Jahre Erfahrung',
    'stats.countries': 'Länder',
    'stats.families': 'begleitete Familien',
    'seen.label': 'Bekannt aus',

    'founder.title': 'Gründerin',
    'founder.subtitle': 'Das Gesicht und die Philosophie hinter REPRONOVA.',
    'founder.badge': 'Gründerin',
    'founder.name': 'Dr. Anna Kovalenko',
    'founder.text1':
      'Führende Expertin für internationales Reproduktionsrecht mit Erfahrung in Europa, den USA, Asien und Lateinamerika. Seit über 20 Jahren berät sie Familien, Kliniken und Behörden zu Leihmutterschaft und Gametenspende.',
    'founder.text2':
      'Autorin von mehr als 50 wissenschaftlichen und praxisnahen Veröffentlichungen, Referentin auf Fachkongressen und Expertin für internationale Medien.',
    'founder.button': 'Mehr erfahren',

    'services.title': 'Leistungen',
    'services.subtitle':
      'Zentrale Leistungsbereiche für Wunscheltern, Agenturen und Kliniken.',
    'services.surrogacy.title': 'Leihmutterschaftsprogramme',
    'services.surrogacy.text':
      'Juristische und organisatorische Begleitung in rechtssicheren Jurisdiktionen: Länderauswahl, Vertragsprüfung und vollständige Koordination bis zur Ausstellung der Kinderpapiere.',
    'services.donation.title': 'Gametenspende',
    'services.donation.text':
      'Zusammenarbeit mit geprüften Spenderbanken in Europa, den USA, Kanada und weiteren Ländern. Juristische Analyse der Verträge und Schutz der Rechte von Eltern und Kind.',
    'services.audit.title': 'Unabhängiger Rechtscheck',
    'services.audit.text':
      'Prüfung von Verträgen, Programmen und Kliniken vor der Unterzeichnung. Risikoanalyse und Ausarbeitung von Szenarien zu Abstammung und Staatsangehörigkeit des Kindes.',
    'services.link': 'Mehr erfahren',

    'why.title': 'Warum REPRONOVA',
    'why.subtitle':
      'Drei Säulen unseres Ansatzes: Unabhängigkeit, Rechtssicherheit und internationale Erfahrung.',
    'why.independence.title': 'Unabhängigkeit',
    'why.independence.text':
      'Wir verkaufen keine Klinikpakete und erhalten keine Provisionen für Empfehlungen. Unser einziges Interesse ist Ihre rechtliche Sicherheit und ein realistischer Plan.',
    'why.legal.title': 'Rechtssicherheit',
    'why.legal.text':
      'Wir analysieren die Abstammungs- und Staatsangehörigkeitsszenarien in Ihrem Heimatland, bevor Sie starten, damit Sie rechtliche Fallen vermeiden.',
    'why.global.title': 'Internationale Reichweite',
    'why.global.text':
      'Wir verfolgen Gesetzesänderungen in über 30 Jurisdiktionen und passen die Strategien unserer Mandantinnen und Mandanten in Echtzeit an.',
    'why.button': 'Warum wir?',

    'testimonials.title': 'Erfahrungsberichte',
    'testimonials.subtitle': 'Geschichten von Familien, die den Weg mit REPRONOVA bereits gegangen sind.',
    'testimonials.1.text':
      '„Dank REPRONOVA halten wir endlich unsere Tochter im Arm. Jeder Schritt war transparent und das Team war auch an Wochenenden erreichbar.“',
    'testimonials.1.name': 'Sofia & Marco',
    'testimonials.1.location': 'Italien',
    'testimonials.2.text':
      '„Wir bekamen eine klare Darstellung der Vor- und Nachteile verschiedener Länder und konnten so riskante Optionen vermeiden und den sichersten Weg zu unserem Sohn wählen.“',
    'testimonials.2.name': 'Alexey & Anna',
    'testimonials.2.location': 'Deutschland',
    'testimonials.3.text':
      '„Unser komplexer Fall in Mexiko endete mit der Anerkennung der Elternschaft und Staatsangehörigkeit in beiden Ländern. Ohne REPRONOVA wäre das nicht möglich gewesen.“',
    'testimonials.3.name': 'Li & Chen',
    'testimonials.3.location': 'China',

    'news.title': 'News & Events',
    'news.subtitle': 'Wichtige Gesetzesänderungen und Praxisfälle aus unserer Beratung.',
    'news.1.title': 'Griechenland 2025: Neue Chancen für gleichgeschlechtliche Paare',
    'news.1.text':
      'Zum 1. Dezember 2025 treten Änderungen in Kraft, die den Zugang zu Leihmutterschaftsprogrammen für gleichgeschlechtliche Paare erweitern. Wir erläutern Voraussetzungen und Risiken.',
    'news.2.title': 'Mexiko beschränkt kommerzielle Leihmutterschaft ab 2026',
    'news.2.text':
      'Was sollten Mandanten tun, die sich bereits in Programmen befinden, und welche Jurisdiktionen kommen als Alternativen in Betracht? Unser ausführlicher Überblick.',
    'news.3.title': 'Kanada: Erfolgreicher Fall doppelter Staatsangehörigkeit',
    'news.3.text':
      'Unsere Mandanten erhielten innerhalb von 45 Tagen nach der Geburt Pässe zweier Staaten. Wir zeigen, wie wir die Strategie aufgebaut haben.',
    'news.readMore': 'Weiterlesen',
    'news.all': 'Alle News anzeigen',

    'partners.title': 'Partner',
    'partners.subtitle':
      'Empfohlene Kliniken, Kanzleien, Kryobanken und DNA-Labore.',
    'partners.all': 'Alle Partner',

    'resources.title': 'Ressourcen',
    'resources.text':
      'Rechtsüberblicke, Leitfäden und Antworten auf häufige Fragen.',
    'resources.legislation.title': 'Gesetzgebung',
    'resources.legislation.text':
      'Überblick über zentrale Regelungen zur Leihmutterschaft und Gametenspende in mehr als 30 Ländern.',
    'resources.publications.title': 'Publikationen',
    'resources.publications.text':
      'Fachartikel und Studien unserer Expertinnen und Experten für internationales Reproduktionsrecht.',
    'resources.faq.title': 'FAQ',
    'resources.faq.text':
      'Antworten auf die Fragen, die uns von Familien, Agenturen und Kliniken am häufigsten gestellt werden.',
    'resources.guides.title': 'Leitfäden',
    'resources.guides.text':
      'Praktische Checklisten und Schritt-für-Schritt-Leitfäden zur Länderauswahl und Strategieentwicklung.',
    'resources.open': 'Öffnen',

    'contact.title': 'Kontakt',
    'contact.text':
      'Schildern Sie uns kurz Ihre Situation – schon im ersten Gespräch skizzieren wir mögliche Strategien.',
    'contact.label.email': 'E-Mail:',
    'contact.label.phone': 'Telefon:',
    'contact.label.location': 'Standort:',
    'contact.location.value': 'Schweiz · Weltweite Online-Begleitung',
    'contact.placeholder.name': 'Ihr Name',
    'contact.placeholder.email': 'E-Mail',
    'contact.placeholder.country': 'Wohnsitzland',
    'contact.placeholder.phone': 'Telefon (optional)',
    'contact.placeholder.message': 'Beschreiben Sie Ihre Situation kurz',
    'contact.button': 'Anfrage senden',
    'contact.success':
      'Vielen Dank! Wir melden uns innerhalb von 1–2 Werktagen bei Ihnen.',

    'footer.brand.title': 'REPRONOVA',
    'footer.brand.text':
      'Internationale Agentur für Reproduktionsrecht seit 2004.\nRechtliche Begleitung von Programmen zur Leihmutterschaft und Gametenspende.',
    'footer.about.title': 'Über uns',
    'footer.about.mission': 'Mission',
    'footer.about.team': 'Team',
    'footer.about.founder': 'Gründerin',
    'footer.about.media': 'Presse über uns',
    'footer.services.title': 'Leistungen',
    'footer.services.all': 'Alle Leistungen',
    'footer.services.legalOpinions': 'Rechtsgutachten',
    'footer.services.advisor': 'Unabhängige Rechtsberatung',
    'footer.resources.title': 'Ressourcen',
    'footer.resources.legislation': 'Gesetzgebung',
    'footer.resources.publications': 'Publikationen',
    'footer.resources.faq': 'FAQ',
    'footer.resources.guides': 'Leitfäden',
    'footer.news.title': 'News & Events',
    'footer.news.industry': 'Branchennachrichten',
    'footer.news.our': 'Unsere Veranstaltungen',
    'footer.news.other': 'Weitere Events',
    'footer.partners.title': 'Partner',
    'footer.partners.clinics': 'Kliniken',
    'footer.partners.lawFirms': 'Kanzleien',
    'footer.partners.cryobanks': 'Kryobanken',
    'footer.partners.dnaLabs': 'DNA-Labore',
    'footer.subscribe.title': 'Newsletter',
    'footer.subscribe.placeholder': 'deine@email.de',
    'footer.subscribe.button': 'Abonnieren',
    'footer.subscribe.success': 'Danke für Ihre Anmeldung!',
    'footer.bottom': '© 2025 REPRONOVA. Alle Rechte vorbehalten.'
  },

  // ==================== РУССКИЙ ====================
  ru: {
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.parents': 'Потенциальным родителям',
    'nav.agencies': 'Агентствам и клиникам',
    'nav.surrogates': 'Суррогатным матерям и донорам',
    'nav.news': 'Новости и события',
    'nav.resources': 'Материалы',
    'nav.contacts': 'Контакты',

    'hero.kicker': 'Международное агентство репродуктивного права',
    'hero.titleLine1': 'Создаём семьи',
    'hero.titleLine2': 'по всему миру',
    'hero.subtitle':
      'Сопровождаем программы суррогатного материнства и донорства гамет более чем в 30 странах, обеспечивая юридическую безопасность родителей и детей.',
    'hero.meta': '20+ лет опыта · 30+ стран · 1000+ семей',
    'hero.ctaPrimary': 'Записаться на консультацию',
    'hero.ctaSecondary': 'Подробнее об услугах',
    'hero.note':
      'Мы не принадлежим ни одной клинике и действуем только в интересах наших клиентов.',
    'hero.cardTitle': 'Независимая юридическая экспертиза',
    'hero.cardText':
      'Помогаем оценить страны, клиники и программы до старта, минимизируем риски и выстраиваем оптимальную стратегию для вашей семьи.',

    'about.title': 'О нас',
    'about.text':
      'REPRONOVA — независимое международное агентство, специализирующееся на юридическом сопровождении программ суррогатного материнства и донорства гамет.',
    'about.body':
      'Мы выступаем мостом между будущими родителями, клиниками, суррогатными матерями и донорами, обеспечивая прозрачность, соблюдение законодательства и защиту прав ребёнка как в вашей стране, так и в юрисдикции, где проходит программа. Команда юристов и координаторов говорит на нескольких языках и сопровождает семьи от первой консультации до получения документов ребёнка.',

    'expertise.title': 'Наша экспертиза',
    'expertise.text':
      'Мы объединяем международное репродуктивное право, медицинскую экспертизу и практический опыт ведения сложных трансграничных кейсов.',
    'stats.years': 'лет опыта',
    'stats.countries': 'стран',
    'stats.families': 'поддержанных семей',
    'seen.label': 'О нас пишут',

    'founder.title': 'Основатель',
    'founder.subtitle': 'Лицо и философия агентства REPRONOVA.',
    'founder.badge': 'Основатель',
    'founder.name': 'Др. Анна Коваленко',
    'founder.text1':
      'Ведущий эксперт по международному репродуктивному праву с опытом работы в Европе, США, Азии и Латинской Америке. Более 20 лет консультирует семьи, клиники и государственные органы по вопросам суррогатного материнства и донорства гамет.',
    'founder.text2':
      'Автор более 50 научных и практических публикаций, спикер ключевых профильных конференций и эксперт для международных медиа.',
    'founder.button': 'Подробнее',

    'services.title': 'Услуги',
    'services.subtitle': 'Ключевые направления работы для родителей, агентств и клиник.',
    'services.surrogacy.title': 'Программы суррогатного материнства',
    'services.surrogacy.text':
      'Юридическое и организационное сопровождение программ в безопасных юрисдикциях: выбор страны, проверка контрактов и полная координация до выдачи документов ребёнка.',
    'services.donation.title': 'Донорство гамет',
    'services.donation.text':
      'Работа с проверенными банками доноров Европы, США, Канады и других стран. Юридический анализ договоров и защита прав родителей и ребёнка.',
    'services.audit.title': 'Независимый юридический аудит',
    'services.audit.text':
      'Проверка договоров, программ и клиник до подписания. Оценка рисков и сценариев признания родительства и гражданства ребёнка.',
    'services.link': 'Подробнее',

    'why.title': 'Почему REPRONOVA',
    'why.subtitle':
      'Три опоры нашего подхода: независимость, юридическая точность и международный опыт.',
    'why.independence.title': 'Независимость',
    'why.independence.text':
      'Мы не продаём пакеты клиник и не получаем комиссий за направление. Наш единственный интерес — ваша юридическая безопасность и реалистичный план.',
    'why.legal.title': 'Юридическая определённость',
    'why.legal.text':
      'Мы заранее просчитываем сценарии признания родительства и гражданства ребёнка в вашей стране, чтобы избежать неожиданных юридических ловушек.',
    'why.global.title': 'Международный охват',
    'why.global.text':
      'Отслеживаем изменения законодательства в 30+ юрисдикциях и оперативно обновляем стратегии для наших клиентов.',
    'why.button': 'Почему мы?',

    'testimonials.title': 'Отзывы',
    'testimonials.subtitle': 'Истории семей, которые уже прошли путь с REPRONOVA.',
    'testimonials.1.text':
      '«Благодаря REPRONOVA мы наконец держим на руках нашу дочь. Каждый шаг был прозрачным, а команда была на связи даже в выходные.»',
    'testimonials.1.name': 'София и Марко',
    'testimonials.1.location': 'Италия',
    'testimonials.2.text':
      '«Нам объяснили плюсы и минусы разных стран, помогли избежать юридически рискованных вариантов и выбрать оптимальный путь к нашему сыну.»',
    'testimonials.2.name': 'Алексей и Анна',
    'testimonials.2.location': 'Германия',
    'testimonials.3.text':
      '«Наш сложный кейс в Мексике завершился признанием родительства и гражданства ребёнка в обеих странах. Без REPRONOVA это было бы невозможно.»',
    'testimonials.3.name': 'Ли и Чен',
    'testimonials.3.location': 'Китай',

    'news.title': 'Новости и события',
    'news.subtitle': 'Главные изменения в законодательстве и практические кейсы наших клиентов.',
    'news.1.title': 'Греция 2025: новые возможности для однополых пар',
    'news.1.text':
      '1 декабря 2025 года вступают в силу поправки, расширяющие доступ к программам суррогатного материнства для однополых пар. Мы разбираем условия и риски.',
    'news.2.title': 'Мексика ограничивает коммерческое суррогатство с 2026 года',
    'news.2.text':
      'Что делать клиентам, уже находящимся в программе, и какие юрисдикции рассмотреть в качестве альтернативы — наш подробный разбор.',
    'news.3.title': 'Канада: успешный кейс двойного гражданства ребёнка',
    'news.3.text':
      'Наши клиенты получили паспорта двух стран в течение 45 дней после рождения ребёнка. Делимся тем, как была выстроена стратегия.',
    'news.readMore': 'Читать далее',
    'news.all': 'Все новости',

    'partners.title': 'Партнёры',
    'partners.subtitle':
      'Рекомендуемые клиники, юридические фирмы, криобанки и ДНК-лаборатории.',
    'partners.all': 'Все партнёры',

    'resources.title': 'Материалы',
    'resources.text': 'Юридические обзоры, практические руководства и ответы на частые вопросы.',
    'resources.legislation.title': 'Законодательство',
    'resources.legislation.text':
      'Обзор ключевых норм по суррогатному материнству и донорству гамет в более чем 30 странах.',
    'resources.publications.title': 'Публикации',
    'resources.publications.text':
      'Статьи и исследования наших экспертов в области международного репродуктивного права.',
    'resources.faq.title': 'FAQ',
    'resources.faq.text':
      'Ответы на самые частые вопросы будущих родителей, агентств и клиник.',
    'resources.guides.title': 'Гайды',
    'resources.guides.text':
      'Практические чек-листы и пошаговые инструкции по выбору страны и построению стратегии.',
    'resources.open': 'Открыть',

    'contact.title': 'Контакты',
    'contact.text':
      'Оставьте краткий запрос — уже на ознакомительной консультации мы предложим несколько возможных стратегий.',
    'contact.label.email': 'Email:',
    'contact.label.phone': 'Телефон:',
    'contact.label.location': 'Локация:',
    'contact.location.value': 'Швейцария · Сопровождение клиентов по всему миру',
    'contact.placeholder.name': 'Ваше имя',
    'contact.placeholder.email': 'Email',
    'contact.placeholder.country': 'Страна проживания',
    'contact.placeholder.phone': 'Телефон (необязательно)',
    'contact.placeholder.message': 'Кратко опишите вашу ситуацию',
    'contact.button': 'Отправить запрос',
    'contact.success': 'Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней.',

    'footer.brand.title': 'REPRONOVA',
    'footer.brand.text':
      'Международное агентство репродуктивного права с 2004 года.\nЮридическое сопровождение программ суррогатного материнства и донорства гамет.',
    'footer.about.title': 'О нас',
    'footer.about.mission': 'Миссия',
    'footer.about.team': 'Команда',
    'footer.about.founder': 'Основатель',
    'footer.about.media': 'СМИ о нас',
    'footer.services.title': 'Услуги',
    'footer.services.all': 'Полный список',
    'footer.services.legalOpinions': 'Юридические заключения',
    'footer.services.advisor': 'Независимый юридический советник',
    'footer.resources.title': 'Материалы',
    'footer.resources.legislation': 'Законодательство',
    'footer.resources.publications': 'Публикации',
    'footer.resources.faq': 'FAQ',
    'footer.resources.guides': 'Гайды',
    'footer.news.title': 'Новости и события',
    'footer.news.industry': 'Новости отрасли',
    'footer.news.our': 'Наши мероприятия',
    'footer.news.other': 'Другие события',
    'footer.partners.title': 'Партнёры',
    'footer.partners.clinics': 'Клиники',
    'footer.partners.lawFirms': 'Юридические фирмы',
    'footer.partners.cryobanks': 'Криобанки',
    'footer.partners.dnaLabs': 'ДНК-лаборатории',
    'footer.subscribe.title': 'Подписка',
    'footer.subscribe.placeholder': 'ваш@email.com',
    'footer.subscribe.button': 'Подписаться',
    'footer.subscribe.success': 'Спасибо за подписку!',
    'footer.bottom': '© 2025 REPRONOVA. Все права защищены.'
  }
};

// ==================== I18N LOGIC ====================
function applyTranslations() {
  const dict = translations[currentLang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = dict[key];
    if (!value) return;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = value;
    } else {
      // для <strong> и обычных блоков — просто текст
      el.textContent = value;
    }
  });
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('repronovaLang', lang);

  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    langSwitcher.querySelectorAll('span').forEach(sp => {
      sp.classList.toggle('active', sp.dataset.lang === lang);
    });
  }

  applyTranslations();
}

// Инициализация языка при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('repronovaLang');
  const browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);

  if (saved && translations[saved]) {
    currentLang = saved;
  } else if (translations[browser]) {
    currentLang = browser;
  } else {
    currentLang = 'en';
  }

  setLanguage(currentLang);
});

// Обработчик переключателя
const langSwitcher = document.getElementById('lang-switcher');
if (langSwitcher) {
  langSwitcher.addEventListener('click', e => {
    const span = e.target.closest('span[data-lang]');
    if (!span) return;
    const lang = span.dataset.lang;
    setLanguage(lang);
  });
}

// ==================== FORMS ====================

// Contact form (fake send)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const dict = translations[currentLang] || translations.en;
    formMessage.textContent =
      dict['contact.success'] || translations.en['contact.success'];
    contactForm.reset();
  });
}

// Subscribe form
const subscribeForm = document.getElementById('subscribe-form');
const subscribeMessage = document.getElementById('subscribe-message');

if (subscribeForm && subscribeMessage) {
  subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('subscribe-email');
    if (!emailInput || !emailInput.value.trim()) return;

    const dict = translations[currentLang] || translations.en;
    subscribeMessage.textContent =
      dict['footer.subscribe.success'] || translations.en['footer.subscribe.success'];
    subscribeForm.reset();
  });
}
