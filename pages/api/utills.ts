export const getToken = async () => {
  const key = Buffer.from(
    `MK_TEST_AWZX1QJ3CJ:KK7LLP0MCL2T1TYY2FKDB8GGUE67ELW4`
  ).toString("base64");
  const authorization = `Basic ${key}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };
  const url = "https://sandbox.monnify.com/api/v1/auth/login";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers,
    });
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};
