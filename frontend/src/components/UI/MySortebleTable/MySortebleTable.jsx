import React, { useState } from 'react'
import TableBody from './TableBody';
import TableHead from './TableHead';
import { useSortableTable } from '../../../hooks/useSortableTable';


const MySortebleTable = () => {

  const data = ([{ participant: "aboba", win: 2, loose: 1, pts: 4 },
                  { participant: "ibib", win: 1, loose: 2, pts: 2 },
                  { participant: "lulu", win: 0, loose: 0, pts: 5 },
                ]);
  const columns = [
    { label: "Participant", accessor: "participant", sortable: true },
    { label: "Win", accessor: "win", sortable: true },
    { label: "Loose", accessor: "loose", sortable: true },
    { label: "Pts", accessor: "pts", sortable: true, sortbyOrder: "desc" },
  ];

  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default MySortebleTable