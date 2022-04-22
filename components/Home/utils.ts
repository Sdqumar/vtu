export const prices = [
  {
    img: "/mtn.png",
    network: "MTN",
    prices: [
      {
        size: "500.0MB",
        price: "₦140",
        duration: "30 days",
        planCode: 500,
      },
      {
        size: "1.0GB",
        price: "₦255",
        duration: "30 days",
        planCode: 1000,
      },
      {
        size: "2.0GB",
        price: "₦510",
        duration: "30 days",
        planCode: 2000,
      },
      {
        size: "3.0GB",
        price: "₦765",
        duration: "30 days",
        planCode: 3000,
      },
      {
        size: "5.0GB",
        price: "₦1275",
        duration: "30 days",
        planCode: 5000,
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
        planCode: 2550,
      },
    ],
  },
  {
    img: "/airtel.png",
    network: "Airtel",
    prices: [
      {
        size: "100.0MB",
        price: "₦100",
        duration: "7 days",
        planCode: 601,
      },
      {
        size: "300.0MB",
        price: "₦135",
        duration: "7 days",
        planCode: 602,
      },
      {
        size: "500.0MB",
        price: "₦225",
        duration: "30 days",
        planCode: 603,
      },
      {
        size: "1.0GB",
        price: "₦400",
        duration: "30 days",
        planCode: 604,
      },
      {
        size: "2.0GB",
        price: "₦800",
        duration: "30 days",
        planCode: 605,
      },
      {
        size: "5.0GB",
        price: "₦2000",
        duration: "30 days",
        planCode: 606,
      },
    ],
  },
  {
    img: "/9mobile.png",
    network: "9mobile",
    prices: [
      {
        size: "750.0MB",
        price: "₦320",
        duration: "30 days",
        planCode: 401,
      },
      {
        size: "1.5GB",
        price: "₦620",
        duration: "30 days",
        planCode: 402,
      },
      {
        size: "2.0GB",
        price: "₦780",
        duration: "30 days",
        planCode: 403,
      },
      {
        size: "3.0GB",
        price: "₦980",
        duration: "30 days",
        planCode: 404,
      },
      {
        size: "4.5GB",
        price: "₦1020",
        duration: "30 days",
        planCode: 405,
      },
      {
        size: "11GB",
        price: "₦2420",
        duration: "30 days",
        planCode: 406,
      },
      {
        size: "15.0GB",
        price: "₦4050",
        duration: "30 days",
        planCode: 407,
      },
      {
        size: "40.0GB",
        price: "₦950",
        duration: "30 days",
        planCode: 408,
      },
      {
        size: "75.0GB",
        price: "₦13,200",
        duration: "30 days",
        planCode: 407,
      },
    ],
  },
  {
    img: "/glo.png",
    network: "GLO",
    prices: [
      {
        size: "1.0GB",
        price: "₦450",
        duration: "30 days",
        planCode: 301,
      },
      {
        size: "2.5GB",
        price: "₦850",
        duration: "30 days",
        planCode: 302,
      },
      {
        size: "4.5GB",
        price: "₦1250",
        duration: "30 days",
        planCode: 303,
      },
      {
        size: "7.7GB",
        price: "₦2050",
        duration: "30 days",
        planCode: 304,
      },
      {
        size: "10.0GB",
        price: "₦2450",
        duration: "30 days",
        planCode: 305,
      },
      {
        size: "13.25GB",
        price: "₦3250",
        duration: "30 days",
        planCode: 306,
      },
      {
        size: "18.25GB",
        price: "₦4100",
        duration: "30 days",
        planCode: 307,
      },
    ],
  },
];
export type form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  pin: number;
  maxLength?: "string";
};
