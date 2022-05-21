export const prices = [
  {
    img: "/mtn.png",
    network: "MTN SME",
    networkID: 1,
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
        price: "₦2550",
        duration: "30 days",
        planCode: 10000,
      },
    ],
  },
  {
    img: "/mtn.png",
    network: "MTN GIFTING",
    networkID: 1,
    prices: [
      {
        size: "500.0MB",
        price: "₦140",
        duration: "30 days",
        planCode: 216,
      },
      {
        size: "1.0GB",
        price: "₦260",
        duration: "30 days",
        planCode: 217,
      },
      {
        size: "2.0GB",
        price: "₦520",
        duration: "30 days",
        planCode: 209,
      },
      {
        size: "3.0GB",
        price: "₦780",
        duration: "30 days",
        planCode: 210,
      },
      {
        size: "5.0GB",
        price: "₦1300",
        duration: "30 days",
        planCode: 211,
      },
      {
        size: "10.0GB",
        price: "₦2600",
        duration: "30 days",
        planCode: 43,
      },
      {
        size: "15.0GB",
        price: "₦3900",
        duration: "30 days",
        planCode: 52,
      },
      {
        size: "20.0GB",
        price: "₦5200",
        duration: "30 days",
        planCode: 50,
      },
      {
        size: "40.0GB",
        price: "₦10400",
        duration: "30 days",
        planCode: 51,
      },
    ],
  },
  {
    img: "/airtel.png",
    network: "AIRTEL",
    networkID: 4,
    prices: [
      {
        size: "100.0MB",
        price: "₦100",
        duration: "7 days",
        planCode: 225,
      },
      {
        size: "300.0MB",
        price: "₦135",
        duration: "7 days",
        planCode: 226,
      },
      {
        size: "500.0MB",
        price: "₦225",
        duration: "30 days",
        planCode: 221,
      },
      {
        size: "1.0GB",
        price: "₦400",
        duration: "30 days",
        planCode: 222,
      },
      {
        size: "2.0GB",
        price: "₦800",
        duration: "30 days",
        planCode: 223,
      },
      {
        size: "5.0GB",
        price: "₦2000",
        duration: "30 days",
        planCode: 224,
      },
    ],
  },
  {
    img: "/9mobile.png",
    networkID: 3,
    network: "9MOBILE",
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
    networkID: 2,
    prices: [
      {
        size: "250.0GB",
        price: "₦370",
        duration: "30 days",
        planCode: 231,
      },
      {
        size: "1.0GB",
        price: "₦450",
        duration: "30 days",
        planCode: 194,
      },
      {
        size: "2.5GB",
        price: "₦850",
        duration: "30 days",
        planCode: 195,
      },
      {
        size: "4.5GB",
        price: "₦1250",
        duration: "30 days",
        planCode: 196,
      },
      {
        size: "7.7GB",
        price: "₦2050",
        duration: "30 days",
        planCode: 198,
      },
      {
        size: "10.0GB",
        price: "₦2450",
        duration: "30 days",
        planCode: 199,
      },
      {
        size: "13.25GB",
        price: "₦3250",
        duration: "30 days",
        planCode: 200,
      },
      {
        size: "18.25GB",
        price: "₦4100",
        duration: "30 days",
        planCode: 201,
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
  maxLength?: "string";
};
