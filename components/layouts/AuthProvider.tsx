'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { AuthUser } from '@/src/utils/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Lấy user hiện tại khi component mount
    getCurrentUser();

    // Lắng nghe thay đổi auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await getCurrentUser();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Theo dõi single-session: nếu current_client_id thay đổi khác client hiện tại -> sign out
  useEffect(() => {
    if (!user) return;
    const clientId = getClientId();
    const channel = supabase
      .channel('user-single-session')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`,
        },
        (payload: any) => {
          const newClient = (payload.new as any)?.current_client_id;
          if (newClient && newClient !== clientId) {
            supabase.auth.signOut();
            setUser(null);
            router.replace('/auth/login');
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const getCurrentUser = async () => {
    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (error || !authUser) {
        setUser(null);
        return;
      }

      // Lấy thông tin profile từ bảng users
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id, username, full_name, role')
        .eq('id', authUser.id)
        .single();

      if (profileError || !profile) {
        setUser(null);
        return;
      }

      setUser({
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
        role: profile.role || (profile.username === 'admin' ? 'admin' : 'user'),
      });
    } catch (error) {
      console.error('Error getting current user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function getClientId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('app_client_id');
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
