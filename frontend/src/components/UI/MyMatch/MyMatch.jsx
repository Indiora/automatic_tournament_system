import React, {useState} from "react";
import { Wrapper, TopText, Anchor, StyledMatch, Side, Team, Score, Line, BottomText } from './text';
import classes from "./MyMatch.module.css";

const MyMatch = ({
  match,
  onMatchClick,
  onPartyClick,
  onMouseEnter,
  onMouseLeave,
  topParty,
  bottomParty,
  topWon,
  bottomWon,
  topHovered,
  bottomHovered,
  topText,
  bottomText,
  connectorColor,
  computedStyles,
  teamNameFallback,
  resultFallback,
}) => {
  return (
    <Wrapper>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TopText>{topText}</TopText>
      {(match.href || typeof onMatchClick === 'function') && (
        <Anchor
          href={match.href}
          onClick={event =>
            onMatchClick?.({ match, topWon, bottomWon, event })
          }
        >
          <TopText>Match Details</TopText>
        </Anchor>
      )}
    </div>
    <StyledMatch>
      <Side
        onMouseEnter={() => onMouseEnter(topParty.id)}
        onMouseLeave={onMouseLeave}
        won={topWon}
        hovered={topHovered}
        onClick={() => onPartyClick?.(topParty, topWon)}
      >
        <Team>{topParty?.name}</Team>
        <Score won={topWon}>{topParty?.resultText}</Score>
      </Side>
      <Line highlighted={topHovered || bottomHovered} />
      <Side
        onMouseEnter={() => onMouseEnter(bottomParty.id)}
        onMouseLeave={onMouseLeave}
        won={bottomWon}
        hovered={bottomHovered}
        onClick={() => onPartyClick?.(bottomParty, bottomWon)}
      >
        <Team>{bottomParty?.name}</Team>
        <Score won={bottomWon}>{bottomParty?.resultText}</Score>
      </Side>
    </StyledMatch>
    <div>
      <button className={classes.MatchButton} onClick={() => {console.log({match})}}>hello</button>
      <button>ff</button>
    </div>
    <BottomText>{bottomText ?? ' '}</BottomText>
  </Wrapper>
)}


export default MyMatch;