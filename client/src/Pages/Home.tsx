import React, { useEffect, useState } from "react";

import ConsoleCard from "../Components/ConsoleCard";
import { fetchConsoles } from "../Api";
import { ConsolesApi } from "../@Types";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const Home = (props: Props) => {
  const { data } = useQuery(["console"], fetchConsoles);
  return (
    <div className="container grid">
      {data?.map((console, index) => (
        <ConsoleCard key={console.id} {...console} index={index} />
      ))}
    </div>
  );
};

export default Home;
