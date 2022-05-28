import React, { useEffect, useState } from "react";

import ConsoleCard from "../Components/ConsoleCard";
import { useAxios } from "../Hooks";
import { ConsolesApi } from "../@Types";

type Props = {};

const Home = (props: Props) => {
  const [consoles, setConsoles] = useState<ConsolesApi[]>([]);
  const { error, loading, response } = useAxios("/console", "get");
  useEffect(() => {
    if (response !== null) {
      setConsoles(response);
      console.log(response);
    }
  }, [response]);
  return (
    <div className="container grid">
      {consoles.map((console, index) => (
        <ConsoleCard key={console.id} {...console} index={index} />
      ))}
    </div>
  );
};

export default Home;
