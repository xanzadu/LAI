/* eslint-disable react/function-component-definition */
import React from 'react';

export default function BilResults({ searchResults }) {
  console.log(searchResults);
  // const DisplayData = JsonData.map(info => (
  //   <tr>
  //     <td>{info.id}</td>
  //     <td>{info.name}</td>
  //     <td>{info.city}</td>
  //   </tr>
  // ));

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        {/* <tbody>{DisplayData}</tbody> */}
      </table>
    </div>
  );
}
