import MyRoundRobinMatch from "./UI/MyRoundRobinMatch/MyRoundRobinMatch";
import MySortebleTable from "./UI/MySortebleTable/MySortebleTable";
import { useState } from "react";

const RoundRobin = ({id, bracket}) => {
    const [round, setBracket] = useState([])
    console.log(bracket[0])
    return (
      <>
          {bracket.map((round, i) =>
                <div  className="row mb-3" key={i}>
                {round.map((match) => 
                  <MyRoundRobinMatch id={id} match={match} key={match.id}/>
                  )}
               </div>
          )} 
          <div className="mt-5">
              <MySortebleTable/>
          </div>
      </>
  )
};

  export default RoundRobin;