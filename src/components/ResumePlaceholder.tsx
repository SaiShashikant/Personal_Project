export const ResumePlaceholder = ({message = "Loading resume…"}: { message?: string }) => (
    <div className="mx-auto flex aspect-[8.5/11] w-full max-w-[816px] items-center justify-center rounded-lg border border-white/[0.1] bg-black-200 px-6 text-center text-sm text-white-200">
        {message}
    </div>
);
