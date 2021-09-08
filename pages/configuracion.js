import Head from 'next/head';
import SettingsForm from '../components/SettingsForm';

export default function Configuracion() {
    return (
        <>
            <Head>
                <title>Configuracion | Crypto</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-800 pt-14 pb-28 px-3 md:px-8 h-auto">
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <SettingsForm />
                    </div>
                </div>
            </div>
        </>
    );
}
