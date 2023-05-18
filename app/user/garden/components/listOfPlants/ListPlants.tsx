import React from 'react'

type Props = {}

export default function ListPlants({}: Props) {

    const plants = [
        { name: 'Fiddle Leaf Fig', img: '/images/fiddle-leaf-fig.jpg' },
        { name: 'Snake Plant', img: '/images/snake-plant.jpg' },
        { name: 'Monstera Deliciosa', img: '/images/monstera.jpg' },
        // Add more plants here...
      ]
  return (
    <div className="right-0 bottom-0 mr-10 mb-10 w-64">
    <h1 className="text-lg font-bold mb-3">Available Plants</h1>
    <div>
      {plants.map((plant, index) => (
        <div key={index} className="bg-white rounded shadow-lg p-3">
          <img className="w-full h-20 object-cover mb-3 rounded" src={plant.img} alt={plant.name} />
          <p className="text-gray-800 font-semibold text-sm">{plant.name}</p>
        </div>
      ))}
    </div>
  </div>
  )
}