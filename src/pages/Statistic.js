import React, { useContext, useEffect, useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import { FetchContext } from '../context/FetchContext';

const StatisticItem = ({ stat }) => {
  return (
    <>
      <ListGroupItem>
        <ListGroupItemHeading>{stat.country}</ListGroupItemHeading>
        <ListGroupItemText>
          {stat.continent} - Total Population {stat.population}
        </ListGroupItemText>
      </ListGroupItem>
    </>
  );
};

const StatisticItemContainer = ({ statistics }) => {
  return (
    <ListGroup>
      {statistics && statistics.length
        ? statistics.map(stat => <StatisticItem key={stat._id} stat={stat} />)
        : 'No Inventory Items'}
    </ListGroup>
  );
};

const Statistict = () => {
  const fetchContext = useContext(FetchContext);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const getStatisticts = async () => {
      try {
        const { data } = await fetchContext.authAxios.get('/statistics');
        setStatistics(data);
      } catch (err) {
        console.log('the err', err);
      }
    };

    getStatisticts();
  }, [fetchContext]);

  return (
    <>
      <StatisticItemContainer statistics={statistics} />
    </>
  );
};

export default Statistict;
