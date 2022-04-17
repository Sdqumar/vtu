import type { NextPage } from "next";

const Agent: NextPage = () => {
  return (
    <div className=" mx-10 my-20 h-fit w-fit items-center justify-center  rounded-md p-5 shadow-md md:w-[50%]">
      <h2 className="py-2 text-2xl font-medium">Become an Agent</h2>
      <p>
        As our agent, you will be earning commissions on all your transactions
        which will be in your earnings balance and you can withdraw to your bank
        anytime Below is the full list of all the commisions availble for our
        agents
      </p>

      <h2 className="py-2 text-2xl font-medium">Agent Fee</h2>
      <p>
        You only need to make a onetime payment of 2,000 naira only to upgrade
        your account to agent No subscriptions. Pay Once and continue to enjoy
        all our agent benefits
      </p>

      <h2 className="py-2 text-2xl font-medium">Refer a Friend</h2>
      <p>
        You can also tell your friends about Geotopup and continue to earn
        commissions on all their transactions for life Everytime those you refer
        make transactions you earn. It will also be in your earnings balance
        which you can withdraw anytime to your bank
      </p>
      <button
        onClick={() => {
          throw new Error("Sentry Frontend Error");
        }}
        className="w-fit"
      >
        Activate Agent Now (2000 Naira)
      </button>
    </div>
  );
};

export default Agent;
