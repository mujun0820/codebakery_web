import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // ✅ 모든 도메인 허용
            },
        ],  // ✅ 허용할 이미지 도메인 추가
    },
    async redirects() {
        return [
            {
                source: "/",   // 사용자가 "/client" URL로 접근하면
                destination: "/client/main", // "/main" URL로 리다이렉트됩니다.
                permanent: true,      // 영구 리다이렉트 (HTTP 308)
            },
        ];
    },
};

export default nextConfig;
