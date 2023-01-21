import MyRoundRobinMatch from "./UI/MyRoundRobinMatch/MyRoundRobinMatch";

const RoundRobin = ({id, bracket}) => {
    console.log(bracket)
    return (
      <>
          {bracket.map((round) =>
                <div  class="row mb-3">
                {round.map((match) => 
                  <MyRoundRobinMatch id={id} match={match}/>
                  )}
               </div>
          )} 
      </>
  )
};

  export default RoundRobin;