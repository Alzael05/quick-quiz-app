import { Button } from 'bootstrap';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <main className='container'>
      <div>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
          priority
        />
        <div>
          <Link href='/question'>
            <Button>Let&apos;s Start</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
