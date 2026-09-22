export type Opportunity = {
  id: string;
  slug: string;
  entity: string;
  name: string;
  sector: string;
  location: string;
  status: string;
  summary: string;
  description: string;
  highlights: string[];
  collaboration: string[];
  image: string;
  gallery: string[];
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    slug: "kasai-sud-diamant",
    entity: "KASAI SUD DIAMANT SARL",
    name: "Kasai Sud Diamant (KSD)",
    sector: "Diamond Mining",
    location: "Tshikapa, Kasai Province, DRC",
    status: "Open to Partnership",
    summary:
      "A diamond company holding two exploitation permits — PEPM 9709 and PE 571 — covering 60 carrés (51 km²) near Tshikapa, with artisanal production already under way.",
    description:
      "Kasai Sud Diamant SARL (KSD) is a diamond company incorporated in April 2006, dedicated to the research, exploitation and commercialisation of mineral substances (diamond). Its registered office is Avenue Katanga N°2, App. A1, Kinshasa/Gombe. The company is managed by Franck Nyimilongo Pieme and held by New Terra-Z SARL and Ets II & M Fils.\n\nKSD holds two exploitation permits near Tshikapa in the Kasai province: PEPM 9709 (34 carrés, 28.90 km², granted 23 December 2019, 10-year validity) and PE 571 (26 carrés, 22.10 km², granted 13 September 2006, 15-year validity) — a combined 60 carrés covering 51 km². Both titles are in renewal under force majeure, with the possibility of an additional three-year period.\n\nArtisanal diamond exploitation is already under way on PE 571, and exploration spend is estimated at USD 11 million, recoverable before tax and profit-sharing.",
    highlights: [
      "Incorporated April 2006 — SARL, share capital USD 2,000 (100 shares)",
      "Permits: PEPM 9709 (28.90 km²) and PE 571 (22.10 km²) — 60 carrés / 51 km² total",
      "Artisanal diamond exploitation under way on PE 571",
      "Exploration spend estimated at USD 11M, recoverable before tax and profit-sharing",
      "Manager: Franck Nyimilongo Pieme",
      "Shareholders: New Terra-Z SARL and Ets II & M Fils",
    ],
    collaboration: [
      "Equity participation (prise de participation)",
      "Joint venture to develop the exploitation",
      "Possibility to acquire the title or the company",
    ],
    image: "/images/ksd-location-map.jpeg",
    gallery: [
      "/images/ksd-location-map.jpeg",
      "/images/ksd-pe571-artisanal-1.jpeg",
      "/images/ksd-pe571-artisanal-2.jpeg",
    ],
  },
  {
    id: "2",
    slug: "chadila",
    entity: "CHADILA SARL",
    name: "Chadila",
    sector: "Diamond, Hydroelectric & Quarry",
    location: "Tshikapa, Kasai Province, DRC",
    status: "Open to Partnership",
    summary:
      "Diamond permit PE 569 at Tshiminina (~1.49M carats inferred), the Mbimbi falls with ~100 MW hydroelectric potential, and a granite quarry — all within 20 km of Tshikapa on the Kasai river.",
    description:
      "CHADILA SARL (RCCM CD/KNG/RCCM/17-B-00363, incorporated 6 April 2017, share capital USD 100,000) researches, exploits and commercialises precious mineral substances (diamond). Managed by Franck Nyimilongo Pieme and held by KSD and New Terra-Z, its registered office is 02 Avenue Katanga, App. A1, Kinshasa/Gombe.\n\nThe company holds diamond permit PE 569, located about 20 km (as the crow flies) from Tshikapa and roughly 100 km from the Angolan border on the Kasai river, and is acquiring a quarry permit. Inferred resources in the Tshiminina target zone total 1,488,350 carats across four terraces and Île Tshidila. A detailed geological evaluation of the Tshiminina reserves — 24 shafts across 10 blocks — estimates 54,553 carats (geology) and 50,357 carats (mining), with about 45,321 carats recoverable. Prospection and shaft-drilling have been carried out, and river exploitation on the Kasai (Tshidila) is planned.\n\nBeyond diamonds, PE 569 covers the Mbimbi falls on the Kasai river, which present a hydroelectric potential estimated at 100 MW — far beyond the current 2 MW Lungudi plant that underserves Tshikapa and the province — as well as granite rock massifs suitable for a quarry. The permit is in renewal under force majeure, with the possibility of an additional three-year period.",
    highlights: [
      "Incorporated 6 April 2017 — SARL, share capital USD 100,000",
      "Diamond permit PE 569; quarry permit being acquired",
      "Tshiminina inferred resources: 1,488,350 carats; ~45,321 carats recoverable",
      "Mbimbi falls hydroelectric potential: ~100 MW (vs. the 2 MW Lungudi plant today)",
      "Granite rock massifs suitable for a quarry on PE 569",
      "~20 km from Tshikapa, ~100 km from the Angolan border on the Kasai river",
      "Manager: Franck Nyimilongo Pieme; shareholders: KSD and New Terra-Z",
    ],
    collaboration: [
      "Open the share capital to a financial contribution or joint venture for mining",
      "Obtain and exploit the right to build and operate a hydroelectric plant (study already held)",
      "Jointly exploit the granite quarry (rights-granting process under way)",
    ],
    image: "/images/chadila-mbimbi-falls-1.jpeg",
    gallery: [
      "/images/chadila-location-1.jpeg",
      "/images/chadila-location-2.jpeg",
      "/images/chadila-blocks.jpeg",
      "/images/chadila-kasai-river-1.jpeg",
      "/images/chadila-kasai-river-2.jpeg",
      "/images/chadila-mbimbi-falls-1.jpeg",
      "/images/chadila-mbimbi-falls-2.jpeg",
      "/images/chadila-granite-quarry-1.jpeg",
      "/images/chadila-granite-quarry-2.jpeg",
    ],
  },
  {
    id: "3",
    slug: "longatshimo-mining",
    entity: "LONGATSHIMO MINING COMPANY",
    name: "Longatshimo Mining",
    sector: "Diamond Mining",
    location: "Dundu, Kasai Province, DRC",
    status: "Open to Partnership",
    summary:
      "A diamond company holding permits PEPM 484–491, located about 4 km from the Angolan border at Dundu, astride the Longatshimo river.",
    description:
      "Longatshimo Mining Company is a diamond company incorporated in May 2005 (SARL, share capital USD 50,000, 100 shares), dedicated to the research, exploitation and commercialisation of mineral substances (diamond). Its registered office is 6 Avenue du Lac, Kinshasa/Limete. It is managed by Franck Nyimilongo and held by Marie-Chantale Kashama and Franck Nyimilongo.\n\nThe company holds permits PEPM 484 to 491, currently pending transformation into exploitation permits (PE) under force majeure. The site lies about 4 km from the Angolan border at the town of Dundu, astride the Longatshimo river. Several drilling and sounding campaigns have already been carried out.",
    highlights: [
      "Incorporated May 2005 — SARL, share capital USD 50,000 (100 shares)",
      "Permits: PEPM 484–491 (pending transformation into PE)",
      "Location: ~4 km from the Angolan border at Dundu, on the Longatshimo river",
      "Multiple drilling and sounding campaigns completed",
      "Manager: Franck Nyimilongo; shareholder: Marie-Chantale Kashama",
    ],
    collaboration: [
      "Integration by share transfer (cession de parts)",
      "Creation of a joint venture",
    ],
    image: "/images/longatshimo-location.png",
    gallery: [
      "/images/longatshimo-location.png",
      "/images/longatshimo-drilling-1.jpg",
      "/images/longatshimo-drilling-2.jpg",
    ],
  },
  {
    id: "4",
    slug: "new-terra-z",
    entity: "NEW TERRA-Z SARL",
    name: "New Terra-Z",
    sector: "Forestry & Agriculture",
    location: "Mweka Territory, Kasai Province, DRC",
    status: "Open to Partnership",
    summary:
      "Forestry and agricultural concessions in Mweka territory — a perpetual 2,000 ha emphyteutic concession, 11,000 ha under a 25-year renewable contract, and 30,000 ha being acquired.",
    description:
      "New Terra-Z researches, exploits and commercialises forest and agricultural products. Incorporated as a SARL (RCCM CD/KIN/RCCM/14-B-3604 of 12 September 2014, share capital USD 10,000), its registered office is 02 Avenue Tabou Ley (ex Tombalbaye), App. A1, Kinshasa/Gombe. It is managed by Franck Nyimilongo Pieme and held by Franck Nyimilongo Pieme and Pieme Ndibue Célestin.\n\nAll of the company's concessions are located in Mweka territory, Kasai province: a perpetual emphyteutic concession of 2,000 hectares, 11,000 hectares acquired under a 25-year renewable concession contract, and a further 30,000 hectares in the process of being acquired. The land carries extremely diverse forest species — a richness that in its time gave rise to the Kasai forestry exploitation company — including notable specimens such as Entandrophragma angolensis (Tiama) and Autranella congolensis (Mukulungu).",
    highlights: [
      "Incorporated 12 September 2014 — SARL, share capital USD 10,000",
      "Perpetual emphyteutic concession: 2,000 ha in Mweka territory",
      "11,000 ha under a 25-year renewable concession contract",
      "A further 30,000 ha of land being acquired",
      "Highly diverse forest species (e.g. Tiama, Mukulungu)",
      "Manager: Franck Nyimilongo Pieme",
    ],
    collaboration: [
      "Creation of a joint venture",
      "Equity participation by share transfer",
    ],
    image: "/images/newterra-forest-1.jpeg",
    gallery: [
      "/images/newterra-forest-1.jpeg",
      "/images/newterra-forest-2.png",
    ],
  },
  {
    id: "5",
    slug: "prediga-group",
    entity: "PREDIGA GROUP SARL",
    name: "Prediga Group",
    sector: "Rubber, Agriculture & Agro-processing",
    location: "Ngalikoko, Tshikapa, Kasai Province, DRC",
    status: "Open to Partnership",
    summary:
      "A 4,000 ha concession — 1,500 ha of mature rubber and 2,500 ha of primary forest — with plans for a latex-to-rubber-granule plant, food crops, permaculture and a 100 ha orchard at Ngalikoko.",
    description:
      "Prediga Group SARL (RCCM KNG/RCCM/19-B-00342 of 15 March 2019, share capital USD 110,000) is an agricultural and forestry exploitation company based at Avenue Pangi N°2, C/Ngaliema, and managed by Bopé Muongalem. It is held by four shareholders: Bopé Muongalem, Bopé Bawota, Pieme Bopé and Bopé Mbakama.\n\nThe company holds a perpetual emphyteutic concession of 4,000 hectares — 1,500 hectares of mature rubber (hevea) and 2,500 hectares of dense primary forest — plus a 10-hectare concession for market-garden crops, at Ngalikoko near Tshikapa.\n\nIts objectives are to extract latex across the 1,500 hectares of hevea; to build a plant on a 5-hectare site in Tshikapa transforming latex into 35 kg rubber granules; and to market those granules business-to-business to the tyre, pharmaceutical and rubber-goods industries. Prediga also intends to transform its own rubber into finished products, and to develop cocoa, coffee, maize and palm; permaculture (chilli, leek, onion, tomato, pistachio, off-season peanut); and a 100-hectare orchard of citrus, mango, banana and pineapple, alongside a school of education in living food.",
    highlights: [
      "Incorporated 15 March 2019 — SARL, share capital USD 110,000",
      "4,000 ha perpetual emphyteutic concession: 1,500 ha mature rubber + 2,500 ha primary forest",
      "10 ha market-garden concession; 5 ha plant site in Tshikapa",
      "Planned latex → 35 kg rubber-granule plant (B2B: tyre, pharmaceutical, rubber goods)",
      "Cocoa, coffee, maize and palm; permaculture; 100 ha orchard and food-education school",
      "Manager: Bopé Muongalem",
    ],
    collaboration: [
      "Joint venture: Prediga contributes land rights and the plantation concession",
      "The partner contributes financing and equipment for joint exploitation",
      "Aimed at raising the income of the riverside population",
    ],
    image: "/images/prediga-plantation-1.jpeg",
    gallery: [
      "/images/prediga-location-1.png",
      "/images/prediga-location-2.png",
      "/images/prediga-plantation-1.jpeg",
      "/images/prediga-plantation-2.jpeg",
      "/images/prediga-latex.jpeg",
      "/images/prediga-community-1.jpeg",
      "/images/prediga-community-2.jpeg",
    ],
  },
  {
    id: "6",
    slug: "kasai-province",
    entity: "PROVINCE DU KASAÏ",
    name: "Kasai Province",
    sector: "Infrastructure & Development",
    location: "Kasai Province, DRC",
    status: "Open to Investment",
    summary:
      "A 95,631 km² province of about 4.4 million people, rich in diamond, iron, hydrocarbons, forest, water and fertile soil — with major road, airport and modernisation opportunities.",
    description:
      "The Province of Kasai covers 95,631 km² with a population of about 4,434,000 (density 46/km²) across five territories. It borders Angola's Lunda Norte province to the south, Kasai Central and Sankuru to the east, Tshuapa to the north, and Mai-Ndombe, Kwango and Kwilu to the west.\n\nThe climate is equatorial in the north (Dekese, Mweka and Ilebo — dense forest) and Sudanian in the south (Tshikapa, Luebo, Mweka — grassy and scrub savanna). The province is watered by countless rivers and lakes.\n\nIts resources include diamond (Mweka, Luebo, Dekese), iron (Luebo), hydrocarbons (Dekese), extensive forest, savanna, rich soils with enormous agricultural potential, and tourist sites such as the southern part of Salonga National Park.\n\nThe province is largely to be built, offering considerable collaboration possibilities for investors willing to accompany its modernisation and to construct road and airport infrastructure of local, national and international interest.",
    highlights: [
      "Area 95,631 km²; population ~4,434,000; five territories",
      "Resources: diamond, iron, hydrocarbons, forest, water and fertile soils",
      "Equatorial forest in the north, Sudanian savanna in the south",
      "Tourism: the southern part of Salonga National Park",
      "Needs: roads, airports and modernisation infrastructure",
    ],
    collaboration: [
      "Accompany the province's modernisation process",
      "Build road and airport infrastructure (local, national, international)",
      "Develop agriculture, mining, forestry, energy and tourism",
    ],
    image: "/images/kasai-map.jpeg",
    gallery: [
      "/images/kasai-map.jpeg",
      "/images/drc-map.jpeg",
    ],
  },
];

export function getOpportunity(slug: string): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.slug === slug);
}
