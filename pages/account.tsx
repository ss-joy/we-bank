import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const BankAccount = (): JSX.Element => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    balance: "",
  });
  useEffect(() => {
    async function getSessionData() {
      const session = await getSession();

      if (session) {
        const response = await fetch(
          `/api/user-details/${session?.user!.user_id}`
        );
        const pResponse = await response.json();
        console.log(pResponse);
        setUser({
          name: pResponse.data.name,
          email: pResponse.data.email,
          balance: pResponse.data.balance,
        });
      }
    }
    getSessionData();
  }, []);

  return (
    <div>
      <section>
        <Image
          className="block mx-auto"
          src={"/ui-images/avatar.png"}
          alt="avatar image"
          width={400}
          height={400}
        />
      </section>
      <section className="mx-auto shadow shadow-slate-500 p-4 rounded-lg font-bold text-xl md:w-2/3 ">
        <p className="my-4 ml-4 ">
          <span className="bg-green-300 p-2 rounded-md">email</span>
          <span className="ml-4">{user.email}</span>
        </p>
        <p className="my-4 ml-4">
          <span className="bg-green-300 p-2 rounded-md">name</span>
          <span className="ml-4">{user.name}</span>
        </p>
        <p className="my-4 ml-4">
          <span className="bg-green-300 p-2 rounded-md">
            Current account balance
          </span>
          <span className="ml-4">{user.balance}</span>$
        </p>
      </section>
    </div>
  );
};

export default BankAccount;
export const getServerSideProps = (async (context) => {
  const sessionFound = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!sessionFound) {
    return {
      redirect: {
        destination: "/helper/no-auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}) satisfies GetServerSideProps<{}>;