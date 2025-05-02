import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    const currentYear = new Date().getFullYear(); // Dynamic year

    return (
        <section className="relative overflow-hidden py-10 bg-gray-400 border-t-2 border-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    {/* Logo and Copyright Section */}
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright {currentYear}. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <nav aria-label="Company Links">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                                Company
                            </h3>
                            <ul>
                                {[
                                    { text: 'Features', to: '/features' },
                                    { text: 'Pricing', to: '/pricing' },
                                    { text: 'Affiliate Program', to: '/affiliate' },
                                    { text: 'Press Kit', to: '/press' },
                                ].map((link, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-gray-900 hover:text-gray-700 transition duration-300"
                                            to={link.to}
                                            aria-label={link.text}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Support Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <nav aria-label="Support Links">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul>
                                {[
                                    { text: 'Account', to: '/account' },
                                    { text: 'Help', to: '/help' },
                                    { text: 'Contact Us', to: '/contact' },
                                    { text: 'Customer Support', to: '/support' },
                                ].map((link, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-gray-900 hover:text-gray-700 transition duration-300"
                                            to={link.to}
                                            aria-label={link.text}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Legals Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <nav aria-label="Legals Links">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                {[
                                    { text: 'Terms & Conditions', to: '/terms' },
                                    { text: 'Privacy Policy', to: '/privacy' },
                                    { text: 'Licensing', to: '/licensing' },
                                ].map((link, index) => (
                                    <li key={index} className="mb-4">
                                        <Link
                                            className="text-base font-medium text-gray-900 hover:text-gray-700 transition duration-300"
                                            to={link.to}
                                            aria-label={link.text}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;