"use client";

import React from 'react'
import Garden from './components/Garden';



const treePositions: TreePosition[] = [
    ['tree_four', 1, 2], // A tile of type 'tree_four' at position 1,2
    ['tree_one', 4, 5], // A tile of type 'tree_one' at position 2,2
]

export default function page({ }) {
    return (
        <>
            <Garden itemPositions={treePositions} />
        </>
    )
}