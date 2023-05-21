"use client";

import React from 'react';
import Tile from "./Tile";

interface LandscapeProps {
    itemPositions: TreePosition[][]
}

type TileType = string;
type TilesArray = TileType[][];


const WORLD_SIZE = 10;
const TILE_ASPECT_RATIO = 1.1;


const Landscape = ({ itemPositions }: LandscapeProps) => {
    const tiles: TilesArray = [];
    for (let i = WORLD_SIZE; i > 0; i--) {
        tiles.push(Array(WORLD_SIZE).fill('land_both'));
    }

    itemPositions.forEach((element: any) => {
        tiles[element[1]][element[2]] = element[0];
    });
    const yOffset = (100 / WORLD_SIZE) * (TILE_ASPECT_RATIO / 2.6);

    return (
        <>
            {
                tiles.map((row, y) => {
                    const yBase = yOffset * y + 40;

                    const xBase = 50 - (100 / (4 * WORLD_SIZE)) * y;
                    return row.map((tile, x) => {
                        const z = x + 1;
                        const xAbs = xBase + (50 / (2 * WORLD_SIZE)) * x;
                        let yAbs = yBase + yOffset * x;
                        const yBaseCopy = yAbs;
                        let src;
                        if (tile === 'land_both') {
                            src = "image/garden/land_both.png";
                        } else if (tile.includes('tree_four')) {
                            yAbs = yAbs - 30;
                            src = "image/garden/tree_four.png";
                        } else if (tile.includes('tree_one')) {
                            yAbs = yAbs - 19;
                            src = "image/garden/tree_one.png";
                        } else if (tile.includes('tree_two')) {
                            yAbs = yAbs - 22;
                            src = "image/garden/tree_two.png";
                        } else if (tile.includes('tree_three')) {
                            yAbs = yAbs - 20;
                            src = "image/garden/tree_three.png";
                        }

                        let plantID, dbPlantID;
                        if (tile !== 'land_both') {
                                
                            let parts = tile.split('/');
                            //console.log(parts)
                            plantID = parts[1];
                            dbPlantID = parts[2];
                            console.log(plantID);
                            console.log(dbPlantID)
                        }
                        return <Tile dbPlantID={dbPlantID} plantID={plantID} key={`${x}${y}`} src={src} x={xAbs} y={yAbs} z={z} ybase={yBaseCopy} />
                    })
                })
            }
        </>
    );
}

export default React.memo(Landscape);