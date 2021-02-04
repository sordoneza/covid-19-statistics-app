import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

  const history = useHistory();

  return (
    <>
      <ListGroupItem
        className="list-group-item-action"
        onDoubleClick={() => history.push(`/statistics/${country}`)}
      >
        <ListGroupItemHeading>{country}</ListGroupItemHeading>
        <ListGroupItemText>
          {continent}{' '}
          <NumberText
            label="Total Population"
            value={population}
            variant="primary"
          />{' '}
          <NumberText label="Cases" value={totalCases} variant="warning" />{' '}
          <NumberText label="Tests" value={totalTest} variant="success" />{' '}
          <NumberText label="Deaths" value={totalDeaths} variant="danger" />
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
  const [error, setError] = useState('');

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

        setError('');
        setStatistics(data);
      }
    } catch (err) {
      setError('No results found for your search.');
      setStatistics([]);
    }
  };

  useEffect(() => {
    getStatisticts();
  }, []);

  return (
    <>
      <Search getStatisticts={getStatisticts} />
      {error ? (
        <em className="text-warning">{error}</em>
      ) : (
        <StatisticItemContainer statistics={statistics} />
      )}
    </>
  );
};

export default Statistict;
