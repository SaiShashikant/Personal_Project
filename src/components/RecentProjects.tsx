import {projects} from "@/app/lib/AppConstants";
import {PinContainer} from "@/components/ui/3d-pin";
import {FaLocationArrow} from "react-icons/fa";

export const RecentProjects = () => {
    return (
        <div className="py-20" id="projects">
            <h1 className="heading">
                A Small Selection of {' '}
                <span className="text-purple ">Recent Projects</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
                {projects.map(({id, title, des, img, iconLists, link, cta, fit}) => (
                    <div key={id}
                         className="h-auto min-h-[28rem] sm:min-h-[36rem] lg:min-h-[32.5rem] flex items-center justify-center w-full max-w-[570px]">
                        <PinContainer title={link ? (cta ?? "Check Live Site") : undefined} href={link}>
                            <div
                                className="relative flex items-center justify-center w-[min(calc(100vw-5.5rem),540px)] h-48 sm:h-64 overflow-hidden mb-8 sm:mb-10">
                                <div
                                    className={`relative flex h-full w-full items-center justify-center overflow-hidden lg:rounded-3xl ${fit === "contain" ? "bg-white" : "bg-[#13162d]"}`}>
                                    <img
                                        src={img}
                                        alt={title}
                                        className={fit === "contain"
                                            ? "max-h-[88%] max-w-[82%] w-auto object-contain"
                                            : "absolute inset-0 h-full w-full object-cover object-left-top"}
                                    />
                                </div>
                            </div>
                            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-2">
                                {title}
                            </h1>
                            <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                                {des}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 mt-7 mb-3">
                                <div className="flex items-center">
                                    {iconLists.map((icon, index) => (
                                        <div key={index}
                                             className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                                             style={{
                                                 transform: `translateX(-${5 * index * 2}px)`
                                             }}>
                                            <img src={icon} alt={icon} className="p-2"/>
                                        </div>
                                    ))}
                                </div>
                                {link ? (
                                    <div className="flex justify-center items-center">
                                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                                            {cta ?? "Check Live Site"}
                                        </p>
                                        <FaLocationArrow className="ms-3" color={"#cbacf9"}/>
                                    </div>
                                ) : null}
                            </div>
                        </PinContainer>
                    </div>
                ))}
            </div>
        </div>
    )
}