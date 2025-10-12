import { Sprout, Droplets, Sun, Scissors } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export interface CropStep {
  title: string;// ya React.FC<React.SVGProps<SVGSVGElement>>
  //icon: LucideIcon,
  description: string;
  tips: string[];
}

export interface Crop {
  id: number;
  name: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  steps: CropStep[];
}

const crops: Crop[] = [
  {
    "id": 1,
    "name": "Tomatoes",
    "image": "https://picsum.photos/seed/tomatoes/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Tomatoes.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Tomatoes.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Tomatoes seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Tomatoes crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Tomatoes when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Wheat",
    "image": "https://picsum.photos/seed/wheat/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Wheat.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Wheat.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Wheat seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Wheat crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Wheat when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Rice",
    "image": "https://picsum.photos/seed/rice/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Rice.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Rice.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Rice seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Rice crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Rice when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Maize",
    "image": "https://picsum.photos/seed/maize/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Maize.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Maize.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Maize seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Maize crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Maize when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Barley",
    "image": "https://picsum.photos/seed/barley/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Barley.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Barley.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Barley seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Barley crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Barley when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Oats",
    "image": "https://picsum.photos/seed/oats/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Oats.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Oats.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Oats seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Oats crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Oats when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Sugarcane",
    "image": "https://picsum.photos/seed/sugarcane/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Sugarcane.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Sugarcane.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Sugarcane seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Sugarcane crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Sugarcane when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Cotton",
    "image": "https://picsum.photos/seed/cotton/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cotton.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cotton.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cotton seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cotton crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cotton when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 9,
    "name": "Soybean",
    "image": "https://picsum.photos/seed/soybean/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Soybean.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Soybean.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Soybean seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Soybean crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Soybean when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "Groundnut",
    "image": "https://picsum.photos/seed/groundnut/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Groundnut.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Groundnut.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Groundnut seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Groundnut crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Groundnut when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 11,
    "name": "Mustard",
    "image": "https://picsum.photos/seed/mustard/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Mustard.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Mustard.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Mustard seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Mustard crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Mustard when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 12,
    "name": "Peas",
    "image": "https://picsum.photos/seed/peas/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Peas.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Peas.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Peas seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Peas crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Peas when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 13,
    "name": "Lentils",
    "image": "https://picsum.photos/seed/lentils/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Lentils.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Lentils.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Lentils seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Lentils crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Lentils when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 14,
    "name": "Chickpeas",
    "image": "https://picsum.photos/seed/chickpeas/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Chickpeas.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Chickpeas.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Chickpeas seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Chickpeas crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Chickpeas when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 15,
    "name": "Millet",
    "image": "https://picsum.photos/seed/millet/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Millet.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Millet.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Millet seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Millet crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Millet when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 16,
    "name": "Sorghum",
    "image": "https://picsum.photos/seed/sorghum/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Sorghum.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Sorghum.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Sorghum seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Sorghum crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Sorghum when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 17,
    "name": "Potato",
    "image": "https://picsum.photos/seed/potato/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Potato.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Potato.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Potato seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Potato crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Potato when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 18,
    "name": "Onion",
    "image": "https://picsum.photos/seed/onion/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Onion.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Onion.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Onion seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Onion crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Onion when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 19,
    "name": "Garlic",
    "image": "https://picsum.photos/seed/garlic/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Garlic.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Garlic.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Garlic seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Garlic crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Garlic when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 20,
    "name": "Carrot",
    "image": "https://picsum.photos/seed/carrot/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Carrot.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Carrot.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Carrot seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Carrot crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Carrot when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 21,
    "name": "Spinach",
    "image": "https://picsum.photos/seed/spinach/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Spinach.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Spinach.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Spinach seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Spinach crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Spinach when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 22,
    "name": "Cabbage",
    "image": "https://picsum.photos/seed/cabbage/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cabbage.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cabbage.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cabbage seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cabbage crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cabbage when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 23,
    "name": "Cauliflower",
    "image": "https://picsum.photos/seed/cauliflower/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cauliflower.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cauliflower.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cauliflower seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cauliflower crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cauliflower when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 24,
    "name": "Brinjal",
    "image": "https://picsum.photos/seed/brinjal/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Brinjal.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Brinjal.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Brinjal seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Brinjal crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Brinjal when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 25,
    "name": "Okra",
    "image": "https://picsum.photos/seed/okra/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Okra.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Okra.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Okra seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Okra crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Okra when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 26,
    "name": "Chili",
    "image": "https://picsum.photos/seed/chili/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Chili.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Chili.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Chili seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Chili crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Chili when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 27,
    "name": "Sunflower",
    "image": "https://picsum.photos/seed/sunflower/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Sunflower.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Sunflower.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Sunflower seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Sunflower crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Sunflower when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 28,
    "name": "Jute",
    "image": "https://picsum.photos/seed/jute/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Jute.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Jute.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Jute seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Jute crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Jute when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 29,
    "name": "Banana",
    "image": "https://picsum.photos/seed/banana/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Banana.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Banana.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Banana seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Banana crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Banana when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 30,
    "name": "Mango",
    "image": "https://picsum.photos/seed/mango/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Mango.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Mango.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Mango seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Mango crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Mango when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 31,
    "name": "Papaya",
    "image": "https://picsum.photos/seed/papaya/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Papaya.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Papaya.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Papaya seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Papaya crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Papaya when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 32,
    "name": "Guava",
    "image": "https://picsum.photos/seed/guava/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Guava.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Guava.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Guava seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Guava crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Guava when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 33,
    "name": "Apple",
    "image": "https://picsum.photos/seed/apple/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Apple.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Apple.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Apple seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Apple crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Apple when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 34,
    "name": "Pear",
    "image": "https://picsum.photos/seed/pear/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Pear.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Pear.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Pear seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Pear crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Pear when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 35,
    "name": "Peach",
    "image": "https://picsum.photos/seed/peach/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Peach.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Peach.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Peach seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Peach crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Peach when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 36,
    "name": "Grapes",
    "image": "https://picsum.photos/seed/grapes/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Grapes.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Grapes.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Grapes seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Grapes crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Grapes when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 37,
    "name": "Pineapple",
    "image": "https://picsum.photos/seed/pineapple/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Pineapple.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Pineapple.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Pineapple seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Pineapple crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Pineapple when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 38,
    "name": "Pomegranate",
    "image": "https://picsum.photos/seed/pomegranate/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Pomegranate.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Pomegranate.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Pomegranate seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Pomegranate crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Pomegranate when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 39,
    "name": "Strawberry",
    "image": "https://picsum.photos/seed/strawberry/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Strawberry.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Strawberry.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Strawberry seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Strawberry crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Strawberry when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 40,
    "name": "Coffee",
    "image": "https://picsum.photos/seed/coffee/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Coffee.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Coffee.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Coffee seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Coffee crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Coffee when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 41,
    "name": "Tea",
    "image": "https://picsum.photos/seed/tea/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Tea.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Tea.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Tea seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Tea crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Tea when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 42,
    "name": "Rubber",
    "image": "https://picsum.photos/seed/rubber/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Rubber.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Rubber.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Rubber seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Rubber crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Rubber when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 43,
    "name": "Coconut",
    "image": "https://picsum.photos/seed/coconut/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Coconut.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Coconut.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Coconut seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Coconut crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Coconut when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 44,
    "name": "Arecanut",
    "image": "https://picsum.photos/seed/arecanut/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Arecanut.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Arecanut.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Arecanut seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Arecanut crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Arecanut when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 45,
    "name": "Cashew",
    "image": "https://picsum.photos/seed/cashew/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cashew.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cashew.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cashew seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cashew crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cashew when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 46,
    "name": "Sesame",
    "image": "https://picsum.photos/seed/sesame/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Sesame.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Sesame.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Sesame seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Sesame crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Sesame when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 47,
    "name": "Linseed",
    "image": "https://picsum.photos/seed/linseed/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Linseed.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Linseed.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Linseed seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Linseed crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Linseed when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 48,
    "name": "Turmeric",
    "image": "https://picsum.photos/seed/turmeric/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Turmeric.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Turmeric.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Turmeric seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Turmeric crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Turmeric when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 49,
    "name": "Ginger",
    "image": "https://picsum.photos/seed/ginger/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Ginger.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Ginger.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Ginger seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Ginger crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Ginger when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 50,
    "name": "Cardamom",
    "image": "https://picsum.photos/seed/cardamom/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cardamom.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cardamom.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cardamom seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cardamom crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cardamom when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 51,
    "name": "Black Pepper",
    "image": "https://picsum.photos/seed/blackpepper/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Black Pepper.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Black Pepper.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Black Pepper seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Black Pepper crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Black Pepper when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 52,
    "name": "Cloves",
    "image": "https://picsum.photos/seed/cloves/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cloves.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cloves.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cloves seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cloves crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cloves when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 53,
    "name": "Coriander",
    "image": "https://picsum.photos/seed/coriander/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Coriander.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Coriander.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Coriander seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Coriander crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Coriander when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 54,
    "name": "Fenugreek",
    "image": "https://picsum.photos/seed/fenugreek/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Fenugreek.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Fenugreek.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Fenugreek seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Fenugreek crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Fenugreek when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 55,
    "name": "Mint",
    "image": "https://picsum.photos/seed/mint/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Mint.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Mint.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Mint seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Mint crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Mint when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 56,
    "name": "Basil",
    "image": "https://picsum.photos/seed/basil/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Basil.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Basil.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Basil seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Basil crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Basil when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 57,
    "name": "Lemon",
    "image": "https://picsum.photos/seed/lemon/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Lemon.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Lemon.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Lemon seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Lemon crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Lemon when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 58,
    "name": "Orange",
    "image": "https://picsum.photos/seed/orange/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Orange.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Orange.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Orange seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Orange crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Orange when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 59,
    "name": "Watermelon",
    "image": "https://picsum.photos/seed/watermelon/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Watermelon.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Watermelon.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Watermelon seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Watermelon crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Watermelon when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 60,
    "name": "Muskmelon",
    "image": "https://picsum.photos/seed/muskmelon/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Muskmelon.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Muskmelon.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Muskmelon seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Muskmelon crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Muskmelon when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 61,
    "name": "Pumpkin",
    "image": "https://picsum.photos/seed/pumpkin/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Pumpkin.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Pumpkin.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Pumpkin seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Pumpkin crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Pumpkin when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 62,
    "name": "Cucumber",
    "image": "https://picsum.photos/seed/cucumber/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Cucumber.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Cucumber.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Cucumber seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Cucumber crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Cucumber when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 63,
    "name": "Bottle Gourd",
    "image": "https://picsum.photos/seed/bottlegourd/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Bottle Gourd.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Bottle Gourd.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Bottle Gourd seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Bottle Gourd crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Bottle Gourd when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 64,
    "name": "Bitter Gourd",
    "image": "https://picsum.photos/seed/bittergourd/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Bitter Gourd.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Bitter Gourd.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Bitter Gourd seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Bitter Gourd crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Bitter Gourd when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 65,
    "name": "Beans",
    "image": "https://picsum.photos/seed/beans/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Beans.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Beans.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Beans seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Beans crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Beans when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 66,
    "name": "Horse Gram",
    "image": "https://picsum.photos/seed/horsegram/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Horse Gram.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Horse Gram.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Horse Gram seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Horse Gram crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Horse Gram when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 67,
    "name": "Kidney Beans",
    "image": "https://picsum.photos/seed/kidneybeans/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Kidney Beans.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Kidney Beans.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Kidney Beans seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Kidney Beans crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Kidney Beans when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 68,
    "name": "Soybean Green",
    "image": "https://picsum.photos/seed/soybeangreen/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Soybean Green.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Soybean Green.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Soybean Green seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Soybean Green crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Soybean Green when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 69,
    "name": "Amaranthus",
    "image": "https://picsum.photos/seed/amaranthus/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Amaranthus.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Amaranthus.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Amaranthus seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Amaranthus crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Amaranthus when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 70,
    "name": "Drumstick",
    "image": "https://picsum.photos/seed/drumstick/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Drumstick.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Drumstick.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Drumstick seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Drumstick crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Drumstick when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 71,
    "name": "Jackfruit",
    "image": "https://picsum.photos/seed/jackfruit/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Jackfruit.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Jackfruit.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Jackfruit seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Jackfruit crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Jackfruit when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 72,
    "name": "Lychee",
    "image": "https://picsum.photos/seed/lychee/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Lychee.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Lychee.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Lychee seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Lychee crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Lychee when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 73,
    "name": "Fig",
    "image": "https://picsum.photos/seed/fig/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Fig.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Fig.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Fig seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Fig crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Fig when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 74,
    "name": "Date Palm",
    "image": "https://picsum.photos/seed/datepalm/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Date Palm.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Date Palm.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Date Palm seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Date Palm crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Date Palm when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 75,
    "name": "Tamarind",
    "image": "https://picsum.photos/seed/tamarind/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Tamarind.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Tamarind.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Tamarind seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Tamarind crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Tamarind when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 76,
    "name": "Sapota",
    "image": "https://picsum.photos/seed/sapota/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Sapota.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Sapota.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Sapota seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Sapota crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Sapota when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 77,
    "name": "Custard Apple",
    "image": "https://picsum.photos/seed/custardapple/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Custard Apple.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Custard Apple.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Custard Apple seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Custard Apple crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Custard Apple when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 78,
    "name": "Betel Leaf",
    "image": "https://picsum.photos/seed/betelleaf/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Betel Leaf.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Betel Leaf.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Betel Leaf seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Betel Leaf crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Betel Leaf when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 79,
    "name": "Olive",
    "image": "https://picsum.photos/seed/olive/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Olive.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Olive.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Olive seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Olive crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Olive when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 80,
    "name": "Raspberry",
    "image": "https://picsum.photos/seed/raspberry/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Raspberry.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Raspberry.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Raspberry seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Raspberry crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Raspberry when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 81,
    "name": "Blueberry",
    "image": "https://picsum.photos/seed/blueberry/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Blueberry.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Blueberry.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Blueberry seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Blueberry crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Blueberry when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 82,
    "name": "Blackberry",
    "image": "https://picsum.photos/seed/blackberry/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Blackberry.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Blackberry.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Blackberry seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Blackberry crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Blackberry when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 83,
    "name": "Kiwi",
    "image": "https://picsum.photos/seed/kiwi/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Kiwi.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Kiwi.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Kiwi seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Kiwi crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Kiwi when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 84,
    "name": "Avocado",
    "image": "https://picsum.photos/seed/avocado/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Avocado.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Avocado.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Avocado seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Avocado crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Avocado when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 85,
    "name": "Dragon Fruit",
    "image": "https://picsum.photos/seed/dragonfruit/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Dragon Fruit.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Dragon Fruit.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Dragon Fruit seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Dragon Fruit crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Dragon Fruit when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 86,
    "name": "Starfruit",
    "image": "https://picsum.photos/seed/starfruit/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Starfruit.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Starfruit.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Starfruit seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Starfruit crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Starfruit when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 87,
    "name": "Passion Fruit",
    "image": "https://picsum.photos/seed/passionfruit/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Passion Fruit.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Passion Fruit.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Passion Fruit seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Passion Fruit crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Passion Fruit when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 88,
    "name": "Durian",
    "image": "https://picsum.photos/seed/durian/400/300",
    "difficulty": "Medium",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Durian.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Durian.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Durian seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Durian crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Durian when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 89,
    "name": "Longan",
    "image": "https://picsum.photos/seed/longan/400/300",
    "difficulty": "Hard",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Longan.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Longan.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Longan seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Longan crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Longan when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 90,
    "name": "Mangosteen",
    "image": "https://picsum.photos/seed/mangosteen/400/300",
    "difficulty": "Easy",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Mangosteen.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Mangosteen.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Mangosteen seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Mangosteen crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Mangosteen when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 91,
    "name": "Rambutan",
    "image": "https://picsum.photos/seed/rambutan/400/300",
    "difficulty": "Medium",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Rambutan.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Rambutan.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Rambutan seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Rambutan crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Rambutan when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 92,
    "name": "Mulberry",
    "image": "https://picsum.photos/seed/mulberry/400/300",
    "difficulty": "Hard",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Mulberry.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Mulberry.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Mulberry seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Mulberry crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Mulberry when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 93,
    "name": "Kale",
    "image": "https://picsum.photos/seed/kale/400/300",
    "difficulty": "Easy",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Kale.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Kale.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Kale seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Kale crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Kale when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 94,
    "name": "Broccoli",
    "image": "https://picsum.photos/seed/broccoli/400/300",
    "difficulty": "Medium",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Broccoli.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Broccoli.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Broccoli seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Broccoli crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Broccoli when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 95,
    "name": "Celery",
    "image": "https://picsum.photos/seed/celery/400/300",
    "difficulty": "Hard",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Celery.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Celery.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Celery seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Celery crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Celery when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 96,
    "name": "Leek",
    "image": "https://picsum.photos/seed/leek/400/300",
    "difficulty": "Easy",
    "duration": "60-90 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Leek.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Leek.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Leek seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Leek crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Leek when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 97,
    "name": "Turnip",
    "image": "https://picsum.photos/seed/turnip/400/300",
    "difficulty": "Medium",
    "duration": "90-120 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Turnip.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Turnip.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Turnip seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Turnip crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Turnip when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 98,
    "name": "Radish",
    "image": "https://picsum.photos/seed/radish/400/300",
    "difficulty": "Hard",
    "duration": "120-150 days",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Radish.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Radish.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Radish seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Radish crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Radish when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  },
  {
    "id": 99,
    "name": "Beetroot",
    "image": "https://picsum.photos/seed/beetroot/400/300",
    "difficulty": "Easy",
    "duration": "6-12 months",
    "steps": [
      {
        "title": "Seed Preparation",
        "description": "Prepare high-quality seeds for Beetroot.",
        "tips": [
          "Use certified seeds",
          "Check moisture levels"
        ]
      },
      {
        "title": "Soil Preparation",
        "description": "Prepare fertile soil for Beetroot.",
        "tips": [
          "Add compost",
          "Check pH between 6-7"
        ]
      },
      {
        "title": "Planting",
        "description": "Plant Beetroot seeds properly.",
        "tips": [
          "Maintain spacing",
          "Plant at right depth"
        ]
      },
      {
        "title": "Watering & Care",
        "description": "Irrigate Beetroot crops carefully.",
        "tips": [
          "Avoid overwatering",
          "Mulch to retain moisture"
        ]
      },
      {
        "title": "Harvesting",
        "description": "Harvest Beetroot when ready.",
        "tips": [
          "Harvest at right time",
          "Store properly"
        ]
      }
    ]
  }
]
export default crops;