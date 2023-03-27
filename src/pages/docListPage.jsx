import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Text,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { getDocList } from "../miscellaneous/docAPIs";
import { Link } from "react-router-dom";
const DocListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDocList().then((res) => {
      setLoading(false);
      setData(res.data.data.staffs);
    });
  }, []);
  return (
    <>
      {loading ? (
        <Flex
          justifyContent={"center"}
          alignItems="center"
          w={"100vw"}
          h={"100vh"}
        >
          <Spinner />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Sr No.</Th>
                <Th>Image</Th>
                <Th>Doc Name</Th>
                <Th>Doc ID</Th>
                <Th>Slots</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((el,i) => {
                return (
                  <Tr key={el.key}>
                    <Td>{i+1}</Td>
                    <Td>
                      <Image
                        w={"70px"}
                        src={el.image_url}
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    </Td>
                    <Td>
                      <Text>
                        {el.first_name} {el.last_name}
                      </Text>
                    </Td>
                    <Td>{el.key}</Td>
                    <Td>
                      <Link to={`/slots/${el.key}`}>
                        <Button>View</Button>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DocListPage;
