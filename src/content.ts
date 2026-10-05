export const company = {
  name: "EMPRESA",
  descriptor: "Engenharia e Energia",
  fullName: "EMPRESA — Engenharia e Energia",
  territory: "Amazonas",
  description:
    "Implantação civil e elétrica de usinas fotovoltaicas e instalações de geração com motores e geradores a diesel para empresas do setor de energia no Amazonas.",
  contacts: {
    email: "",
    phone: "",
    phoneHref: "", // Ex.: tel:+55..., somente depois de confirmar o número.
    whatsappUrl: "", // URL oficial, somente depois de confirmar o número.
    location: "Atendimento a empresas do setor de energia no Amazonas.",
    pending:
      "Os canais de contato serão disponibilizados após a definição dos dados da empresa.",
  },
};

export const services = [
  {
    id: "civil",
    number: "01",
    title: "Infraestrutura civil",
    description:
      "Preparação do terreno, fundações, bases e obras de suporte para instalações de geração.",
    category: "Infraestrutura",
  },
  {
    id: "eletrica",
    number: "02",
    title: "Instalações elétricas",
    description:
      "Implantação elétrica e integração dos equipamentos que compõem os sistemas de geração.",
    category: "Infraestrutura",
  },
  {
    id: "geracao",
    number: "03",
    title: "Sistemas de geração",
    description:
      "Implantação de usinas fotovoltaicas e instalações com motores e geradores a diesel.",
    category: "Geração a diesel",
  },
];

export const copy = {
  nav: {
    company: "Empresa",
    services: "Serviços",
    gallery: "Frentes de atuação",
    contact: "Contato",
    regional: "Nossa atuação",
    expertise: "Expertise",
  },
  proposal: "Solicitar proposta",
  talk: "Fale com a equipe",
  otherConcepts: "Ver outros conceitos",
  imageNote: "Imagem ilustrativa",
  footerNote: "Conceito visual · Imagens ilustrativas",
  contact: {
    label: "Contato",
    intro:
      "Conte sobre o local, o tipo de geração e a etapa de implantação do seu projeto.",
    demo: "Formulário demonstrativo. Os dados não são enviados nem armazenados.",
    success:
      "Validação concluída. Esta demonstração não enviou nem armazenou seus dados.",
    open: "Apresentar meu projeto",
    submit: "Validar demonstração",
    close: "Fechar formulário",
  },
  industrial: {
    title: ["Engenharia que coloca", "projetos em operação"],
    subtitle: "Implantação civil e elétrica para geração de energia.",
    aside: "Soluções em energia para o desenvolvimento da Amazônia.",
    serviceLabel: "Nossos serviços",
    serviceTitle: "Da base à instalação",
    serviceIntro:
      "Atuamos nas frentes civil e elétrica para a implantação de sistemas de geração de energia.",
    contactTitle: "Vamos conversar\nsobre o seu projeto?",
    contactDescription:
      "Uma conversa para entender sua necessidade e definir o escopo de engenharia e energia.",
  },
  regional: {
    title: "Presença\nem campo.",
    accentTitle: "Energia para\navançar.",
    subtitle: "Engenharia e implantação de usinas no Amazonas.",
    explore: "Conheça nossa atuação",
    sectionTitle: "Projetos conectados\nao território.",
    serviceTitle: "Frentes civis e elétricas\npara cada etapa da implantação.",
    body: "Da preparação do terreno às instalações elétricas, nosso escopo reúne a implantação de usinas solares e de sistemas com grupos geradores, com atenção às condições e necessidades da região amazônica.",
    contactTitle: "Vamos construir\no próximo projeto.",
    contactDescription:
      "Energia e infraestrutura para novas possibilidades na Amazônia.",
  },
  portfolio: {
    title: "Da base civil à\ninstalação\nelétrica.",
    subtitle:
      "Conheça nossa atuação na implantação de sistemas de geração de energia.",
    explore: "Explore as frentes de atuação",
    galleryTitle: "Frentes de atuação",
    galleryNote:
      "Seleção ilustrativa de serviços. As imagens não representam projetos realizados pela empresa.",
    contactTitle: "Seu próximo projeto\ncomeça com uma conversa.",
    contactDescription:
      "Implantação civil e elétrica para geração de energia no Amazonas.",
  },
};

export const concepts = [
  {
    id: "industrial",
    number: "01",
    title: "Industrial",
    description:
      "Precisão, força e escala. Tipografia condensada, fotografia panorâmica e serviços em linhas.",
    palette: ["#ffcf25", "#171a19", "#f7f7f5"],
    previewTitle: "Engenharia que coloca projetos em operação.",
  },
  {
    id: "regional",
    number: "02",
    title: "Regional",
    description:
      "Presença no território. Composição editorial, tons naturais e a paisagem amazônica.",
    palette: ["#edE8dc", "#1c3929", "#9d5038"],
    previewTitle: "Presença em campo. Energia para avançar.",
  },
  {
    id: "portfolio",
    number: "03",
    title: "Portfólio",
    description:
      "Clareza técnica. Abertura dividida, azul-marinho e frentes de atuação em uma galeria.",
    palette: ["#ffffff", "#0b2336", "#b8c5cc"],
    previewTitle: "Da base civil à instalação elétrica.",
  },
] as const;

// Enquadramentos das fotografias contidas nas referências locais.
// x/y/w/h usam o sistema de coordenadas de baseWidth; nenhum texto de interface
// da referência faz parte dos enquadramentos. Veja public/images/SOURCES.md.
export interface PhotoAsset {
  src: string;
  baseWidth: number;
  sourceHeight?: number;
  x: number;
  y: number;
  w: number;
  h: number;
  alt: string;
}
export const photos = {
  industrialHero: {
    src: "/images/industrial.png",
    baseWidth: 1024,
    x: 0,
    y: 359,
    w: 1024,
    h: 448,
    alt: "Cena ilustrativa de grupos geradores em uma instalação próxima à floresta e ao rio.",
  },
  industrialElectrical: {
    src: "/images/industrial.png",
    baseWidth: 1024,
    x: 625,
    y: 987,
    w: 353,
    h: 230,
    alt: "Cena ilustrativa de trabalho em um painel elétrico industrial.",
  },
  regionalHero: {
    src: "/images/regional.png",
    baseWidth: 768,
    x: 363,
    y: 56,
    w: 405,
    h: 517,
    alt: "Vista ilustrativa de uma instalação de geração solar junto à floresta amazônica e ao rio.",
  },
  regionalTeam: {
    src: "/images/regional.png",
    baseWidth: 768,
    x: 44,
    y: 721,
    w: 421,
    h: 216,
    alt: "Cena ilustrativa de profissionais em um terreno com estruturas fotovoltaicas.",
  },
  portfolioHero: {
    src: "/images/portfolio.png",
    baseWidth: 768,
    x: 345,
    y: 56,
    w: 423,
    h: 442,
    alt: "Painéis fotovoltaicos em uma paisagem amazônica. Imagem ilustrativa.",
  },
  generator: {
    src: "/images/portfolio.png",
    baseWidth: 768,
    x: 31,
    y: 593,
    w: 435,
    h: 296,
    alt: "Grupo gerador a diesel em ambiente industrial. Imagem ilustrativa.",
  },
  electrical: {
    src: "/images/portfolio.png",
    baseWidth: 768,
    x: 493,
    y: 593,
    w: 244,
    h: 296,
    alt: "Profissionais junto a painéis e instalações elétricas. Imagem ilustrativa.",
  },
  river: {
    src: "/images/industrial.png",
    baseWidth: 1024,
    x: 634,
    y: 1255,
    w: 385,
    h: 226,
    alt: "Paisagem ilustrativa de rio e floresta na Amazônia.",
  },
} as const;
export type PhotoName = keyof typeof photos;
export type Concept = (typeof concepts)[number]["id"];

export const galleryItems: {
  id: string;
  title: string;
  category: string;
  photo: PhotoName;
  description: string;
}[] = [
  {
    id: "diesel",
    title: "Sistemas de geração",
    category: "Geração a diesel",
    photo: "generator",
    description: "Instalações de geração com motores e geradores a diesel.",
  },
  {
    id: "eletrica",
    title: "Instalações elétricas",
    category: "Infraestrutura",
    photo: "electrical",
    description: services[1].description,
  },
  {
    id: "solar",
    title: "Usinas fotovoltaicas",
    category: "Fotovoltaica",
    photo: "portfolioHero",
    description: "Implantação civil e elétrica de usinas de geração solar.",
  },
  {
    id: "civil",
    title: "Infraestrutura civil",
    category: "Infraestrutura",
    photo: "regionalTeam",
    description: services[0].description,
  },
];
export const filters = [
  "Todas",
  "Fotovoltaica",
  "Geração a diesel",
  "Infraestrutura",
];
