import {Menu, UserRound, Search} from 'lucide-react';
import {Geist} from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default function Layout({children}: {children: React.ReactNode}) {
    return (
      <main>
          <header>
              <div className="flex items-center w-screen p-5 justify-center">
                  <div className="w-1/3 justify-start">
                      <Menu size={28}/>
                  </div>
                      <Link href="main" className="w-1/3 flex justify-center font-semibold text-3xl">
                          Codebakery
                      </Link>
                  <div  className="w-1/3 flex justify-end gap-5">
                      <Search size={28}/>
                      <UserRound size={28}/>
                  </div>
              </div>
              <div className="flex items-center w-screen px-5 gap-8 font-medium text-lg pb-3">
                  <Link href="shop">
                      <div>추천 강좌</div>
                  </Link>
                  <div>전체 강좌</div>
                  <Link href="shop">
                      <div>실습 키트</div>
                  </Link>
              </div>
          </header>
          {children}
      </main>
    );
}
