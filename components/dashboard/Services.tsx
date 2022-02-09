import Image from "next/image";

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
    name: "My Referrals",
    img: "referral",
  },
];

export default function Services() {
  return (
    <section className="flex flex-wrap justify-center">
      {services.map((item) => (
        <div
          className="shadow-xl bg-white w-44 h-40  flex flex-col  items-center justify-center  m-3 transition-all hover:shadow-2xl cursor-pointer hover:text-primary"
          key={item.name}
        >
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
      ))}
    </section>
  );
}
