import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500">

            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-100 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-200/50 via-yellow-200/30 to-white/40 dark:from-gray-700/50 dark:via-gray-600/30 dark:to-gray-800/40 animate-gradient-move"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/40 via-orange-100/50 to-yellow-50/60 dark:from-gray-600/40 dark:via-gray-700/50 dark:to-gray-800/60 animate-gradient-move-reverse"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-5xl text-gray-800 dark:text-gray-200 font-bold">404</h1>
                <p className="mt-4 text-gray-800 dark:text-gray-200 text-xl">Sorry, this page does not exist.</p>
                <Link href="/" className="mt-6 text-gray-800 dark:text-gray-200 underline">
                    Go back home
                </Link>
            </div>
        </div>
    );
}