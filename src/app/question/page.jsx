import Link from 'next/link';

export default function Question() {
  return (
      <div className='container'>
        <div>

        </div>
        <div >
          <Link href='/question'>
            <button>Let&apos;s Start</button>
          </Link>
        </div>
      </div>
  );
}
