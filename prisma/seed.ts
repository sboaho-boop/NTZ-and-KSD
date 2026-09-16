import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  await prisma.admin.upsert({
    where: { email: "admin@ntz-ksd.com" },
    update: {},
    create: {
      email: "admin@ntz-ksd.com",
      password: adminPassword,
      name: "Administrator",
      role: "admin",
    },
  });

  // Create companies
  const ntz = await prisma.company.upsert({
    where: { slug: "ntz-sprl" },
    update: {},
    create: {
      name: "NTZ SPRL",
      slug: "ntz-sprl",
      description:
        "A Congolese company led by its Associé Gérant, Franck Nyimilongo Pieme. Operating from Kinshasa-Gombe, NTZ SPRL pursues strategic business opportunities and develops lasting commercial relationships.",
      leadership: "Franck Nyimilongo Pieme — Associé Gérant",
      contactInfo: JSON.stringify({
        address: "Avenue Katanga N°02, Appartement A1, Kinshasa-Gombe",
        city: "Kinshasa",
        country: "Democratic Republic of Congo",
        email: "fnyimilongo@yahoo.fr",
      }),
    },
  });

  const ksd = await prisma.company.upsert({
    where: { slug: "ksd-sarl" },
    update: {},
    create: {
      name: "KSD SARL",
      slug: "ksd-sarl",
      brandName: "Kasai Sud Diamant",
      description:
        "A company operating under the Kasai Sud Diamant identity. KSD SARL connects opportunity, resources and commercial ambition in the Democratic Republic of Congo.",
      leadership: "Franck Nyimilongo Pieme — Directeur Général",
      contactInfo: JSON.stringify({
        address: "Kinshasa-Gombe",
        city: "Kinshasa",
        country: "Democratic Republic of Congo",
        email: "fpnyimilongo@gmail.com",
      }),
    },
  });

  const terrakili = await prisma.company.upsert({
    where: { slug: "terrakili-sarl" },
    update: {},
    create: {
      name: "Terrakili SARL",
      slug: "terrakili-sarl",
      description:
        "A Congolese agricultural development company incorporated in the Democratic Republic of Congo. Terrakili is the project owner and sponsor of the Mweka Agri-Project and holds the leasehold title to an agricultural concession of about 48,000 hectares in the Kasai province, awarded by decrees of the Kasai Provincial Governor and the President of the Republic.",
      leadership: "Serge Ngandu & Franck Nyimilongo Pieme — Founders",
      contactInfo: JSON.stringify({
        address: "Kinshasa-Gombe",
        city: "Kinshasa",
        country: "Democratic Republic of Congo",
        email: "fnyimilongo@yahoo.fr",
      }),
    },
  });

  // Create activities
  const activities = [
    {
      title: "Natural Resources",
      slug: "natural-resources",
      description:
        "We identify and develop opportunities within the natural resources sector, working with partners to unlock value from the Democratic Republic of Congo's significant mineral wealth.",
      image: "/images/diamond.jpg",
      order: 1,
      companyId: ksd.id,
    },
    {
      title: "Trading & Commerce",
      slug: "trading-commerce",
      description:
        "Our trading operations connect Congolese products and resources with regional and international markets, building reliable supply chains and commercial relationships.",
      image: "/images/business-strategy.jpg",
      order: 2,
      companyId: null,
    },
    {
      title: "Investment & Development",
      slug: "investment-development",
      description:
        "We pursue investment opportunities that contribute to economic development in the DRC, focusing on sustainable projects with long-term commercial viability.",
      image: "/images/cranes.jpg",
      order: 3,
      companyId: ntz.id,
    },
    {
      title: "Strategic Partnerships",
      slug: "strategic-partnerships",
      description:
        "We develop partnerships with local and international businesses, institutions and stakeholders to create mutually beneficial commercial opportunities.",
      image: "/images/team.jpg",
      order: 4,
      companyId: null,
    },
    {
      title: "Agriculture & Agribusiness",
      slug: "agriculture-agribusiness",
      description:
        "Through Terrakili SARL, we are developing the Mweka Agri-Project — a commercial crop farming operation in the Kasai province growing maize, cassava, soybeans, beans, banana and cereals. Using modern machinery, drones, GIS and IoT, it combines sustainable production with job creation and training for local farmers.",
      image: "/images/mweka-site-1.jpg",
      order: 5,
      companyId: terrakili.id,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: { image: activity.image },
      create: activity,
    });
  }

  // Create leadership
  await prisma.leadership.upsert({
    where: { slug: "frank-nyimilongo-pieme" },
    update: { photo: "/images/leadership-franck.jpg" },
    create: {
      name: "Franck Nyimilongo Pieme",
      slug: "frank-nyimilongo-pieme",
      position: "Associé Gérant — NTZ SPRL\nDirecteur Général — KSD SARL\nCo-Founder — Terrakili SARL",
      biography:
        "Franck Nyimilongo Pieme is a business executive based in the Democratic Republic of Congo, providing leadership across NTZ SPRL and KSD SARL.\n\nHe is also a founder of Terrakili SARL, the company behind the Mweka Agri-Project, a commercial crop farming initiative in the Kasai province. Together with his co-founders, he brings over 50 years of combined experience in agriculture, agri-business and business management across Southern Africa, and is committed to strengthening food security in the DRC.\n\nHis approach combines a deep understanding of the Congolese business environment with strategic thinking and a commitment to creating lasting value.",
      photo: "/images/leadership-franck.jpg",
    },
  });

  await prisma.leadership.upsert({
    where: { slug: "serge-ngandu" },
    update: {},
    create: {
      name: "Serge Ngandu",
      slug: "serge-ngandu",
      position: "Co-Founder — Terrakili SARL",
      biography:
        "Serge Ngandu is a Congolese businessman and one of the founders and shareholders of Terrakili SARL, the project owner and sponsor of the Mweka Agri-Project.\n\nTogether with his co-founders, he brings over 50 years of combined experience in agriculture, agri-business and business management in Southern Africa. He is passionate about developing a crop farming operation that contributes to food security in the Democratic Republic of Congo.\n\nThe initiative has received the blessing of local authorities, who made land available to Terrakili for the commercial farming development in the Kasai province.",
      photo: "/images/leadership-serge.jpg",
    },
  });

  // Create placeholder projects
  await prisma.project.upsert({
    where: { slug: "mineral-exploration-initiative" },
    update: { image: "/images/industry.jpg" },
    create: {
      name: "Mineral Exploration Initiative",
      slug: "mineral-exploration-initiative",
      location: "Kasai Region, DRC",
      sector: "Natural Resources",
      status: "Planning",
      description:
        "A preliminary exploration initiative targeting mineral-rich areas in the Kasai region. This project is in its early planning stages and focuses on identifying viable resource extraction opportunities.",
      image: "/images/industry.jpg",
      companyId: ksd.id,
      featured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: "kinshasa-commercial-hub" },
    update: { image: "/images/cranes.jpg" },
    create: {
      name: "Kinshasa Commercial Hub",
      slug: "kinshasa-commercial-hub",
      location: "Kinshasa-Gombe, DRC",
      sector: "Investment & Development",
      status: "Planning",
      description:
        "A commercial development project in Kinshasa-Gombe aimed at creating modern business infrastructure. Currently in the feasibility and planning stage.",
      image: "/images/cranes.jpg",
      companyId: ntz.id,
      featured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: "mweka-agri-project" },
    update: { image: "/images/mweka-site-1.jpg" },
    create: {
      name: "Mweka Agri-Project",
      slug: "mweka-agri-project",
      location: "Mweka Territory, Kasai Province, DRC",
      sector: "Agriculture & Agribusiness",
      status: "Planning",
      description:
        "A commercial crop farming project developed by Terrakili SARL on an agricultural concession of about 48,000 hectares in the Kasai province. The first phase covers approximately 1,310 hectares near Ndambo, growing maize, cassava, soybeans, beans, banana and cereals.\n\nThe concession — about 25 km from the town of Mweka and served by the Ilebo–Lubumbashi railway — was awarded to Terrakili by decrees of the Kasai Provincial Governor and the President of the Republic, and is leased for 25 years, renewable. The project uses modern machinery, drones, GIS and IoT, and is managed in partnership with experienced South African commercial farmers as part of a wider commitment to job creation, smallholder farmer training and food security.",
      image: "/images/mweka-site-1.jpg",
      gallery: JSON.stringify([
        "/images/mweka-site-1.jpg",
        "/images/mweka-site-2.jpg",
        "/images/mweka-field.jpg",
      ]),
      companyId: terrakili.id,
      featured: true,
    },
  });

  // Create placeholder news
  await prisma.news.upsert({
    where: { slug: "establishment-of-ntz-sprl-and-ksd-sarl" },
    update: { image: "/images/office.jpg" },
    create: {
      title: "Establishment of NTZ SPRL and KSD SARL",
      slug: "establishment-of-ntz-sprl-and-ksd-sarl",
      category: "Company News",
      content:
        "NTZ SPRL and KSD SARL (Kasai Sud Diamant) have been established as Congolese companies operating from Kinshasa, Democratic Republic of Congo.\n\nUnder the leadership of Franck Nyimilongo Pieme, the companies are positioned to pursue strategic business opportunities in the DRC and develop lasting commercial relationships with partners and stakeholders.\n\nBoth companies bring a commitment to professionalism, integrity and long-term value creation to the Congolese business landscape.",
      summary:
        "NTZ SPRL and KSD SARL (Kasai Sud Diamant) have been established in Kinshasa, DRC, under the leadership of Franck Nyimilongo Pieme.",
      published: true,
      companyId: null,
    },
  });

  await prisma.news.upsert({
    where: { slug: "ksd-sarl-kasai-sud-diamant-launch" },
    update: { image: "/images/diamond.jpg" },
    create: {
      title: "KSD SARL — Kasai Sud Diamant Launch",
      slug: "ksd-sarl-kasai-sud-diamant-launch",
      category: "Announcements",
      content:
        "KSD SARL has officially launched its operations under the Kasai Sud Diamant brand identity.\n\nThe company will focus on opportunities in the natural resources sector, leveraging the DRC's significant mineral wealth and the strategic location of the Kasai region.\n\nKSD SARL aims to build partnerships that create value for all stakeholders while contributing to economic development in the region.",
      summary:
        "KSD SARL launches operations under the Kasai Sud Diamant brand, focusing on natural resources in the DRC.",
      published: true,
      companyId: ksd.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: "building-business-in-drc" },
    update: { image: "/images/team-working.jpg" },
    create: {
      title: "Building Business in the Democratic Republic of Congo",
      slug: "building-business-in-drc",
      category: "Industry",
      content:
        "The Democratic Republic of Congo presents significant opportunities for business development across multiple sectors.\n\nWith abundant natural resources, a growing economy and strategic positioning in Central Africa, the DRC offers a compelling environment for companies focused on long-term value creation.\n\nNTZ SPRL and KSD SARL are committed to contributing to this growth while maintaining the highest standards of business practice.",
      summary:
        "Exploring the opportunities and challenges of building sustainable business in the DRC.",
      published: true,
    },
  });

  await prisma.news.upsert({
    where: { slug: "terrakili-agricultural-concession-kasai" },
    update: { image: "/images/mweka-field.jpg" },
    create: {
      title: "Terrakili SARL Gains 48,000-Hectare Agricultural Concession in Kasai",
      slug: "terrakili-agricultural-concession-kasai",
      category: "Announcements",
      content:
        "Terrakili SARL has secured an agricultural concession of about 48,000 hectares in the Mweka territory of the Kasai province, Democratic Republic of Congo.\n\nThe land was acquired through a thorough process involving traditional authorities, local departments of the Ministry of Land Affairs and the Ministry of Agriculture, and the provincial and national governments. Decrees were signed by the Governor of the Kasai province for 15,000 hectares and by the President of the Republic for 33,000 hectares.\n\nThe concession comprises thirteen blocks across eight sites — including Ndengamongo II, Itunga Mpende, Ndambo, Itapanya Camp, Inema Makolo, Malongo III, Tena Mashobi and Kin-A-Mbuom — surveyed and demarcated with the Mweka cadastre in 2020. The state leases the concession to Terrakili for 25 years, renewable without limitation.\n\nFarming is planned to begin on the focus areas of Ndambo Bloc 1 and Bloc 2, which together cover about 1,310 hectares.",
      summary:
        "Terrakili SARL holds a 48,000-hectare agricultural concession in the Kasai province, awarded by provincial and national decrees and leased for 25 years.",
      published: true,
      companyId: terrakili.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: "mweka-agri-project-commercial-farming" },
    update: { image: "/images/mweka-site-2.jpg" },
    create: {
      title: "The Mweka Agri-Project: Commercial Farming for Food Security",
      slug: "mweka-agri-project-commercial-farming",
      category: "Industry",
      content:
        "The Mweka Agri-Project is a commercial crop farming initiative developed by Terrakili SARL in the Kasai province of the Democratic Republic of Congo.\n\nThe first phase covers approximately 1,310 hectares near the village of Ndambo, growing maize, cassava, soybeans, beans, banana and cereals. Crops are cultivated with modern machinery and technology — including drones for crop surveillance and spraying, and GIS and IoT for precision farm management.\n\nExperienced South African commercial farmers will manage operations and provide training and upskilling for local personnel, as part of the project's wider goals of creating over 500 permanent jobs, supporting smallholder farmers with training and a market for their produce, and building essential community facilities.\n\nThe project sits about 25 km from the town of Mweka, on the Ilebo–Lubumbashi railway line that links the operation to major markets in Kinshasa and Lubumbashi.",
      summary:
        "The Mweka Agri-Project combines commercial crop farming with job creation, smallholder training and community development in the Kasai province.",
      published: true,
      companyId: terrakili.id,
    },
  });

  // Create settings
  const settings = [
    { key: "site_name", value: "NTZ SPRL & KSD SARL" },
    { key: "site_tagline", value: "Building Businesses. Creating Value." },
    { key: "management_quote", value: "Our objective is not simply to pursue opportunities, but to build businesses and relationships that create lasting value." },
    { key: "quote_author", value: "Franck Nyimilongo Pieme" },
    { key: "map_center_lat", value: "-4.3217" },
    { key: "map_center_lng", value: "15.3125" },
    { key: "ntz_address", value: "Avenue Katanga N°02, Appartement A1, Kinshasa-Gombe, Democratic Republic of Congo" },
    { key: "ksd_address", value: "Kinshasa-Gombe, Democratic Republic of Congo" },
    { key: "email_primary", value: "fnyimilongo@yahoo.fr" },
    { key: "email_secondary", value: "fpnyimilongo@gmail.com" },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
