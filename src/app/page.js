// `app/page.js` is the UI for the `/` URL

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={600}
                height={300}
                priority
              />
            </div>
          </div>

          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <Link href="/quiz" className="btn btn-primary btn-lg" role="button">
                Let&apos;s Start
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
