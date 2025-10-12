// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  type: "Seed" | "Fertilizer" | "Pesticide" | "Tool"; // restrict to known categories
  price: number;
  unit: string;
  image: string;
}


const products: Product[] =[
  {
    "id": 1,
    "name": "Wheat Seeds",
    "type": "Seed",
    "price": 540,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1587732823616-a66c6bb04871?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 2,
    "name": "Rice Seeds",
    "type": "Seed",
    "price": 620,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1513192284530-6f0c70d8b5e8?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 3,
    "name": "Maize Seeds",
    "type": "Seed",
    "price": 450,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1616627989842-c508c5292f00?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 4,
    "name": "Mustard Seeds",
    "type": "Seed",
    "price": 510,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1585238341975-72c774874477?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 5,
    "name": "Soybean Seeds",
    "type": "Seed",
    "price": 380,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593829376985-566dfcdec6d4?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 6,
    "name": "Urea Fertilizer",
    "type": "Fertilizer",
    "price": 640,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 7,
    "name": "DAP Fertilizer",
    "type": "Fertilizer",
    "price": 1200,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 8,
    "name": "Potash Fertilizer",
    "type": "Fertilizer",
    "price": 750,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1604908177527-76335d1d88f3?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 9,
    "name": "Neem Pesticide",
    "type": "Pesticide",
    "price": 360,
    "unit": "liter",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 10,
    "name": "Glyphosate Pesticide",
    "type": "Pesticide",
    "price": 820,
    "unit": "liter",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 11,
    "name": "Tractor",
    "type": "Tool",
    "price": 1500000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 12,
    "name": "Power Tiller",
    "type": "Tool",
    "price": 120000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 13,
    "name": "Sprayer",
    "type": "Tool",
    "price": 2800,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1604908177527-76335d1d88f3?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 14,
    "name": "Plough",
    "type": "Tool",
    "price": 15000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 15,
    "name": "Harvester",
    "type": "Tool",
    "price": 2200000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 16,
    "name": "Onion Seeds",
    "type": "Seed",
    "price": 950,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1598032895204-cd4060a78dac?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 17,
    "name": "Tomato Seeds",
    "type": "Seed",
    "price": 1200,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 18,
    "name": "Cabbage Seeds",
    "type": "Seed",
    "price": 1050,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 19,
    "name": "Chilli Seeds",
    "type": "Seed",
    "price": 1300,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1606788075761-5d0f84ca6716?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 20,
    "name": "Sunflower Seeds",
    "type": "Seed",
    "price": 1100,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 21,
    "name": "Pea Seeds",
    "type": "Seed",
    "price": 850,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 22,
    "name": "Groundnut Seeds",
    "type": "Seed",
    "price": 920,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 23,
    "name": "Barley Seeds",
    "type": "Seed",
    "price": 600,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1585238341975-72c774874477?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 24,
    "name": "Cotton Seeds",
    "type": "Seed",
    "price": 1500,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 25,
    "name": "Sugarcane Setts",
    "type": "Seed",
    "price": 400,
    "unit": "quintal",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 26,
    "name": "Paddy Transplanter",
    "type": "Tool",
    "price": 185000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 27,
    "name": "Seed Drill",
    "type": "Tool",
    "price": 45000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 28,
    "name": "Rotavator",
    "type": "Tool",
    "price": 95000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 29,
    "name": "Disc Harrow",
    "type": "Tool",
    "price": 30000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 30,
    "name": "Cultivator",
    "type": "Tool",
    "price": 28000,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 31,
    "name": "Organic Compost",
    "type": "Fertilizer",
    "price": 350,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 32,
    "name": "Vermicompost",
    "type": "Fertilizer",
    "price": 500,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 33,
    "name": "NPK Fertilizer (19:19:19)",
    "type": "Fertilizer",
    "price": 1350,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 34,
    "name": "Zinc Sulphate",
    "type": "Fertilizer",
    "price": 750,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 35,
    "name": "Borax",
    "type": "Fertilizer",
    "price": 900,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1593515495767-c3fc5d36f49b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 36,
    "name": "Insecticide - Malathion",
    "type": "Pesticide",
    "price": 650,
    "unit": "liter",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 37,
    "name": "Fungicide - Carbendazim",
    "type": "Pesticide",
    "price": 700,
    "unit": "liter",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 38,
    "name": "Herbicide - 2,4-D",
    "type": "Pesticide",
    "price": 800,
    "unit": "liter",
    "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 39,
    "name": "Hand Hoe",
    "type": "Tool",
    "price": 600,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 40,
    "name": "Sickle",
    "type": "Tool",
    "price": 250,
    "unit": "each",
    "image": "https://images.unsplash.com/photo-1602526210237-93a9f5a353a5?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 41,
    "name": "Onion Seeds",
    "type": "Seed",
    "price": 720,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1615485737655-12e1a79a1c9e?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 42,
    "name": "Tomato Seeds",
    "type": "Seed",
    "price": 850,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1615485737769-d91e1f2ef80f?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 43,
    "name": "Chili Seeds",
    "type": "Seed",
    "price": 950,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1605521951320-7d1e6f27bb1a?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 44,
    "name": "Brinjal Seeds",
    "type": "Seed",
    "price": 680,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1615485737760-8c1d5e6e8881?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 45,
    "name": "Cabbage Seeds",
    "type": "Seed",
    "price": 770,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1622585459785-5bbf8945f2f1?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 46,
    "name": "Cauliflower Seeds",
    "type": "Seed",
    "price": 820,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1622585459684-87d1820b8a64?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 47,
    "name": "Okra Seeds",
    "type": "Seed",
    "price": 650,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1622585459601-b4d8db36805b?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 48,
    "name": "Coriander Seeds",
    "type": "Seed",
    "price": 900,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1600769736287-259f0a57d9a4?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 49,
    "name": "Fenugreek Seeds",
    "type": "Seed",
    "price": 780,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1597304030538-2b3e67a5c45f?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 50,
    "name": "Spinach Seeds",
    "type": "Seed",
    "price": 620,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1615485737769-72d1820b9d77?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 51,
    "name": "Carrot Seeds",
    "type": "Seed",
    "price": 980,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1600735989243-6a95d85f1e4c?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 52,
    "name": "Beetroot Seeds",
    "type": "Seed",
    "price": 880,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1600735989263-bb5e30f9a8dc?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 53,
    "name": "Radish Seeds",
    "type": "Seed",
    "price": 700,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1622585459727-991690e5cf72?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 54,
    "name": "Pumpkin Seeds",
    "type": "Seed",
    "price": 820,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1617196032378-0f8d833b0dff?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 55,
    "name": "Bitter Gourd Seeds",
    "type": "Seed",
    "price": 1050,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1622585459611-bf1770e845b2?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 56,
    "name": "Bottle Gourd Seeds",
    "type": "Seed",
    "price": 960,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1600769736409-77c97dfcb72d?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 57,
    "name": "Pea Seeds",
    "type": "Seed",
    "price": 720,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1600769736252-463c7494001e?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 58,
    "name": "Lentil Seeds",
    "type": "Seed",
    "price": 850,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1605521951471-4b3d463b6f2a?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 59,
    "name": "Chickpea Seeds",
    "type": "Seed",
    "price": 880,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1605521951257-8f5f020c91b9?auto=format&fit=crop&w=400&q=60"
  },
  {
    "id": 60,
    "name": "Pigeon Pea Seeds",
    "type": "Seed",
    "price": 940,
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1605521951363-25e918f9e4ab?auto=format&fit=crop&w=400&q=60"
  }

]

export default products;