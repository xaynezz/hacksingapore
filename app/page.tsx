"use client"

import BottomLead from "./landingcomponents/Bottomlead";
import Hero from "./landingcomponents/Hero";
import Step from "./landingcomponents/Step";

function HomePage() {
    const data = {
        hero: {
            appType: 'EdiPlant',
            tagLine: 'Why not start your sustainable journey today?',
            description: 'Try out EdiPlant app now!',
            mainActionText: 'Click here',
        },
        step1: {
            title: 'Gardening Virtual Plants',
            description: 'Create and cultivate your own virtual edible garden',
            img: "/landingPageImages/GardenIntro.jpg",
            alternate: false,
        },
        step2: {
            title: 'EdiPlants AI',
            description: 'Experience the future of plant care with our AI chatbot',
            img: "/landingPageImages/ChatBot.png",
            alternate: true,
        },
        step3: {
            title: 'Recipe',
            description: "Curated, healthy gourment recipes tailored to your harvest",
            img: "/landingPageImages/RecipeIntro.png",
            alternate: false,
        },
        bottomLead: {
            actionText: 'Try out the the app now.',
            description: 'Available on any mobile devices. Start planting & harvesting!',
            mainActionText: 'Click here!',
        },
    }
    return (
        <div className="box-border">
            <div className="flex flex-col">

                <Hero
                    appType={data.hero.appType}
                    tagLine={data.hero.tagLine}
                    description={data.hero.description}
                    mainActionText={data.hero.mainActionText}
                />

                <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>
                <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>

               <Step
                    title={data.step1.title}

                    description={data.step1.description}
                    img={data.step1.img}
                    alternate={data.step1.alternate}
                />
                 
                <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>             <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>

                <Step
                    title={data.step2.title}
                    description={data.step2.description}
                    img={data.step2.img}
                    alternate={data.step2.alternate}
                />

                <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>             <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>

                <Step
                    title={data.step3.title}
                    description={data.step3.description}
                    img={data.step3.img}
                    alternate={data.step3.alternate}
                />

                <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>             <div id="faq" className="pt-20 text-2xl font-semibold text-center text-black-800 lg:font-bold"></div>
                

                <BottomLead
                    actionText={data.bottomLead.actionText}
                    description={data.bottomLead.description}
                    mainActionText={data.bottomLead.mainActionText}
                  
                />

            </div>
        </div>
    );
}

export default HomePage;
