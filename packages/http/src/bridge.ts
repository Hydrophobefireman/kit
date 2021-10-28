import type {} from "statedrive";

import { Bridge } from "@hydrophobefireman/flask-jwt-jskit";
import { _util } from "@hydrophobefireman/kit";
import { redirect } from "@hydrophobefireman/ui-lib";

export function buildHttpClient({
  loginEndPoint,
  refreshTokenEndPoint,
  initialAuthCheckEndPoint,
  loginRoute,
}: {
  loginEndPoint?: string;
  refreshTokenEndPoint?: string;
  initialAuthCheckEndPoint?: string;
  loginRoute?: string;
}) {
  const client = new Bridge<any>(null);

  // change these according to your backend
  client.setRoutes({
    loginRoute:
      loginEndPoint || _util.warn("/api/login", "Using default Login Route"),
    refreshTokenRoute:
      refreshTokenEndPoint ||
      _util.warn("/api/refresh", "Using default Refresh Route"),
    initialAuthCheckRoute:
      initialAuthCheckEndPoint ||
      _util.warn("/api/users/me", "Using default Auth check route"),
  });
  client.onLogout(() =>
    redirect(loginRoute || _util.warn("/login", "Using default Login Page"))
  );

  const { useAuthState, useIsLoggedIn } = client.getHooks();

  const requests = client.getHttpClient();

  return { useAuthState, useIsLoggedIn, requests, client };
}
