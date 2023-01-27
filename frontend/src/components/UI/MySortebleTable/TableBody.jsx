import classes from "./MySortebleTable.module.css";


const TableBody = ({ tableData, columns }) => {
    return (
     <tbody className={classes.tableBody}>
      {tableData.map((data) => {
       return (
        <tr key={data.participant}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor] ? data[accessor] : "0";
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;