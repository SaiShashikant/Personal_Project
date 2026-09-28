import {testimonials} from "@/app/lib/AppConstants";

export const Testimonials = () => {
    return (
        <div className="py-20" id="testimonials">
            <h1 className="heading">
                Kind words from{" "}
                <span className="text-purple">people I&apos;ve worked with</span>
            </h1>
            <div className="flex flex-col items-center gap-8 mt-10">
                {testimonials.map((item) => (
                    <blockquote
                        key={item.name}
                        className="w-full max-w-4xl relative rounded-2xl border border-slate-800 p-5 sm:p-6 md:p-10"
                        style={{background: "rgb(4,7,29)"}}
                    >
                        {item.quote.split("\n\n").map((paragraph) => (
                            <p
                                key={paragraph.slice(0, 24)}
                                className="relative z-20 text-sm leading-[1.7] text-white md:text-lg font-normal mt-4 first:mt-0"
                            >
                                {paragraph}
                            </p>
                        ))}
                        <footer className="relative z-20 mt-8 flex flex-col gap-1">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl leading-[1.6] text-gray-400 font-bold hover:text-purple"
                            >
                                {item.name}
                            </a>
                            <span className="text-sm leading-[1.6] text-white-200 font-normal">
                                {item.title}
                            </span>
                        </footer>
                    </blockquote>
                ))}
            </div>
        </div>
    );
};
