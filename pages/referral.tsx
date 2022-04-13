import type { NextPage as Referral } from "next";
import { useUser } from "../components/context/userContext";

const Agent: Referral = () => {
  const userContext = useUser();
  const user = userContext?.user;
  const referralID = user?.email.split(".")[0];

  return (
    <div className=" mx-10 my-20 h-fit w-fit items-center justify-center  rounded-md p-5 shadow-md md:w-[50%]">
      <h2 className="py-2 text-2xl font-medium">Refer Friends and Earn</h2>
      <p>
        Refer friends to us and earn commissions on al their transactions. There
        is no limit you keep earning commissions on all their transactions Your
        referral commisions goes to your earnings balance which you can withdraw
        to your bank or move to your main wallet to buy something on the
        platform
      </p>

      <h2 className="py-2 text-2xl font-medium">Referral Benefits</h2>
      <p>
        - Earn 0.2% on every Airtime, Direct Data, Electricity and Education
        transactions your prospects make - Earn 2 naira on every cheap
        sme/gifting data transactions your prospects make - You earn 300 naira
        immediately the person you refer upgrade to agent
      </p>

      <h2 className="py-2 text-2xl font-medium">Are you excited ?</h2>
      <p>
        Share your Referral Link -{" "}
        <a
          className="text-red-400"
          rel="noreferrer"
          target="_blank"
          href={`https://quadrorecharge.com/register/ref/${referralID}`}
        >
          {`https://quadrorecharge.com/register/ref/${referralID}`}
        </a>
      </p>
    </div>
  );
};

export default Agent;
