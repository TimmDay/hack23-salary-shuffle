import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import "./styles/globals.css";
import "./styles/theme.css";
import "./styles/tippy.css";
import "./styles/typography.css";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
// const indieFlower = Indie_Flower({ weight: "400" });

export const metadata: Metadata = {
  title: "Celery Sack of Rice",
  description: "Learn about Salary Sacrifice and Superannuation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${inter.className}`}>
        <main className={styles.main}>
          <nav className={styles.nav}>
            <Link href="/">
              <div className={styles.logo}>
                <div>{"Salary Sacrifice"}</div>
                <div>{" Salary Shuffle"}</div>
              </div>
            </Link>
            <Link href="/expats">Retiring Overseas</Link>
            <Link href="/extraBenefits">Why super?</Link>
            <Link href="/voluntary">Personal Contributions</Link>
            <Link href="/carryForward">Carry Forwards</Link>
            <Link href="/fhss">FHSS</Link>
            <Link href="/hecs">HECS</Link>
          </nav>
          <div className={styles.content}>{children}</div>
        </main>
      </body>
    </html>
  );
}
