import React, { useEffect } from 'react';
import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  HStack,
  Button,
  Box,
  IconButton,
  Text,
  VisuallyHidden,
  VStack,
  CloseButton,
} from '@chakra-ui/react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/Products/product.actions';
import { refreshToken } from '../redux/auth/auth.action';
import { Link } from 'react-router-dom';
const Home = () => {
  const bg = useColorModeValue('pink', 'gray.800');
  const mobileNav = useDisclosure();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  console.log(localStorage.getItem('errorToken'), state);
  
  useEffect(() => {
    dispatch(getProducts()).then((res) => {
      dispatch(refreshToken()).then((res) => dispatch(getProducts()));
    });
  }, []);
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Text fontSize={'xl'} fontWeight="500">
                LOGO
              </Text>
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              Company Name
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <Link to="/">Features</Link>
              <br />
              <Link to="/">Pricing</Link>
              <br />
              <Link to="/">Blog</Link>
              <br />
              <Link to="/">Company</Link>
              <br />
              <Link to="/login">Sign in</Link>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenuUnfold />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Home;
