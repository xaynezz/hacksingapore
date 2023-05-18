type PlantIdentifyApiResponse = {
  images: [
    {
      file_name: string,
      url: string
    }
  ],
  suggestions: [
    {
      id: number,
      plant_name: string,
      plant_details: object,
      probability: number,
      confirmed: boolean
    }
  ],
  is_plant_probability: number,
  is_plant: boolean
}

type PerenualDataResponse = {
  data: Array<{
    id: number,
    common_name: string,
    scientific_name: Array<string>,
    cycle: string,
    watering: string,
    sunlight: Array<string>,
    default_image: {
      id: number,
      url: string,
      attribution: {
        photographer: string,
        license: string,
        license_url: string
      }
    }
  }>
}

type RecipeDetails = {
  from: number;
  to: number;
  count: number;
  _links: {
    self: {
      href: string;
      title: string;
    };
    next: {
      href: string;
      title: string;
    };
  };
  hits: {
    recipe: {
      uri: string;
      label: string;
      image: string;
      images: {
        THUMBNAIL: {
          url: string;
          width: number;
          height: number;
        };
        SMALL: {
          url: string;
          width: number;
          height: number;
        };
        REGULAR: {
          url: string;
          width: number;
          height: number;
        };
        LARGE: {
          url: string;
          width: number;
          height: number;
        };
      };
      source: string;
      url: string;
      shareAs: string;
      yield: number;
      dietLabels: string[];
      healthLabels: string[];
      cautions: string[];
      ingredientLines: string[];
      ingredients: {
        text: string;
        quantity: number;
        measure: string;
        food: string;
        weight: number;
        foodId: string;
      }[];
      calories: number;
      glycemicIndex: number;
      totalCO2Emissions: number;
      co2EmissionsClass: string;
      totalWeight: number;
      cuisineType: string[];
      mealType: string[];
      dishType: string[];
      instructions: string[];
      tags: string[];
      externalId: string;
      totalNutrients: Record<string, unknown>; // Make sure to replace this with your actual nutrients structure
      totalDaily: Record<string, unknown>; // Replace this with actual daily structure
      digest: {
        label: string;
        tag: string;
        schemaOrgTag: string;
        total: number;
        hasRDI: boolean;
        daily: number;
        unit: string;
        sub: Record<string, unknown>; // Replace this with actual sub structure
      }[];
    };
    _links: {
      self: {
        href: string;
        title: string;
      };
      next: {
        href: string;
        title: string;
      };
    };
  }[];
};

type PlantDetails = {
  id: number,
  common_name: string,
  scientific_name: Array<string>,
  other_name: Array<string>,
  family: string,
  origin: Array<string>,
  type: string,
  dimension: string,
  cycle: string,
  attracts: Array<string>,
  propagation: Array<string>,
  hardiness: {
    min: string,
    max: string
  },
  hardiness_location: {
    full_url: string,
    full_iframe: string
  },
  watering: string,
  sunlight: Array<string>,
  maintenance: string,
  'care-guides': string,
  soil: Array<string>,
  growth_rate: string,
  drought_tolerant: boolean,
  salt_tolerant: boolean,
  thorny: boolean,
  invasive: boolean,
  tropical: boolean,
  indoor: boolean,
  care_level: string | null,
  pest_susceptibility: Array<string>,
  pest_susceptibility_api: string,
  flowers: boolean,
  flowering_season: string,
  flower_color: string,
  cones: boolean,
  fruits: boolean,
  edible_fruit: boolean,
  edible_fruit_taste_profile: string,
  fruit_nutritional_value: string,
  fruit_color: Array<string>,
  harvest_season: string,
  harvest_method: string,
  leaf: boolean,
  leaf_color: Array<string>,
  edible_leaf: boolean,
  edible_leaf_taste_profile: string,
  leaf_nutritional_value: string,
  cuisine: boolean,
  cuisine_list: string,
  medicinal: boolean,
  medicinal_use: string,
  medicinal_method: string,
  poisonous_to_humans: number,
  poison_effects_to_humans: string,
  poison_to_humans_cure: string,
  poisonous_to_pets: number,
  poison_effects_to_pets: string,
  poison_to_pets_cure: string,
  rare: string,
  rare_level: string,
  endangered: string,
  endangered_level: string,
  description: string,
  default_image: {
    license: number,
    license_name: string,
    license_url: string,
    original_url: string,
    regular_url: string,
    medium_url: string,
    small_url: string,
    thumbnail: string
  }
};

type PlantDisease = {
  // Define the structure of the disease object here
  // For example:
  name: string;
  diagnosisDate: Date;
};

type PlantHealthAssessment = {
  is_healthy_probability: number;
  is_healthy: boolean;
  diseases: PlantDisease[];
};

type TreePosition = [string, number, number];

type plantObjectForSupaBase = {
  userid: number,
  x_coor: number,
  y_coor: number,
  plant_name: string,
  plant_id: number,
  tree_number: string,
  image_url: string,
  common_name: string
}

type UserPlants = {
  plant_name: string,
  image_url: string
}