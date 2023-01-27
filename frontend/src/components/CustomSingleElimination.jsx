import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import useWindowSize from '../hooks/useWindowSize';
import MyMatch from './UI/MyMatch/MyMatch';
import MyMatchEdit from './UI/MyMatchEdit/MyMatchEdit';
import { AuthContext } from '../context';
import React, { useState, useContext } from "react";


// тут проверять владелец ли пользователь
const DarkTheme = createTheme({
  textColor: { main: '#000000', highlighted: '#ffffff9c', dark: '#afacac9c' },
  matchBackground: { wonColor: 'rgb(33, 37, 41)', lostColor: 'rgb(33, 37, 41)' },
  score: {
    background: { wonColor: 'rgb(33, 37, 41)', lostColor: 'rgb(33, 37, 41)' },
    text: { highlightedWonColor: '#159448', highlightedLostColor: 'rgb(148, 51, 51)' },
  },
  border: {
    color: 'rgb(44, 48, 53)',
    highlightedColor: '#159448',
  },
  roundHeader: { backgroundColor: '#159448', fontColor: 'rgb(25, 32, 36)' },
  connectorColor: '#CED1F2',
  connectorColorHighlight: '#159448',
  svgBackground: '#FAFAFA',
});


export const CustomSingleEliminationBracket = ({bracket}) => {
  const { user } = useContext(AuthContext);
  const windowSize = useWindowSize();
  const finalWidth = Math.max(windowSize.width, 500);
  const finalHeight = Math.max(windowSize.height, 500);
  const simpleSmallBracket = [
    {
      "id": 19753,
      "nextMatchId": null,
      "tournamentRoundText": "3",
      "startTime": "2021-05-30",
      "state": "SCHEDULED",
      "participants": [
        {
          "id": "d8b9f00a-0ffa-4527-8316-da701894768e",
          "resultText": null,
          "isWinner": false,
          "status": null,
          "name": "Art of kill",
          "picture": "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      "id": 19754,
      "nextMatchId": 19753,
      "tournamentRoundText": "2",
      "startTime": "2021-05-30",
      "state": "SCHEDULED",
      "participants": [
        {
          "id": "14754a1a-932c-4992-8dec-f7f94a339960",
          "resultText": 1,
          "isWinner": false,
          "status": "PLAYED",
          "name": "CoKe BoYz",
          "picture": "teamlogos/client_team_default_logo"
        },
        {
          "id": "d8b9f00a-0ffa-4527-8316-da701894768e",
          "resultText": 3,
          "isWinner": true,
          "status": "PLAYED",
          "name": "Art of kill",
          "picture": "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      "id": 19755,
      "nextMatchId": 19754,
      "tournamentRoundText": "1",
      "startTime": "2021-05-30",
      "state": "SCORE_DONE",
      "participants": [
        {
          "id": "14754a1a-932c-4992-8dec-f7f94a339960",
          "resultText": 2,
          "isWinner": true,
          "status": "PLAYED",
          "name": "CoKe BoYz",
          "picture": "teamlogos/client_team_default_logo"
        },
        {
          "id": "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
          "resultText": 1,
          "isWinner": false,
          "status": "PLAYED",
          "name": "Aids Team",
          "picture": "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      "id": 19756,
      "nextMatchId": 19754,
      "tournamentRoundText": "1",
      "startTime": "2021-05-30",
      "state": "RUNNING",
      "participants": [
        {
          "id": "d8b9f00a-0ffa-4527-8316-da701894768e",
          "resultText": null,
          "isWinner": false,
          "status": null,
          "name": "Art of kill",
          "picture": "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      "id": 19757,
      "nextMatchId": 19753,
      "tournamentRoundText": "2",
      "startTime": "2021-05-30",
      "state": "SCHEDULED",
      "participants": []
    },
    {
      "id": 19758,
      "nextMatchId": 19757,
      "tournamentRoundText": "1",
      "startTime": "2021-05-30",
      "state": "SCHEDULED",
      "participants": [
        {
          "id": "9397971f-4b2f-44eb-a094-722eb286c59b",
          "resultText": null,
          "isWinner": false,
          "status": null,
          "name": "Crazy Pepes",
          "picture": "teamlogos/client_team_default_logo"
        }
      ]
    },
    {
      "id": 19759,
      "nextMatchId": 19757,
      "tournamentRoundText": "1",
      "startTime": "2021-05-30",
      "state": "SCHEDULED",
      "participants": [
        {
          "id": "42fecd89-dc83-4821-80d3-718acb50a30c",
          "resultText": null,
          "isWinner": false,
          "status": null,
          "name": "BLUEJAYS",
          "picture": "teamlogos/client_team_default_logo"
        },
        {
          "id": "df01fe2c-18db-4190-9f9e-aa63364128fe",
          "resultText": null,
          "isWinner": false,
          "status": null,
          "name": "Bosphorus",
          "picture": "teamlogos/r7zn4gr8eajivapvjyzd"
        }
      ]
    }
  ]
  return (
    <SingleEliminationBracket
      matches={bracket}
      theme={DarkTheme}
      options={{
        style: {
          roundHeader: { backgroundColor: '#1D8044', fontColor: 'rgb(33, 37, 41)' },
          connectorColor: 'rgb(24, 58, 24)',
          connectorColorHighlight: '#159448',
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          background="#FFF"
          SVGBackground="rgb(25, 32, 36)"
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
      matchComponent={true ? MyMatchEdit : MyMatch}
    />
  );
};