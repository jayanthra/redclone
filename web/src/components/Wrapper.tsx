import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {
  size?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({children, size= "regular"}) => {
    return (
      <Box mt={8} mx="auto" maxW={size === 'regular' ? "600px" : "400px"} w="100%">
        {children}
      </Box>
    );
}