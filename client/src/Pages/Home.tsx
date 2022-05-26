import React, { useEffect, useState } from "react";
import ConsoleCard from "../Components/ConsoleCard";
import Axios from "axios";
import { ConsolesApi } from "../@Types";

type Props = {};

const Home = (props: Props) => {
  const [consoles, setConsoles] = useState<ConsolesApi[]>([]);
  useEffect(() => {
    Axios.get<ConsolesApi[]>("http://localhost:3001/console")
      .then((res) => {
        console.log(res.data);
        setConsoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container grid">
      {consoles.map((console) => (
        <ConsoleCard key={console.id} {...console} />
      ))}
    </div>
  );
};

export default Home;
