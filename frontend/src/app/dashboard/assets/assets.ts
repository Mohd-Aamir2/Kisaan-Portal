// assets/soilCropRecommendations.ts

export interface Crop {
  id: number;
  name: string;
  image: string;
  description: string;
  days: number;       // duration instead of rating
  months: string;     // months instead of season
  region: string;
}

export interface SoilCropRecommendations {
  [soilType: string]: Crop[];
}

const soilCropRecommendations: SoilCropRecommendations = {
  "Alluvial Soil": [
  {
    id: 1,
    name: "Sugarcane",
    image: "https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Sugarcane grows exceptionally well in fertile alluvial soils with good water availability. Farmers can use this crop for jaggery, sugar production, and fodder. It requires regular irrigation but gives high income per acre if managed well.",
    days: 300, // crop cycle approx 10–12 months
    months: "January–March (planting), November–December (harvesting)",
    region: "Uttar Pradesh, Bihar",
  },
  {
    id: 2,
    name: "Rice",
    image: "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Rice thrives in alluvial plains with good rainfall or irrigation. It is the main staple food crop. Farmers can choose short-duration or long-duration varieties depending on water availability.",
    days: 120, // 4 months average
    months: "June–July (sowing), October–November (harvesting)",
    region: "Indo-Gangetic plains",
  },
  {
    id: 3,
    name: "Wheat",
    image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Wheat is the second most important food crop of India, grown well in alluvial soils with good fertility. Requires cool climate during growth and bright sunshine at the time of ripening. Farmers can use wheat for flour, bread, and fodder.",
    days: 140,
    months: "November–December (sowing), March–April (harvesting)",
    region: "Northern India",
  },
  {
    id: 4,
    name: "Jute",
    image: "https://images.pexels.com/photos/11709764/pexels-photo-11709764.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Jute is a fibre crop that grows best in alluvial soils with high moisture. It is used for making gunny bags, ropes, and mats. Farmers in areas with good rainfall can earn well from jute cultivation.",
    days: 120,
    months: "March–May (sowing), July–September (harvesting)",
    region: "West Bengal, Bihar, Assam",
  },
  {
    id: 5,
    name: "Maize",
    image: "https://images.pexels.com/photos/5076530/pexels-photo-5076530.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Maize is a multipurpose cereal crop that can be used for food, fodder, and industrial products. It grows well in alluvial soils with moderate rainfall. Short-duration varieties allow multiple crops per year.",
    days: 100,
    months: "June–July (sowing), September–October (harvesting)",
    region: "All regions",
  },
  {
    id: 6,
    name: "Potatoes",
    image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Potatoes are a profitable root crop for alluvial soils, giving high yields in a short period. They require good irrigation and are in demand year-round. Farmers can also store them in cold storage for higher profits.",
    days: 90,
    months: "October–November (sowing), January–February (harvesting)",
    region: "UP, Bihar, Bengal",
  },
  {
    id: 7,
    name: "Pulses",
    image: "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Pulses such as lentils, chickpeas, and peas are ideal for alluvial soils as they enrich fertility by fixing nitrogen. They require less water and are good for intercropping.",
    days: 110,
    months: "October–November (sowing), February–March (harvesting)",
    region: "Northern plains",
  },
  {
    id: 8,
    name: "Oilseeds",
    image: "https://images.pexels.com/photos/8797302/pexels-photo-8797302.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Mustard and sunflower are key oilseed crops for alluvial soils. They need less water compared to rice and sugarcane, and farmers can earn well due to increasing demand for edible oils.",
    days: 100,
    months: "October–November (sowing), February–March (harvesting)",
    region: "All regions",
  },
],

  "Black Soil (Regur)": [
  {
    id: 1,
    name: "Cotton",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cotton grows best in black soil because it holds moisture and has high nutrients. Farmers prefer it as a cash crop since cotton is used in the textile industry. Black soil’s ability to retain water during dry periods makes it perfect for long-duration crops like cotton.",
    days: 180, // approx. 6 months
    months: "June to November",
    region: "Maharashtra, Madhya Pradesh, Gujarat",
  },
  {
    id: 2,
    name: "Jowar (Sorghum)",
    image: "https://images.pexels.com/photos/5953422/pexels-photo-5953422.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Jowar is a drought-resistant millet that thrives in black soil, especially where irrigation is limited. It is a staple food grain in rural areas and also used as fodder for animals, making it a farmer-friendly crop with multiple uses.",
    days: 110,
    months: "June to September",
    region: "Deccan Plateau, Maharashtra, Karnataka",
  },
  {
    id: 3,
    name: "Sunflower",
    image: "https://images.pexels.com/photos/1019475/pexels-photo-1019475.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Sunflower grows well in black soil because of its moisture retention and good drainage. The seeds are pressed for oil, which is widely used in cooking. Farmers also like sunflower because it gives quick returns within a few months.",
    days: 100,
    months: "October to January",
    region: "Karnataka, Maharashtra, Andhra Pradesh",
  },
  {
    id: 4,
    name: "Tobacco",
    image: "https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Tobacco requires fertile and well-drained soil, and black soil is considered excellent for its growth. It is mainly grown as a commercial crop. Farmers cultivating tobacco often get good profits, though it requires careful management.",
    days: 150,
    months: "June to October",
    region: "Andhra Pradesh, Maharashtra",
  },
  {
    id: 5,
    name: "Linseed",
    image: "https://images.pexels.com/photos/8797302/pexels-photo-8797302.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Linseed (flaxseed) is an oilseed crop that fits well in black soil regions during the winter season. The seeds are used for oil and health products, and the straw is sometimes used in making linen fabric.",
    days: 120,
    months: "November to February",
    region: "Madhya Pradesh, Maharashtra",
  },
  {
    id: 6,
    name: "Wheat",
    image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Wheat is a major food grain in India, and black soil provides the right amount of nutrients and moisture for it. Farmers sow it in winter and harvest in spring, making it an important Rabi crop in black soil regions.",
    days: 120,
    months: "November to March",
    region: "Maharashtra, Madhya Pradesh, Gujarat",
  },
  {
    id: 7,
    name: "Pulses",
    image: "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Pulses like tur (pigeon pea), gram, and lentils grow well in black soil. They improve soil fertility naturally by fixing nitrogen, making the land better for future crops. Pulses are also an important protein source in rural diets.",
    days: 100,
    months: "October to January",
    region: "Central India, Deccan Plateau",
  },
  {
    id: 8,
    name: "Sugarcane",
    image: "https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Sugarcane requires fertile soil and a lot of water, and black soil provides the perfect combination of nutrients and moisture retention. It is a long-duration cash crop used in sugar and jaggery production, giving farmers steady income.",
    days: 330, // 11 months
    months: "Planted in January/February or June, harvested after 10–12 months",
    region: "Maharashtra, Karnataka, Andhra Pradesh",
  },
],
"Red Soil": [
  {
    id: 1,
    name: "Groundnut (Peanut)",
    image: "https://images.pexels.com/photos/1397583/pexels-photo-1397583.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Groundnut is the most common crop in red soils as it requires well-drained, light-textured soil. Farmers use it for edible oil, fodder, and direct consumption. It fixes nitrogen, improving soil fertility.",
    days: 120,
    months: "June–July (sowing), October–November (harvesting)",
    region: "Tamil Nadu, Andhra Pradesh, Karnataka",
  },
  {
    id: 2,
    name: "Ragi (Finger Millet)",
    image: "https://images.pexels.com/photos/1582503/pexels-photo-1582503.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Ragi is a staple millet that thrives in red soils with low fertility. It is drought-resistant and provides high nutritional value. Farmers prefer it as both a food crop and fodder crop.",
    days: 110,
    months: "June–July (sowing), October–November (harvesting)",
    region: "Karnataka, Tamil Nadu",
  },
  {
    id: 3,
    name: "Maize (Corn)",
    image: "https://images.pexels.com/photos/5076530/pexels-photo-5076530.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Maize grows well in red soils with moderate rainfall. It is a versatile crop used for human food, animal feed, and industrial purposes. Farmers like it for short duration and high demand.",
    days: 100,
    months: "June–July (sowing), September–October (harvesting)",
    region: "Karnataka, Andhra Pradesh",
  },
  {
    id: 4,
    name: "Pulses (Tur, Green Gram, Black Gram)",
    image: "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Pulses are highly suited to red soils because they do not require very fertile land. They also improve soil fertility by fixing nitrogen. Farmers can intercrop pulses with cereals or oilseeds.",
    days: 90,
    months: "July–August (sowing), October–November (harvesting)",
    region: "South India, Eastern India",
  },
  {
    id: 5,
    name: "Castor Seed",
    image: "https://images.pexels.com/photos/8797302/pexels-photo-8797302.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Castor is an oilseed crop well-suited for red soils due to its tolerance to poor fertility and dry conditions. The oil is used in medicine, industry, and cosmetics.",
    days: 150,
    months: "July (sowing), December–January (harvesting)",
    region: "Andhra Pradesh, Telangana",
  },
  {
    id: 6,
    name: "Tobacco",
    image: "https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Tobacco cultivation in red soils is common in Andhra Pradesh and Karnataka. The soil provides good drainage and moderate fertility, giving high-quality tobacco leaves for commercial use.",
    days: 120,
    months: "June–July (sowing), October–November (harvesting)",
    region: "Andhra Pradesh, Karnataka",
  },
  {
    id: 7,
    name: "Cotton",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cotton grows fairly well in red soils if irrigation is available. Although black soil is ideal, red soil regions also cultivate cotton as a cash crop with decent yield.",
    days: 180,
    months: "June–July (sowing), November–December (harvesting)",
    region: "Telangana, Andhra Pradesh, Karnataka",
  },
  {
    id: 8,
    name: "Oilseeds (Sesame, Mustard, Sunflower)",
    image: "https://images.pexels.com/photos/8797302/pexels-photo-8797302.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Various oilseeds like sesame and sunflower are cultivated in red soils due to their adaptability to less fertile conditions. They provide good income and require less water compared to cereals.",
    days: 100,
    months: "July–August (sowing), October–November (harvesting)",
    region: "Tamil Nadu, Karnataka, Andhra Pradesh",
  },
],
"Laterite Soil": [
  {
    id: 1,
    name: "Tea",
    image: "https://images.pexels.com/photos/1684007/pexels-photo-1684007.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Tea is the most important commercial crop in laterite soil regions. The soil, when well-drained and combined with high rainfall, supports excellent tea plantations. Farmers can get steady income as tea leaves are harvested multiple times in a year.",
    days: 365,
    months: "Year-round plucking after 3 years of planting",
    region: "Assam, Kerala, West Bengal",
  },
  {
    id: 2,
    name: "Coffee",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Coffee grows well in laterite soils found in hilly regions with good rainfall. Farmers cultivate Arabica and Robusta varieties. It requires shade trees, making it suitable for agroforestry systems.",
    days: 365,
    months: "Harvested November–March (after 3–4 years of planting)",
    region: "Karnataka, Kerala",
  },
  {
    id: 3,
    name: "Cashew",
    image: "https://images.pexels.com/photos/14764096/pexels-photo-14764096.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cashew is a hardy crop that grows well in poor fertility laterite soils. Farmers grow it for nuts and cashew apple, which is used for making feni (local liquor). It requires less care once established.",
    days: 300,
    months: "February–March (flowering), May–June (harvesting)",
    region: "Goa, Kerala, Karnataka",
  },
  {
    id: 4,
    name: "Rubber",
    image: "https://images.pexels.com/photos/6223364/pexels-photo-6223364.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Rubber plantations thrive in laterite soils with hot and moist climate. Farmers tap latex from trees, which is used in tires, footwear, and industrial goods. It requires long-term investment but gives continuous returns.",
    days: 365,
    months: "Tapping starts after 6–7 years; harvesting year-round",
    region: "Kerala, Karnataka, Tamil Nadu",
  },
  {
    id: 5,
    name: "Coconut",
    image: "https://images.pexels.com/photos/6157009/pexels-photo-6157009.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Coconut palms are highly suited to laterite soils in coastal belts. Farmers benefit from coconuts for oil, water, coir, and leaves. With irrigation, productivity increases significantly.",
    days: 365,
    months: "Harvested every 45–60 days throughout the year",
    region: "Kerala, Karnataka, Goa",
  },
  {
    id: 6,
    name: "Pineapple",
    image: "https://images.pexels.com/photos/6157003/pexels-photo-6157003.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Pineapple grows well in acidic laterite soils with good rainfall. It is a quick cash crop and is in high demand for fresh consumption and juice processing. Farmers can intercrop it with coconut or arecanut.",
    days: 450,
    months: "Planting: April–June, Harvesting: 15 months after planting",
    region: "Kerala, Assam, Meghalaya",
  },
  {
    id: 7,
    name: "Arecanut (Supari)",
    image: "https://images.pexels.com/photos/7509529/pexels-photo-7509529.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Arecanut trees grow well in laterite soils with good irrigation. Farmers cultivate it as a long-term plantation crop, and its nuts are used for chewing and in cultural ceremonies.",
    days: 365,
    months: "Harvested 3–4 times a year after 5 years of planting",
    region: "Karnataka, Kerala, Assam",
  },
  {
    id: 8,
    name: "Pepper (Black Pepper)",
    image: "https://images.pexels.com/photos/4199112/pexels-photo-4199112.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Black pepper, also called the 'King of Spices,' grows well in laterite soils with shade and humidity. Farmers usually grow it as a climber on coconut or arecanut trees. It fetches high market value.",
    days: 180,
    months: "Flowering in May–June, Harvesting in December–February",
    region: "Kerala, Karnataka",
  },
],
"Desert Soil": [
  {
    id: 1,
    name: "Bajra (Pearl Millet)",
    image: "https://images.pexels.com/photos/15760484/pexels-photo-15760484.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Bajra is the most important crop in desert soil. It tolerates drought and heat, making it the lifeline of Rajasthan farmers. Bajra grains are used for flour and animal fodder.",
    days: 120,
    months: "Sown in June–July, harvested in September–October",
    region: "Rajasthan, Haryana, Gujarat",
  },
  {
    id: 2,
    name: "Jowar (Sorghum)",
    image: "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Jowar is a hardy cereal crop grown in desert and semi-arid soils. It provides nutritious food grain and green fodder for cattle. Requires very little water.",
    days: 120,
    months: "Sown in June–July, harvested in October",
    region: "Rajasthan, Maharashtra",
  },
  {
    id: 3,
    name: "Moong (Green Gram)",
    image: "https://images.pexels.com/photos/145933/pexels-photo-145933.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Moong is a short-duration pulse crop grown in desert soils after rains. Farmers benefit from its quick harvest and soil fertility improvement due to nitrogen fixation.",
    days: 65,
    months: "Sown in July–August, harvested in September–October",
    region: "Rajasthan, Gujarat",
  },
  {
    id: 4,
    name: "Guar (Cluster Bean)",
    image: "https://images.pexels.com/photos/3296225/pexels-photo-3296225.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Guar is a drought-tolerant legume widely cultivated in desert soils. Its seeds are used for guar gum, which has industrial value, and the plant serves as fodder.",
    days: 90,
    months: "Sown in July, harvested in October",
    region: "Rajasthan, Haryana",
  },
  {
    id: 5,
    name: "Cumin (Jeera)",
    image: "https://images.pexels.com/photos/708444/pexels-photo-708444.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cumin is a spice crop well-suited to arid desert soil with dry climate. Farmers grow it as a winter crop, and it fetches a high price in the spice market.",
    days: 120,
    months: "Sown in November, harvested in February–March",
    region: "Rajasthan, Gujarat",
  },
  {
    id: 6,
    name: "Mustard",
    image: "https://images.pexels.com/photos/1146708/pexels-photo-1146708.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Mustard is an important oilseed crop grown in desert soils during winter. It requires low water and gives farmers oil and oilcake for fodder.",
    days: 120,
    months: "Sown in October–November, harvested in February–March",
    region: "Rajasthan, Haryana",
  },
  {
    id: 7,
    name: "Barley",
    image: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Barley is grown in desert soils during rabi season. It is used for food, fodder, and beer production. It survives well with minimal irrigation.",
    days: 130,
    months: "Sown in November, harvested in March–April",
    region: "Rajasthan, Punjab",
  },
  {
    id: 8,
    name: "Dates (Date Palm)",
    image: "https://images.pexels.com/photos/1128673/pexels-photo-1128673.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Date palm thrives in hot and dry desert conditions. With irrigation, farmers cultivate it successfully, and fruits fetch a premium price in the market.",
    days: 365,
    months: "Planting in February–March, fruits harvested June–August",
    region: "Rajasthan (Jaisalmer, Jodhpur), Kutch (Gujarat)",
  },
],
"Mountain Soil": [
  {
    id: 1,
    name: "Tea",
    image: "https://images.pexels.com/photos/213780/pexels-photo-213780.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Tea is the most popular commercial crop in mountain soils. The cool climate, well-drained slopes, and regular rainfall make it ideal. Farmers earn a steady income from tea leaves, which are harvested multiple times a year.",
    days: 365,
    months: "Planting in March–April, plucking from April to November",
    region: "Assam, Darjeeling, Nilgiri Hills",
  },
  {
    id: 2,
    name: "Coffee",
    image: "https://images.pexels.com/photos/3625371/pexels-photo-3625371.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Coffee grows well in shady mountain slopes with mild temperatures. Farmers intercrop it with pepper and cardamom for additional income. It is a valuable export crop.",
    days: 365,
    months: "Planting in June–July, harvesting in November–January",
    region: "Karnataka, Kerala, Tamil Nadu (hilly regions)",
  },
  {
    id: 3,
    name: "Apple",
    image: "https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Apple orchards thrive in cool mountain soils with chilly winters. Farmers depend on apples as a major cash crop, and it provides fruit for both domestic and export markets.",
    days: 365,
    months: "Flowering in March–April, harvesting in August–October",
    region: "Himachal Pradesh, Jammu & Kashmir, Uttarakhand",
  },
  {
    id: 4,
    name: "Cardamom",
    image: "https://images.pexels.com/photos/6168331/pexels-photo-6168331.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cardamom, known as the 'Queen of Spices,' grows best in moist mountain soils with shade. Farmers benefit from its high market price and long shelf life.",
    days: 300,
    months: "Planting in May–June, harvesting in October–December",
    region: "Kerala, Sikkim, Karnataka",
  },
  {
    id: 5,
    name: "Cabbage",
    image: "https://images.pexels.com/photos/1508665/pexels-photo-1508665.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cabbage grows well in mountain soils during the cool season. It is a quick-maturing vegetable that provides steady cash returns for farmers.",
    days: 90,
    months: "Sown in July–August, harvested in October–November",
    region: "Himachal Pradesh, Uttarakhand, Darjeeling",
  },
  {
    id: 6,
    name: "Potatoes",
    image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Potatoes are an important food crop in hilly regions. Mountain soils with cool weather give high yields and good quality tubers. Farmers use them for both food and seed production.",
    days: 100,
    months: "Sown in March–April or July–August, harvested in June or November",
    region: "Himachal Pradesh, Nilgiri Hills, Darjeeling",
  },
  {
    id: 7,
    name: "Maize",
    image: "https://images.pexels.com/photos/5076530/pexels-photo-5076530.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Maize is widely grown in mountain soils during summer. It provides food, fodder, and raw material for industries. Farmers often intercrop it with beans and pulses.",
    days: 120,
    months: "Sown in May–June, harvested in September–October",
    region: "Uttarakhand, Himachal Pradesh, NE States",
  },
  {
    id: 8,
    name: "Barley",
    image: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Barley is suited for mountain soils in cold regions. Farmers grow it for grain, fodder, and beer making. It is a hardy crop needing little care.",
    days: 130,
    months: "Sown in October–November, harvested in March–April",
    region: "Ladakh, Himachal Pradesh, Uttarakhand",
  },
],
"Saline Soil": [
  {
    id: 1,
    name: "Barley",
    image: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Barley is tolerant to salinity and grows well in coastal and semi-arid saline soils. Farmers cultivate it for food, fodder, and brewing purposes. It is reliable where other cereals fail.",
    days: 120,
    months: "Sown in November, harvested in March–April",
    region: "Haryana, Punjab, Rajasthan",
  },
  {
    id: 2,
    name: "Mustard",
    image: "https://images.pexels.com/photos/8797302/pexels-photo-8797302.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Mustard is a hardy oilseed crop that tolerates saline soils. It requires low water and provides good returns through edible oil and by-products like oilcake for cattle feed.",
    days: 110,
    months: "Sown in October–November, harvested in February–March",
    region: "Haryana, Rajasthan, Gujarat",
  },
  {
    id: 3,
    name: "Cotton",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Cotton grows in moderately saline soils due to its deep root system. Farmers prefer it as a cash crop even under salt-affected conditions, as it fetches good market prices.",
    days: 170,
    months: "Sown in June–July, harvested in October–December",
    region: "Gujarat, Maharashtra, Rajasthan",
  },
  {
    id: 4,
    name: "Rice (salt-tolerant varieties)",
    image: "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Special salt-tolerant rice varieties (like CSR 30, CSR 36) are developed for saline soils. Farmers in coastal and inland saline belts use them to secure stable yields.",
    days: 130,
    months: "Sown in June–July, harvested in October–November",
    region: "Eastern UP, West Bengal, Odisha, Coastal Andhra",
  },
  {
    id: 5,
    name: "Guava",
    image: "https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Guava trees tolerate saline soils and are a profitable fruit crop. Farmers benefit from year-round demand for fresh fruits and processed products like juice and jam.",
    days: 365,
    months: "Flowering in March–April & August–September, fruits in winter and rainy season",
    region: "UP, Bihar, Maharashtra, Gujarat",
  },
  {
    id: 6,
    name: "Date Palm",
    image: "https://images.pexels.com/photos/712488/pexels-photo-712488.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Date palms thrive in saline and arid soils. Farmers in desert and coastal saline regions grow them as a high-value crop for fruits and dry dates.",
    days: 365,
    months: "Flowering in March–April, harvesting in September–October",
    region: "Rajasthan, Gujarat, Coastal India",
  },
  {
    id: 7,
    name: "Chickpea (Gram)",
    image: "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Chickpea tolerates mild salinity and enriches soil fertility by fixing nitrogen. It is an important rabi pulse that provides protein-rich food for rural families.",
    days: 100,
    months: "Sown in October–November, harvested in February–March",
    region: "Madhya Pradesh, UP, Rajasthan",
  },
  {
    id: 8,
    name: "Sugar Beet",
    image: "https://images.pexels.com/photos/161573/beet-harvest-autumn-october-161573.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Sugar beet is a salt-tolerant crop that farmers cultivate for sugar production. It grows well in saline soils with irrigation, offering a profitable alternative to sugarcane in such areas.",
    days: 150,
    months: "Sown in October–November, harvested in March–April",
    region: "UP, Haryana, Gujarat",
  },
],
"Peaty Soil": [
  {
    id: 1,
    name: "Potatoes",
    image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Peaty soil is rich in organic matter and retains moisture, making it excellent for potato cultivation. Farmers can get high yields with proper irrigation and nutrient management.",
    days: 90,
    months: "October–November (planting), January–February (harvesting)",
    region: "Kerala, West Bengal, Assam",
  },
  {
    id: 2,
    name: "Carrots",
    image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Carrots grow well in loose, moist peaty soil. This root vegetable is in high demand in markets and stores well. Farmers should ensure good drainage to prevent rot.",
    days: 70,
    months: "September–October (planting), November–December (harvesting)",
    region: "Kerala, Assam, West Bengal",
  },
  {
    id: 3,
    name: "Onions",
    image: "https://images.pexels.com/photos/1431335/pexels-photo-1431335.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Onions prefer fertile, moisture-retentive peaty soils. They require proper spacing and irrigation. Farmers can get good income as onions have year-round demand.",
    days: 90,
    months: "October–November (planting), January–February (harvesting)",
    region: "Kerala, West Bengal, Assam",
  },
  {
    id: 4,
    name: "Ginger",
    image: "https://images.pexels.com/photos/302073/pexels-photo-302073.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Ginger thrives in organic-rich peaty soils. It is a high-value spice crop. Farmers can earn good profits with proper mulching and irrigation, and it improves soil health.",
    days: 240,
    months: "March–April (planting), October–November (harvesting)",
    region: "Kerala, Assam, West Bengal",
  },
  {
    id: 5,
    name: "Taro (Colocasia)",
    image: "https://images.pexels.com/photos/622001/pexels-photo-622001.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Taro grows well in wet peaty soils. Its tubers are highly nutritious and used for food. Farmers can cultivate it in waterlogged fields, benefiting from high local demand.",
    days: 180,
    months: "May–June (planting), October–November (harvesting)",
    region: "Kerala, Assam, Odisha",
  },
  {
    id: 6,
    name: "Paddy (Rice)",
    image: "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Peaty soils are ideal for rice cultivation due to moisture retention. Farmers can use short-duration varieties and maintain high yields with adequate water management.",
    days: 120,
    months: "June–July (sowing), September–October (harvesting)",
    region: "Kerala, Assam, West Bengal",
  },
  {
    id: 7,
    name: "Vegetables (Leafy greens)",
    image: "https://images.pexels.com/photos/158730/lettuce-leaf-salad-vegetables-158730.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Leafy vegetables like spinach, lettuce, and amaranth grow well in nutrient-rich peaty soil. Farmers can get quick returns with short-duration crops suitable for multiple cropping.",
    days: 40,
    months: "Year-round (planting), 40–50 days harvesting cycle",
    region: "Kerala, Assam, West Bengal",
  },
  {
    id: 8,
    name: "Turmeric",
    image: "https://images.pexels.com/photos/302073/pexels-photo-302073.jpeg?auto=compress&cs=tinysrgb&w=400",
    description:
      "Turmeric thrives in organic-rich, moisture-retentive peaty soil. It is a high-value spice crop. Farmers can achieve good yields with proper irrigation and mulching practices.",
    days: 270,
    months: "April–May (planting), November–December (harvesting)",
    region: "Kerala, Assam, West Bengal",
  },
],
};

export default soilCropRecommendations;


