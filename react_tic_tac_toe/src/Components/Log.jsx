
export default function Log({turns}) {

  return (<ol id="log">
    {/* info from updatedTurns in 'App.jsx'
    loop through the turns which player selcted which square(row and column)
    key will be the row and column selected bc that will be a unique value since players cannot select the same square
    */}
   {turns.map((turn) => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>)}
  </ol>);
}
