import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={className}>
      <Image
        src="/blog-logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="object-cover"
      />
    </div>
  );
};

export default Logo;
