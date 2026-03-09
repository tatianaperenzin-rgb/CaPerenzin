import { getDictionary } from '@/lib/dictionary';
import Link from 'next/link';


export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    return {
        title: dictionary.privacy.title,
        description: dictionary.hero.heroIntroOne,
        alternates: {
            canonical: `/${lang}/policy`,
        }
    }
}

export default async function Policy({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    const content = dictionary.privacy;

    return (
        <section className="bg-black min-h-screen pt-32 pb-20 px-5 md:px-20 text-white">
            <div className="max-w-4xl mx-auto">

                {/* HEADLINE */}
                <h1 className="text-3xl md:text-5xl text-[#B08D55] font-bold uppercase tracking-wider mb-8 leading-tight">
                    {content.title}
                    <span className="block text-sm text-gray-400 mt-2 normal-case font-normal tracking-normal">
                        {content.updated}
                    </span>
                </h1>

                <div className="space-y-6 text-gray-300 font-light leading-relaxed text-sm md:text-base">

                    {/* INTRO */}
                    {content.intro && content.intro.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}

                    {/* SECTIONS LOOP */}
                    {content.sections && content.sections.map((section, index) => (
                        <div key={index} className="mt-10">
                            {/* Section Title */}
                            {section.title && (
                                <h2 className="text-xl md:text-2xl text-[#E8E6D9] font-semibold mb-4 uppercase tracking-wide">
                                    {section.title}
                                </h2>
                            )}

                            {/* Section Content */}
                            {section.content && (
                                <p className="mb-4">
                                    {section.content}
                                </p>
                            )}

                            {/* List (if exists) */}
                            {section.list && (
                                <ul className="list-disc pl-5 space-y-2 text-[#B08D55]">
                                    {section.list.map((item, i) => (
                                        <li key={i}>
                                            <span className="text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Extra Content (if exists) */}
                            {section.extraContent && (
                                <p className="mt-4">
                                    {section.extraContent}
                                </p>
                            )}

                            {/* Link (if exists, e.g. Cookie Policy) */}
                            {section.link && (
                                <p className="mt-4">
                                    <Link href={section.link.url} className="text-[#B08D55] underline hover:text-[#E8E6D9] transition-colors">
                                        {section.link.text}
                                    </Link>
                                </p>
                            )}
                        </div>
                    ))}

                    {/* FOOTER */}
                    <div className="mt-16 pt-8 border-t border-gray-800 text-xs text-gray-500">
                        {content.footer} <a target="_blank" href="https://www.cookieyes.com/" className="hover:text-[#B08D55] transition-colors">CookieYes</a>.
                    </div>

                </div>
            </div>
        </section>
    );
}