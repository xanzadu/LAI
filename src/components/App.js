/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import BillSearch from './BillSearch';
import BillResults from './BillResults';
import BillText from './BillText';

export default function App() {
  const [stage, setStage] = useState(0);
  const [id, setId] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [billText, setBillText] = useState('');
  const [cleanBillText, setCleanBillText] = useState('');

  if (stage === 0) {
    return (
      <ChakraProvider theme={theme}>
        <BillSearch
          setStage={setStage}
          id={id}
          setId={setId}
          setSearchResults={setSearchResults}
        />
      </ChakraProvider>
    );
  }
  if (stage === 1) {
    return (
      <ChakraProvider theme={theme}>
        <BillResults
          searchResults={searchResults}
          setStage={setStage}
          setBillText={setBillText}
          setCleanBillText={setCleanBillText}
        />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <BillText
        setStage={setStage}
        setId={setId}
        billText={billText}
        cleanBillText={cleanBillText}
      />
    </ChakraProvider>
  );
}
