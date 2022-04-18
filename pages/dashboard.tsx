import type { NextPage } from "next";
import { useUser } from "../components/context/userContext";
import AccountHistory from "../components/dashboard/AcountHistory";
import Services from "../components/dashboard/Services";
import logger from "../logger/logger";

const Dashboard: NextPage = () => {
  const userContext = useUser();
  const user = userContext?.user!;
  // Logging to pino-logflare.
  // Will get sent to Logflare via HTTP.
  logger.info("Client side logging. Logged with pino-logflare.");

  // Logging with pino.
  // Will appear only in the console of the client.
  const onlyPino = require("pino")();

  onlyPino.info("Client side logging. Logged with pino.");
  return (
    user && (
      <main className="mx-auto max-w-3xl lg:mx-16 ">
        {user && (
          <section className="mt-14  text-center text-3xl font-bold capitalize text-gray-800 md:ml-0 md:text-left">
            Hello, {user?.name || user?.displayName}
          </section>
        )}
        <AccountHistory />
        <Services />
      </main>
    )
  );
};

export default Dashboard;
