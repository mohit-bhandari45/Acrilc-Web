'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import MainLoader from '@/components/universalcomps/mainloader';

export default function RouteGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (loading) return;

        const inAuthPath = pathname.startsWith('/auth');
        const protectedRoutes = ["/home"];

        const isProtectedRoute = protectedRoutes.some(prefix =>
            pathname === prefix || pathname.startsWith(prefix + '/')
        );

        if (!user && isProtectedRoute) {
            router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
            return;
        }

        if (user && inAuthPath) {
            if (!user.username) {
                router.replace('/auth/username');
            } else if (!user.preferences?.length) {
                router.replace('/auth/forte');
            } else if (!user.profilePicture) {
                router.replace('/auth/profile-pic');
            } else {
                router.replace(`/profile/${user.username}`);
            }
            return;
        }
    }, [user, loading, pathname, router]);

    if (loading) return <MainLoader msg="Loading, please wait" />;

    return <>{children}</>;
}
