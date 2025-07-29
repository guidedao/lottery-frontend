import { notFound } from 'next/navigation';

import { getTranslations } from 'next-globe-gen';

export function generateMetadata() {
    const t = getTranslations();
    return { title: t('notFound.title') }; // Localized title for the 404 page
}
export default function CatchAllPage() {
    notFound(); // This triggers the 404 behavior
}
