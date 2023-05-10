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