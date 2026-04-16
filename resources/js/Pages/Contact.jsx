import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <Header />
            <main className="min-h-[calc(100vh-120px)] bg-white text-gray-900">
                <section className="mx-auto max-w-6xl px-6 py-20">
                    <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 shadow-xl shadow-red-100/50">
                        <h1 className="text-4xl font-bold uppercase tracking-[0.24em] text-red-700">Contact Us</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-800">
                            Need more information? We’re here to help. Reach out to our team and we’ll connect you to the right people.
                        </p>
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">Email</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">support@sundia.com</p>
                            </div>
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-red-100/60">
                                <h2 className="text-xl font-semibold text-red-700">Phone</h2>
                                <p className="mt-3 text-sm leading-6 text-gray-700">+62 21 1234 5678</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
