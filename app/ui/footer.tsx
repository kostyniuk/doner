import Image from 'next/image';

interface FooterLinkProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, iconSrc, iconAlt, children }) => (
  <a
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src={iconSrc}
      alt={iconAlt}
      width={16}
      height={16}
    />
    {children}
  </a>
);

export default function Footer(): React.ReactNode {
  return (
    <footer className="flex gap-[24px] flex-wrap items-center justify-center p-4">
      <FooterLink
        href="https://nextjs.org/learn"
        iconSrc="/file.svg"
        iconAlt="File icon"
      >
        Learn
      </FooterLink>
      <FooterLink
        href="https://github.com"
        iconSrc="/github.svg"
        iconAlt="GitHub icon"
      >
        GitHub
      </FooterLink>
      <FooterLink
        href="https://nextjs.org/docs"
        iconSrc="/docs.svg"
        iconAlt="Docs icon"
      >
        Documentation
      </FooterLink>
    </footer>
  );
}

