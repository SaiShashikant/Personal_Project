import {Spotlight} from "@/components/ui/Spotlight";
import {TextGenerateEffect} from "@/components/ui/TextGenerateEffect";
import {MagicButton} from "@/components/ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa";

export const Hero = () => {
    return (
        <div className="pb-16 pt-28 md:pb-20 md:pt-36">
            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white"/>
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple"/>
                <Spotlight className="top-28 left-80 h-[80vh] w-[50vh]" fill="blue"/>

            </div>
            <div
                className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            </div>
            <div className="flex items-center justify-center relative my-10 md:my-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                    <h2 className="uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[11px] sm:text-xs text-center text-balance text-blue-100 px-4">
                        Full-stack developer · Next.js &amp; APIs
                    </h2>
                    <TextGenerateEffect
                        className="text-center text-[1.45rem] leading-[1.15] min-[420px]:text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl text-balance"
                        words="I build products with Next.js and APIs"
                    />
                    <p className="text-center text-balance max-w-xl mb-6 text-sm sm:text-base md:text-lg font-normal text-white">
                        Hi, I&apos;m Sai Shashikant, based in India. I design the interface, build the API, and ship the product.
                    </p>

                    <a href="#about">
                        <MagicButton
                            title="Show my work"
                            icon={<FaLocationArrow/>}
                            position="right"
                        />
                    </a>
                </div>
            </div>

        </div>
    )
}