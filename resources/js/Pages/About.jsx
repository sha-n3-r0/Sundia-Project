import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About" />
            <Header />
            <main className="min-h-[calc(100vh-120px)] bg-white text-gray-900">
                <section className="mx-auto max-w-6xl px-6 py-20">
                    <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 shadow-xl shadow-red-100/50">
                        <h1 className="text-4xl font-bold uppercase tracking-[0.24em] text-red-700">About Sundia</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-800">
                            Sundia is a diversified group built on innovation, deep industry expertise, and a drive to deliver lasting value across multiple sectors. We combine product design, manufacturing, and customer service to create strong solutions in automotive, industrial, and consumer markets.
                        </p>
                        <div className="mt-10 grid gap-6 md:grid-cols-3">
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">Our Mission</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    Build reliable products and partnerships while delivering premium experiences to every customer.
                                </p>
                            </div>
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">Our Approach</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    We focus on quality, transparency, and innovation in every project, from concept to delivery.
                                </p>
                            </div>
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">Our Promise</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    Deliver modern products with strong support and a clear commitment to customer success.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
