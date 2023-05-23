import React from 'react'

const Step = ({ title, heading, description, img, alternate }: any) => {
  const row = "lg:items-center lg:flex lg:flex-row lg:justify-end min-h-[100svh]  flex justify-center items-center snap-center";
  const rowReverse = "lg:items-center lg:flex lg:flex-row-reverse lg:justify-center min-h-[100svh] flex justify-center items-center snap-center";

  return (
    <div className={alternate ? row : rowReverse}>
      <div>
        <div className="lg:w-2/6 lg:-ml-20 lg:-mt-10 lg:flex lg:flex-col lg:justify-center lg:items-start">
          <p className="pb-5 text-xl font-semibold text-center text-orange-400 lg:pb-0 lg:-mb-3 lg:text-lg lg:font-bold lg:text-left">{title}</p>
          <p className="pb-2 pl-10 pr-10 text-xl leading-10 text-center text-gray-400 lg:w-5/6 lg:pb-0 lg:text-lg lg:text-left lg:p-0 lg:pl-0 lg:pr-0">{description}</p>
        </div>
        <div className="ml-20 mr-20">
          <img className=" lg:-mt-24 lg:-mb-20" src={img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Step