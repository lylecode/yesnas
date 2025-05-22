import Image from 'next/image';
import Link from 'next/link';
const Logo = () => {
  return (
    <Link className="flex flex-col items-center justify-start p-4 pr-8 text-center" href="/">
      <Image src="/logo.png" width={130} height={32} priority alt="YES NAS" className="object-contain" />
    </Link>
  );
};

export default Logo;
