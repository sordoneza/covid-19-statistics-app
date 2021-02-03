import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import NumberText from '../components/NumberText';
import Search from '../components/Search';
import { FetchContext } from '../context/FetchContext';

const StatisticItem = ({ stat }) => {
  const {
    country,
    continent,
    population,
    cases: { total: totalCases },
    tests: { total: totalTest },
    deaths: { total: totalDeaths },
  } = stat;
  return (
    <>
      <ListGroupItem className="list-group-item-action">
        <ListGroupItemHeading>{country}</ListGroupItemHeading>
        <ListGroupItemText>
          {continent}{' '}
          <NumberText
            label="Total Population"
            value={population}
            className={'text-primary'}
          />{' '}
          <NumberText
            label="Cases"
            value={totalCases}
            className={'text-warning'}
          />{' '}
          <NumberText
            label="Tests"
            value={totalTest}
            className={'text-success'}
          />{' '}
          <NumberText
            label="Deaths"
            value={totalDeaths}
            className={'text-danger'}
          />
          <Link className="float-right" to={`/statistics/${country}`}>
            More details...
          </Link>
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
        : 'Loading ...'}
    </ListGroup>
  );
};

const Statistict = () => {
  const fetchContext = useContext(FetchContext);
  const [statistics, setStatistics] = useState([]);

  const getStatisticts = async ({ countryId } = {}) => {
    try {
      if (countryId) {
        const { data } = await fetchContext.authAxios.get(
          `/statistics/${countryId}`,
        );

        setStatistics([data]);
      }

      if (!countryId) {
        const { data } = await fetchContext.authAxios.get('/statistics');

        setStatistics(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatisticts();
  }, [fetchContext]);

  return (
    <>
      <Search getStatisticts={getStatisticts} />
      <StatisticItemContainer statistics={statistics} />
    </>
  );
};

export default Statistict;
