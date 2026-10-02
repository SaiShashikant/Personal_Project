export const resumeFile = {
    path: `/Sai-Shashikant-Resume.pdf?v=${process.env.NEXT_PUBLIC_RESUME_VERSION}`,
    downloadName: "Sai-Shashikant-Resume.pdf",
};

export const navItems = [
    {name: "About", link: "/#about"},
    {name: "Projects", link: "/#projects"},
    {name: "Testimonials", link: "/#testimonials"},
    {name: "Contact", link: "/#contact"},
    {name: "Resume", link: "/resume"},
];

export const gridItems = [
    {
        id: 1,
        title: "Focused on Delivering High-Quality Web Solutions",
        description: "",
        className: "lg:col-span-3 md:col-span-6 md:row-span-4 min-h-[24rem] sm:min-h-[28rem] lg:min-h-[60vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "",
        spareImg: "",
    },
    {
        id: 2,
        title: "I'm very flexible with time zone communications",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
    },
    {
        id: 3,
        title: "My tech stack",
        description: "I constantly try to improve",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "",
        spareImg: "",
    },
    {
        id: 4,
        title: "Tech enthusiast with a passion for development.",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/grid.svg",
        spareImg: "/b4.svg",
    },

    {
        id: 5,
        title: "Currently shipping Kovaad features",
        description: "The Inside Scoop",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/b5.svg",
        spareImg: "/grid.svg",
    },
    {
        id: 6,
        title: "Do you want to start a project together?",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full max-w-60 text-center",
        img: "",
        spareImg: "",
    },
];

export const projects = [
    {
        id: 1,
        title: "Kovaad",
        des: "AI training platform for specially abled children — therapists and guardians use LLM-powered sessions to build social awareness and emotion understanding. Built the Next.js app (app.kovaad.ai) and NestJS backends (auth, chats, users, payments, profile).",
        img: "/kovaad-logo.png",
        fit: "contain",
        iconLists: ["/next.svg", "/ts.svg", "/re.svg", "/tail.svg", "/dock.svg"],
        link: "https://kovaad.ai",
        cta: "Check Live Site",
    },
    {
        id: 2,
        title: "SEG-PACE",
        des: "Price & Cost Evaluation platform — React/Vite frontend and FastAPI/PostgreSQL backend with Azure SSO for enterprise procurement analytics.",
        img: "/seg-pace.svg",
        fit: "contain",
        iconLists: ["/re.svg", "/ts.svg", "/tail.svg", "/dock.svg", "/cloud.svg"],
    },
];

export const testimonials = [
    {
        quote: "I have had the pleasure of working with Sai Shashikant at Kovaad for the past year, where he joined our team as a fresher and has since made remarkable progress as a Full-Stack Developer. Sai has consistently demonstrated intelligence, dedication, and a strong work ethic throughout his tenure.\n\nSai is proficient in a range of modern technologies, including React, Next.js, and NestJS, and has hands-on experience with Docker, Google Cloud Run, and Github Actions. Over the past year, he has become highly dependable in handling frontend requirements independently and delivers quality solutions with minimal supervision. While he occasionally seeks guidance for complex backend logic, once the requirements are explained, he is able to implement robust and effective solutions.\n\nSai’s positive attitude and professionalism make him a joy to work with. He is always eager to learn and takes feedback constructively, which has contributed significantly to his rapid growth. His reliability and cheerful demeanor have made him a valued member of our team.",
        name: "Pradeep Gudipati",
        title: "Kovaad Technologies",
        link: "https://www.linkedin.com/in/pradeepgudipati",
    },
];

export const workExperience = [
    {
        id: 1,
        title: "Next.js & TypeScript apps",
        desc: "Built and shipped app-router products with typed components, SSR/CSR where needed, and solid DX.",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "NestJS / API backends",
        desc: "Auth, chats, users, payments, and profile services with clear module boundaries.",
        className: "md:col-span-2",
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "React + Vite product UIs",
        desc: "Enterprise dashboards with Microsoft SSO patterns and responsive, accessible UI.",
        className: "md:col-span-2",
        thumbnail: "/exp3.svg",
    },
    {
        id: 4,
        title: "Performance & reliability",
        desc: "Faster loads, cleaner frontend issues, and shipping quality users notice.",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
    },
];

export const socialMedia = [
    {
        id: 1,
        img: "/git.svg",
        link: "https://github.com/SaiShashikant",
    },
    {
        id: 2,
        img: "/twit.svg",
        link: "https://x.com/crazyatom24",
    },
    {
        id: 3,
        img: "/link.svg",
        link: "https://www.linkedin.com/in/shashikant987/",

    },
];
