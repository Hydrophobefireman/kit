import { Bridge } from "@hydrophobefireman/flask-jwt-jskit";
import { _util } from "@hydrophobefireman/kit";
import { redirect } from "@hydrophobefireman/ui-lib";

const client = new Bridge<any>(null);

// change these according to your backend
client.setRoutes({
  loginRoute:
    process.env.KIT_API_LOGIN_ROUTE ||
    _util.warn("/api/login", "Using default Login Route"),
  refreshTokenRoute:
    process.env.KIT_API_REFRESH_ROUTE ||
    _util.warn("/api/refresh", "Using default Refresh Route"),
  initialAuthCheckRoute:
    process.env.KIT_API_AUTH_CHECK_ROUTE ||
    _util.warn("/api/users/me", "Using default Auth check route"),
});
client.onLogout(() =>
  redirect(
    process.env.LOGIN_PAGE || _util.warn("/login", "Using default Login Page")
  )
);

const { useAuthState, useIsLoggedIn } = client.getHooks();

const requests = client.getHttpClient();

export { useAuthState, useIsLoggedIn, requests, client };
