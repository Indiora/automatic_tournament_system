import { SingleEliminationBracket, Match, MATCH_STATES, SVGViewer } from '@g-loot/react-tournament-brackets';


const SingleElimination = ({bracket}) => {
    return (<SingleEliminationBracket
      matches={bracket}
      matchComponent={Match}
    />
  )
};

  export default SingleElimination;