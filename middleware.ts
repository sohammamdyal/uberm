import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
 
  publicRoutes: ["/AdminSignin"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\\.[\\w]+$)", "/AdminSignin"],
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Matches all routes except static files and _next
    '/', 
    '/(api|trpc)(.*)', 
  ],
};
