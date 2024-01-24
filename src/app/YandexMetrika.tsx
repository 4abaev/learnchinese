'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function YandexMetrika() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        // @ts-ignore
        ym(95626172, 'hit', url);

    }, [pathname, searchParams]);

    return null;
}