// "use client";
// import { motion } from 'framer-motion';
// import React from 'react';
// import './game.css'

// const Tile = ({ src, x, y, z, ybase }: any) => {

//     return (
//         <>
//             {
//                 src && src.includes('tree') ? <>

//                     <motion.img
//                         whileHover={{ opacity: 0.2 }

//                         }
//                         alt="garden_tile"
//                         src="/user/image/garden/land_both.png"
//                         className="tile"
//                         style={{ left: `${x}%`, top: `${ybase}%`, zIndex: z }}
//                     />
//                     < motion.img

//                         whileHover={{ opacity: 0.5 }}
//                         onClick={() => console.log("hello")}
//                         alt="garden_tile"
//                         src={src}
//                         className="tile"
//                         style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
//                     />
//                 </>
//                     :
//                     < motion.img

//                         whileHover={{ opacity: 0.5 }}
//                         alt="garden_tile"
//                         src={src}
//                         className="tile"
//                         style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
//                     />
//             }

//         </>
//     );
// }

// export default Tile;