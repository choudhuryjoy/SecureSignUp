interface FormSuccessProps {
    message?: string;
};

export const FormSuccess = ({
    message,
}: FormSuccessProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <svg className='h-5 w-5 text-emerald-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#50C878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#50C878" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p>{message}</p>
        </div>
    );
};
