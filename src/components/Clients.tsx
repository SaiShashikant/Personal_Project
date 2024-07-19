import {InfiniteMovingCards} from "@/components/ui/InfiniteMovingCards";
import {companies, testimonials} from "@/app/lib/AppConstants";

export const Clients = () => {
    return (
        <div className="py-20" id="testimonials">
            <h1 className="heading">
                Kind Words From {' '}
                <span className="text-purple ">satisfied clients</span>
            </h1>
            <div className="flex flex-col items-center max-lg:mt-10">
                <InfiniteMovingCards items={testimonials} direction="right" speed="slow"/>
                <div className="flex flex-wrap items-center justify-center gap-4 md:16 max-lg:mt-10">
                    {companies.map(({id, img, name, nameImg}) => (
                        <div key={id} className="flex md:max-w-60 max-w-32 gap-2 text-center justify-center items-center">
                            <img src={img} alt={name} className="md:w-10 w-5"/>
                            <span >{name}</span>
                            {/*<img src={nameImg} alt={name} className="md:w-24 w-20"/>*/}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}