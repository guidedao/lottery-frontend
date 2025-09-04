import { authOptions } from '@/lib/auth';

import AdminDecryptClient from './ClientPanel';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function TestCryptoPage() {
    const session = await getServerSession(authOptions);
    const address = (session as unknown as { address?: string } | null)?.address?.toLowerCase();
    const admin = (process.env.ADMIN_WALLET ?? '').toLowerCase();

    if (!address || !admin || address !== admin) {
        return (
            <div className='container mx-auto px-4 py-28'>
                <h1 className='text-2xl font-bold mb-2'>403 Forbidden</h1>
                <p>Доступ к этой странице только для администратора.</p>
            </div>
        );
    }

    return <AdminDecryptClient />;
}
