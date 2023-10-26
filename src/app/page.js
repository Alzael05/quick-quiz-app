// `app/page.js` is the UI for the `/` URL
// "use client";

import Link from "next/link";

import Logo from "./components/Logo";

// const handleStart = () => {
//   redirect("/quiz");
// };

export default function Home() {
  return (
    <main>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <Logo width={600} height={300} />

          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <Link href="/quiz" className="btn btn-primary btn-lg" role="button">
                Let&apos;s Start
              </Link>

              {/* <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleStart}
              >
                Let&apos;s Start
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
