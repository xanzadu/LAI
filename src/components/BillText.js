/* eslint-disable react/function-component-definition */
import React from 'react';
import axios from 'axios';
import {
  chakra,
  Box,
  VStack,
  useColorModeValue,
  HStack,
  StackDivider,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

export default function BilText({ billText, cleanBillText }) {
  const options = {
    method: 'GET',
    url: 'https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0',
    params: { sentences: '5', txt: cleanBillText },
    headers: {
      accept: 'application/json',
      'x-rapidapi-host': 'meaningcloud-summarization-v1.p.rapidapi.com',
      'x-rapidapi-key': '254d73f114mshb2ae960abfc3581p1e3b5djsnfecaf5b03e7f',
    },
  };
  const getSummary = () => {
    axios
      .request(options)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
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
          onClick={getSummary}
        >
          Run Experimental Natural Language Processing Text Summarizer{' '}
        </Button>
      </VStack>
    </HStack>
  );
}
