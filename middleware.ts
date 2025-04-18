import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rotas que não precisam de autenticação
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/terms",
  "/privacy",
  "/api",
  "/donations",
]

// Verificar se a rota atual é pública
const isPublicRoute = (path: string) => {
  return publicRoutes.some(
    (route) =>
      path === route ||
      path.startsWith("/reset-password/") ||
      path.startsWith("/api/") ||
      path.startsWith("/donations/"),
  )
}

export function middleware(request: NextRequest) {
  // MODO DE DESENVOLVIMENTO: Desativando proteção de rotas
  // Retorna NextResponse.next() para todas as rotas, permitindo acesso sem autenticação
  return NextResponse.next()

  // CÓDIGO ORIGINAL COMENTADO ABAIXO
  /*
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");

  // Se a rota for pública, permitir acesso
  if (isPublicRoute(pathname)) {
    // Se o usuário estiver autenticado e tentar acessar uma rota pública de autenticação
    // (login, signup, etc.), redirecionar para o dashboard
    if (token && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Se a rota não for pública e o usuário não estiver autenticado,
  // redirecionar para a página de login
  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
