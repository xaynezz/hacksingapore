"use client";
import React from 'react';
import Landscape from './Landscape';
import './game.css'

interface GardenProps {
    itemPositions: TreePosition[][]
}

const Garden = ({ itemPositions }: GardenProps) => {
    return (
        <div className="world" >
            <Landscape itemPositions={itemPositions} />
        </div>
    );
}

export default Garden;