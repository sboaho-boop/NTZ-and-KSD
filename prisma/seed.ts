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
    update: {},
    create: {
      name: "Franck Nyimilongo Pieme",
      slug: "frank-nyimilongo-pieme",
      position: "Associé Gérant — NTZ SPRL\nDirecteur Général — KSD SARL",
      biography:
        "Franck Nyimilongo Pieme is a business executive based in the Democratic Republic of Congo, providing leadership across NTZ SPRL and KSD SARL.\n\nThrough his leadership, the companies pursue commercial opportunities while developing relationships with clients, partners and stakeholders.\n\nHis approach combines deep understanding of the Congolese business environment with strategic thinking and a commitment to creating lasting value.",
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
