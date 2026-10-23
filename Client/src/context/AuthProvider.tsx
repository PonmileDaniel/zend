import { useCallback, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser } from "../services/authApi";
import { AuthContext, type CurrentUser } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const currentUser = await getCurrentUser();

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
