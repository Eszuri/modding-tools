import Link from 'next/link';
import {Github, Youtube, ArrowUpRight, Code, Eye} from 'lucide-react';


interface Project {
    title: string;
    description: string;
    tags: string[];
    liveUrl?: string;
    sourceUrl: string;
}

const myProjects: Project[] = [
    {
        title: 'BIN-DAT-TOOL',
        description: 'Sebuah tool yg berfungsi untuk memisahkan header dari sebuah file binary dan disimpan setiap header nya dalam satu file.',
        tags: ['React', "TailwindCSS", "Axios", "Jotai"],
        liveUrl: '/bin-dat-tool',
        sourceUrl: 'https://github.com/Eszuri/modding-tools',
    },
    {
        title: 'MSD-TOOL',
        description: 'Sebuah tool yg berfungsi untuk mengubah file MSD yg berisi binary menjadi text biasa untuk memudahkan dalam pengeditan. tool ini dikhusukan untuk game God Hand ',
        tags: ['React', "TailwindCSS", "Jotai", "JSZip"],
        liveUrl: '/msd-tool',
        sourceUrl: 'https://github.com/Eszuri/modding-tools',
    }
];


export default function HomePage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <section id="about" className="py-10 bg-gray-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-4">MODDING TOOLS</h2>
                    <p className="text-gray-400 text-center leading-relaxed">
                        halo semua, selamat datang di website saya. website ini menyediakan sebuah tools untuk nge-mod game ps2. tools ini lebih diutamakan untuk game yg menggunakan AFS.
                        <span className='block'>(God Hand / Resident Evil 4 / DLL)</span>
                    </p>
                </div>
                <div className="flex justify-center items-center gap-4 mt-5">
                    <Link
                        href="https://github.com/Eszuri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110">
                        <Github className="h-6 w-6" />
                    </Link>
                    <Link
                        href="https://youtube.com/@LievaL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110">
                        <Youtube className="h-6 w-6" />
                    </Link>
                </div>
            </section>

            <section className="py-14">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Tools List
                    </h2>
                    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProjects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 rounded-lg p-6 flex flex-col justify-between border border-gray-700 shadow-lg hover:border-blue-500 hover:shadow-blue-500/10 transition-all duration-300 group">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs font-semibold bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-8">
                                        {project.liveUrl && (
                                            <Link href={project.liveUrl} rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                <Eye className="h-4 w-4" /> Visit Web
                                            </Link>
                                        )}
                                        <Link href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            <Code className="h-4 w-4" /> Source
                                        </Link>
                                    </div>
                                    <Link href={project.liveUrl as string} target='_blank'>
                                        <ArrowUpRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
                <p>Dibuat dengan menggunakan Next.js & Tailwind CSS</p>
                <p>By <span className='font-bold text-emerald-700/80'>LievaL</span></p>
            </footer>
        </div >
    );
}
