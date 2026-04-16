import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head } from '@inertiajs/react';

export default function Products() {
    return (
        <>
            <Head title="Products" />
            <Header />
            <main className="min-h-[calc(100vh-120px)] bg-white text-gray-900">
                <section className="mx-auto max-w-6xl px-6 py-20">
                    <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 shadow-xl shadow-red-100/50">
                        <h1 className="text-4xl font-bold uppercase tracking-[0.24em] text-red-700">Our Products</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-800">
                            Discover the range of products powering our group: intelligent solutions for manufacturing, automotive accessories, and industrial equipment designed for reliability and performance.
                        </p>
                        <div className="mt-10 grid gap-6 md:grid-cols-3">
                            <article className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">SIAM</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    Premium components and systems for modern business needs.
                                </p>
                            </article>
                            <article className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">TPSMI</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    Advanced technology solutions crafted for safety and efficiency.
                                </p>
                            </article>
                            <article className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">TOP OFFROAD</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">
                                    Accessories and equipment built for rugged performance.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
