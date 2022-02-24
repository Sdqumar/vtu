type payment = {
  total: number;
};
type user = {
  name: string;
  email: string;
};
export default function paymentConfig(user: user, payment: payment) {
  return {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: payment.total * 100,
    publicKey: "pk_test_cc89c527520c2442c1e462c3128f57442882a3ca",
    metadata: {
      ...user,
      ...payment,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "Name",
          value: user.name,
        },
      ],
    },
  };
}
