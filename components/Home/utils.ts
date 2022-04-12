export const prices = [
  {
    img: "/mtn.png",
    network: "MTN",
    prices: [
      {
        size: "500.0MB",
        price: "₦150",
        duration: "30 days",
        planeCode: 500,
      },
      {
        size: "1.0GB",
        price: "₦250",
        duration: "30 days",
        planeCode: 1000,
      },
      {
        size: "2.0GB",
        price: "₦450",
        duration: "30 days",
        planeCode: 2000,
      },
      {
        size: "3.0GB",
        price: "₦650",
        duration: "30 days",
        planeCode: 3000,
      },
      {
        size: "5.0GB",
        price: "₦1050",
        duration: "30 days",
        planeCode: 5000,
      },
      {
        size: "10.0GB",
        price: "₦2050",
        duration: "30 days",
        planeCode: 10000,
      },
    ],
  },
  {
    img: "/airtel.png",
    network: "Airtel",
    prices: [
      {
        size: "750MB",
        price: "₦500",
        duration: "30 days",
        planeCode: 501,
      },
      {
        size: "1.5GB",
        price: "₦950",
        duration: "30 days",
        planeCode: 502,
      },
      {
        size: "2.0GB",
        price: "₦1020",
        duration: "30 days",
        planeCode: 503,
      },
      {
        size: "3.0GB",
        price: "₦1400",
        duration: "30 days",
        planeCode: 504,
      },
      {
        size: "4.5GB",
        price: "₦1900",
        duration: "30 days",
        planeCode: 505,
      },
      {
        size: "6GB",
        price: "₦2350",
        duration: "30 days",
        planeCode: 506,
      },
      {
        size: "8GB",
        price: "₦2800",
        duration: "30 days",
        planeCode: 507,
      },
      {
        size: "11GB",
        price: "₦3700",
        duration: "30 days",
        planeCode: 508,
      },
      {
        size: "15GB",
        price: "₦4700",
        duration: "30 days",
        planeCode: 509,
      },
      {
        size: "40GB",
        price: "₦9300",
        duration: "30 days",
        planeCode: 510,
      },
      {
        size: "75GB",
        price: "₦13900",
        duration: "30 days",
        planeCode: 511,
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
        planeCode: 401,
      },
      {
        size: "1.5GB",
        price: "₦620",
        duration: "30 days",
        planeCode: 402,
      },
      {
        size: "2.0GB",
        price: "₦780",
        duration: "30 days",
        planeCode: 403,
      },
      {
        size: "3.0GB",
        price: "₦1000",
        duration: "30 days",
        planeCode: 404,
      },
      {
        size: "4.5GB",
        price: "₦1050",
        duration: "30 days",
        planeCode: 405,
      },
      {
        size: "11GB",
        price: "₦2450",
        duration: "30 days",
        planeCode: 406,
      },
      {
        size: "15.0GB",
        price: "₦4100",
        duration: "30 days",
        planeCode: 407,
      },
    ],
  },
  {
    img: "/glo.png",
    network: "GLO",
    prices: [
      {
        size: "1GB",
        price: "₦450",
        duration: "30 days",
        planeCode: 301,
      },
      {
        size: "2.5GB",
        price: "₦850",
        duration: "30 days",
        planeCode: 302,
      },
      {
        size: "4.5GB",
        price: "₦1250",
        duration: "30 days",
        planeCode: 303,
      },
      {
        size: "7.7GB",
        price: "₦2050",
        duration: "30 days",
        planeCode: 304,
      },
      {
        size: "10GB",
        price: "₦2450",
        duration: "30 days",
        planeCode: 305,
      },
      {
        size: "13.25GB",
        price: "₦3250",
        duration: "30 days",
        planeCode: 306,
      },
      {
        size: "18.25GB",
        price: "₦4100",
        duration: "30 days",
        planeCode: 307,
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
