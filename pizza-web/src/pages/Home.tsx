import React from 'react'
import { useSelector } from 'react-redux'
import {
  CircularProgress,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import Pizzas from '../components/list/Pizzas'
import Drinks from '../components/list/Drinks'

export default function Home() {
  const loading = useSelector((state: AppState) => state.config.loading)

  return (
    <Tabs align='center' variant='soft-rounded' variantColor='blue' py='1rem'>
      <TabList>
        <Tab>Pizzas</Tab>
        <Tab>Drinks</Tab>
      </TabList>
      {loading && (
        <Flex justify='center' my='1rem'>
          <CircularProgress isIndeterminate color='green'></CircularProgress>
        </Flex>
      )}
      <TabPanels>
        <TabPanel>
          <Pizzas />
        </TabPanel>
        <TabPanel>
          <Drinks />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
