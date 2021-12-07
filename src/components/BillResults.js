/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
import React, { useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';

export default function BillResults({ searchResults, setStage, setBillText, setCleanBillText }) {
  const billHelper = bill => {
    let billId = '';
    searchResults.forEach(result => {
      if (result.bill_number === bill) {
        billId = result.bill_id;
      }
    });
    return billId;
  };

  const getText = e => {
    const bill = e.target.innerHTML;
    const billId = billHelper(bill);
    axios
      .get(
        `https://api.legiscan.com/?key=154292cea454bf73ef77f2994bc3dd39&op=getBill&id=${billId}`
      )
      .then(results => {
        const docID = results.data.bill.texts[0].doc_id;
        axios
          .get(
            `https://api.legiscan.com/?key=154292cea454bf73ef77f2994bc3dd39&op=getBillText&id=${docID}`
          )
          .then(text => {
            const billText = text.data.text.doc;
            const cleanBillText = Buffer.from(billText, 'base64').toString();
            setBillText(billText);
            setCleanBillText(cleanBillText);
          })
          .then(setStage(2));
      });
  };

  const data = useMemo(() => searchResults, [searchResults]);
  const columns = useMemo(
    () => [
      {
        Header: 'Bill Number',
        accessor: 'bill_number',
        textPage: true,
      },
      {
        Header: 'Status Date',
        accessor: 'status_date',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  // if (Object.keys(searchResults).length === 0) {
  //   return <div>loading data</div>;
  // }

  return (
    <Box p={10} bg={useColorModeValue('gray.50', 'inherit')} w="100vw" h="100vh">
    <Table as="table" {...getTableProps()} bg="white">
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <Td
                  {...cell.getCellProps()}
                  // isTruncated={cell.column.isTruncated}
                  // minWidth="10px"
                  // h="10"
                  maxW="50vw"
                >
                  {' '}
                  {cell.column.textPage ? (
                    <Text
                      noOfLines={2}
                      color="blue"
                      cursor="pointer"
                      onClick={getText}
                    >
                      {cell.render('Cell')}
                    </Text>
                  ) : (
                    <Text noOfLines={2}>{cell.render('Cell')}</Text>
                  )}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
    </Box>
  );
}
