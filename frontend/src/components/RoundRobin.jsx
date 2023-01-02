const RoundRobin = ({bracket}) => {
    return (<SingleEliminationBracket
      matches={bracket}
      matchComponent={Match}
    />
  )
};

  export default RoundRobin;