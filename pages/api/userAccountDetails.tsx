import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let token = await getToken();
  token = token.responseBody.accessToken;

  const authorization = `Bearer ${token}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };
  const body = JSON.parse(req.body);

  const url =
    "https://sandbox.monnify.com/api/v2/bank-transfer/reserved-accounts/" +
    body.email;

  try {
    const data = await fetch(url, {
      headers,
    });

    const result = await data.json();
    console.log(result);

    if (!result.requestSuccessful) {
      throw new Error(result.responseMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(400).send({ error: "Error User Account Created!" });
  }
}

const getToken = async () => {
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
