import React, { useEffect, useState } from "react";

import ConsoleCard from "../Components/ConsoleCard";
import { useAxios } from "../Hooks";
import { ConsolesApi } from "../@Types";

type Props = {};

const Home = (props: Props) => {
  const { error, loading, response } = useAxios<ConsolesApi[]>({
    url: "/console",
    method: "GET",
  });
  return (
    <div className="container grid">
      {response?.data.map((console, index) => (
        <ConsoleCard key={console.id} {...console} index={index} />
      ))}
    </div>
  );
};

export default Home;
