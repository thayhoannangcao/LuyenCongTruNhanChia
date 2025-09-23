'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
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

  const initializedRef = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      const timeout = new Promise<void>((resolve) => setTimeout(resolve, 5000));
      try {
        await Promise.race([getCurrentUser(), timeout]);
      } finally {
        if (!initializedRef.current) {
          initializedRef.current = true;
          setLoading(false);
        }
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await getCurrentUser();
      } else {
        setUser(null);
      }
      if (!initializedRef.current) {
        initializedRef.current = true;
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
  }, [user, router]);

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
      if (!initializedRef.current) {
        initializedRef.current = true;
        setLoading(false);
      }
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
