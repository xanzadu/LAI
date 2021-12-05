/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import Sentiment from 'sentiment';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import BillSearch from './BillSearch';
import BillResults from './BillResults';
import BillText from './BillText';

const sentiment = new Sentiment();

// export default function App() {
//   return (
//     <ChakraProvider theme={theme}>
//       <Box textAlign="center" fontSize="xl">
//         <Grid minH="100vh" p={3}>
//           <ColorModeSwitcher justifySelf="flex-end" />
//           <VStack spacing={8}>
//             <Logo h="40vmin" pointerEvents="none" />
//             <Text>
//               Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
//             </Text>
//             <Link
//               color="teal.500"
//               href="https://chakra-ui.com"
//               fontSize="2xl"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learn Chakra
//             </Link>
//           </VStack>
//         </Grid>
//       </Box>
//     </ChakraProvider>
//   );
// }

const Face = function ({ mood }) {
  if (mood === 0) {
    return <p>&#128528;</p>;
  }
  if (mood < 0) {
    return <p>&#128577;</p>;
  }
  return <p>&#128522;</p>;
};

export default function App() {
  const [stage, setStage] = useState(0);
  const [id, setId] = useState('');
  const [searchResults, setSearchResults] = useState({});

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const textSentiment = sentiment.analyze(text);
  //   setMood(textSentiment.score);
  //   setText('');
  // };
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
        <BillResults searchResults={searchResults} />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <BillText setStage={setStage} setId={setId} />
    </ChakraProvider>
  );
}
