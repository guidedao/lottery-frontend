'use client';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { encryptWithAdminPub } from '@/lib/xChaCha20/encrypt-cha';

function bytesToHex(bytes: Uint8Array): string {
    return '0x' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminDecryptClient() {
    const [plain, setPlain] = useState('Hello, GuideDAO!');
    const [encHex, setEncHex] = useState('');
    const [decOut, setDecOut] = useState<string | null>(null);
    const [decError, setDecError] = useState<string | null>(null);
    const [isEncrypting, setEncrypting] = useState(false);
    const [isDecrypting, setDecrypting] = useState(false);

    const hasAdminPub = useMemo(() => !!process.env.NEXT_PUBLIC_ADMIN_PUB_HEX, []);

    const doEncrypt = useCallback(async () => {
        setEncrypting(true);
        setDecOut(null);
        setDecError(null);
        try {
            const payload = await encryptWithAdminPub(plain);
            setEncHex(bytesToHex(payload));
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setDecError(`Ошибка шифрования: ${msg}`);
        } finally {
            setEncrypting(false);
        }
    }, [plain]);

    const doDecrypt = useCallback(async () => {
        setDecrypting(true);
        setDecOut(null);
        setDecError(null);
        try {
            const res = await fetch('/api/admin/decrypt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ payloadHex: encHex.trim() })
            });

            const data = (await res.json()) as { message?: string; error?: string; details?: string };

            if (!res.ok) {
                if (res.status === 401) setDecError('Не авторизован. Подключите кошелек и войдите.');
                else if (res.status === 403) setDecError('Вы не админ!');
                else setDecError(data?.error || 'Ошибка дешифрования');
                return;
            }

            setDecOut(data.message ?? null);
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setDecError(`Ошибка сети: ${msg}`);
        } finally {
            setDecrypting(false);
        }
    }, [encHex]);

    return (
        <div className='container mx-auto px-4 py-28'>
            <h1 className='text-2xl font-bold mb-4'>Test Encrypt/Decrypt (Admin)</h1>

            {!hasAdminPub && (
                <div className='mb-4 text-sm text-red-500'>
                    Внимание: переменная NEXT_PUBLIC_ADMIN_PUB_HEX не задана. Шифрование не сработает.
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-4 rounded-md border border-gray-700/30 bg-white/5'>
                    <h2 className='font-semibold mb-2'>Шифрование</h2>
                    <label className='block text-sm mb-1'>Сообщение</label>
                    <textarea
                        className='w-full p-2 rounded-md bg-black/20 border border-gray-700/30 min-h-28'
                        value={plain}
                        onChange={(e) => setPlain(e.target.value)}
                    />
                    <div className='mt-3 flex gap-2'>
                        <Button onClick={doEncrypt} disabled={isEncrypting}>
                            {isEncrypting ? 'Шифрую…' : 'Зашифровать'}
                        </Button>
                    </div>

                    <label className='block text-sm mt-4 mb-1'>Зашифровано (hex)</label>
                    <textarea
                        className='w-full p-2 rounded-md bg-black/20 border border-gray-700/30 min-h-28 font-mono text-xs'
                        value={encHex}
                        onChange={(e) => setEncHex(e.target.value)}
                    />
                </div>

                <div className='p-4 rounded-md border border-gray-700/30 bg-white/5'>
                    <h2 className='font-semibold mb-2'>Дешифрование (через API, только админ)</h2>
                    <label className='block text-sm mb-1'>Вставьте payload (hex)</label>
                    <textarea
                        className='w-full p-2 rounded-md bg-black/20 border border-gray-700/30 min-h-28 font-mono text-xs'
                        value={encHex}
                        onChange={(e) => setEncHex(e.target.value)}
                    />
                    <div className='mt-3 flex gap-2'>
                        <Button onClick={doDecrypt} disabled={isDecrypting || !encHex.trim()}>
                            {isDecrypting ? 'Дешифрую…' : 'Дешифровать через API'}
                        </Button>
                    </div>

                    {decOut && (
                        <div className='mt-4'>
                            <div className='text-sm mb-1'>Результат</div>
                            <div className='p-2 rounded-md bg-black/20 border border-gray-700/30 whitespace-pre-wrap'>
                                {decOut}
                            </div>
                        </div>
                    )}
                    {decError && <div className='mt-4 text-sm text-red-500'>{decError}</div>}
                </div>
            </div>
        </div>
    );
}
