import Image from "next/image";
import { useRouter } from "next/router";

export default function Whatsapp() {
  const router = useRouter();

  return (
    <div className="fixed right-1 bottom-6 z-10 text-2xl">
      {router.pathname !== "/" && (
        <a
          href="https://wa.me/+2347013038554"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/whatsapp.svg"
            width={70}
            height={70}
            className="rounded-full"
            alt="whatsapp"
          />
        </a>
      )}
    </div>
  );
}
