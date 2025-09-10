import AdminPanel from '@/components/Admin/AdminPanel';
import { authOptions } from '@/lib/auth';

import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const address = (session as unknown as { address?: string } | null)?.address?.toLowerCase();
    const admin = (process.env.ADMIN_WALLET ?? '').toLowerCase();

    if (!address || !admin || address !== admin) {
        return (
            <div className='container mx-auto px-4 py-28'>
                <h1 className='text-2xl font-bold mb-2'>403 Forbidden</h1>
                <p>Access to this page is restricted to the administrator.</p>
            </div>
        );
    }

    return <AdminPanel />;
}
