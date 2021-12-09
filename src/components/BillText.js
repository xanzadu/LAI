/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  useColorModeValue,
  HStack,
  StackDivider,
  Text,
  Button,
} from '@chakra-ui/react';
import { apiToken } from '../tokens';

// eslint-disable-next-line no-unused-vars
export default function BilText({ billText, cleanBillText }) {
  // eslint-disable-next-line no-unused-vars
  const [renderText, setRenderText] = useState('');
  const options = {
    method: 'POST',
    url: 'https://gpt-summarization.p.rapidapi.com/summarize',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'gpt-summarization.p.rapidapi.com',
      'x-rapidapi-key': apiToken,
    },
    data: {
      text: cleanBillText,
      num_sentences: 10,
    },
  };

  function getSummary() {
    axios
      .request(options)
      .then(response => {
        setRenderText('Loading...');
        setRenderText(response.data.summary);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <HStack
      bg={useColorModeValue('gray.50', 'inherit')}
      w="100vw"
      h="100vh"
      p={10}
    >
      <Box
        w="50vw"
        h="100vh"
        dangerouslySetInnerHTML={{ __html: cleanBillText }}
        overflow="scroll"
      />
      <VStack
        p={10}
        w="50vw"
        h="95vh"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
      >
        <Text>Text Summary</Text>
        <Button
          // alignItems="center"
          type="submit"
          colorScheme="brand"
          _focus={{ shadow: '' }}
          fontWeight="md"
          color="black"
          p={5}
          shadow="md"
          borderWidth="1px"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            setRenderText('Loading...');
            getSummary();
          }}
        >
          Run Experimental Natural Language Processing Text Summarizer{' '}
        </Button>
        <Text>{renderText}</Text>
      </VStack>
    </HStack>
  );
}
