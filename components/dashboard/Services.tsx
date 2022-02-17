import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Airtime TopUp",
    img: "airtime",
  },
  {
    name: "Buy Data",
    img: "data",
  },
  {
    name: "Airtime to cash",
    img: "airtime2cash",
  },
  {
    name: "Cable Subscription",
    img: "cable",
  },
  {
    name: "Electricity Bills",
    img: "utility",
  },
  {
    name: "Education",
    img: "education",
  },
  {
    name: "Bonus to wallet",
    img: "fund",
  },
  {
    name: "Referral",
    img: "referral",
  },
];

export default function Services() {
  return (
    <section className="flex flex-wrap justify-center md:justify-around gap-4">
      {services.map((item) => (
        <Link
          href={item.name.replace(/ /g, "-").toLowerCase()}
          passHref
          key={item.name.replace(" ", "_")}
        >
          <a>
            <div className="shadow-xl bg-white w-60 h-60 md:w-44 md:h-40 flex flex-col  items-center justify-center  my-3 transition-all hover:shadow-2xl cursor-pointer hover:text-primary">
              <Image
                src={`/${item.img}.png`}
                priority={true}
                width={90}
                height={90}
                objectFit="contain"
                alt={item.name}
              />
              <h4 className="font-medium text-center ">{item.name}</h4>
            </div>
          </a>
        </Link>
      ))}
    </section>
  );
}
