import { NextResponse, NextRequest } from "next/server";
import { fallbackLng, locales, LocaleTypes } from "@/utils/localization/settings";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. URL에 이미 언어 경로가 포함된 경우
  const isLocalePresent = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (isLocalePresent) {
    // 언어 경로가 있는 경우 그대로 진행
    return NextResponse.next();
  }

  // 2. 브라우저 언어 감지
  const acceptLanguage = request.headers.get("accept-language") || "";
  const detectedLanguage = detectLanguage(acceptLanguage);

  // 3. 감지된 언어에 따라 리다이렉트
  const redirectUrl = new URL(`/${detectedLanguage}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

// 언어 감지 함수
function detectLanguage(acceptLanguageHeader: string): LocaleTypes {
  const languages = acceptLanguageHeader
    .split(",")
    .map((lang) => {
      const [code] = lang.split(";"); // 'en-US;q=0.9' → 'en-US'
      return code.split("-")[0] as LocaleTypes; // 'en-US' → 'en'
    });

  // 지원 언어 중 감지된 언어 반환, 없으면 기본 언어 반환
  return languages.find((lang) => locales.includes(lang)) || fallbackLng;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};