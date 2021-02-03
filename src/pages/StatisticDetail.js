import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CardDeck, Card, CardTitle, CardText, Button } from 'reactstrap';
import NumberCardText from '../components/NumberCardText';
import NumberText from '../components/NumberText';
import StatisticDialog from '../components/StatisticDialog';
import { FetchContext } from '../context/FetchContext';

const StatisticDetail = () => {
  const { id } = useParams();
  const fetchContext = useContext(FetchContext);

  const [stat, setStat] = useState();
  const [displayDialog, setDisplayDialog] = useState(false);
  const [updateOption, setUpdateOption] = useState('');

  const getStat = async countryId => {
    try {
      const { data } = await fetchContext.authAxios.get(
        `/statistics/${countryId}`,
      );

      setStat(data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDialog = opt => {
    setUpdateOption(opt);
    setDisplayDialog(!displayDialog);
  };

  useEffect(() => {
    getStat(id);
  }, [id]);

  if (!stat) {
    return <div className="p-4">Loading...</div>;
  }

  const { country, continent, population, cases, tests, deaths } = stat;

  return (
    <>
      {displayDialog && (
        <StatisticDialog
          open={displayDialog}
          toggle={toggleDialog}
          stat={stat}
          updateOption={updateOption}
        />
      )}
      {stat && (
        <Card id="statiticDetail" body>
          <CardTitle tag="h5">{country}</CardTitle>
          <CardText>
            {continent} -
            <NumberText
              label="Total Population"
              value={population}
              variant="info"
            />
            <Link className="float-right" to={`/statistics`}>
              Back
            </Link>
          </CardText>
          <CardDeck>
            <Card body outline color="warning">
              <CardTitle tag="h5" className="text-warning">
                Cases
                <Button
                  className="float-right"
                  color="link"
                  onClick={() => toggleDialog('Cases')}
                >
                  Update
                </Button>
              </CardTitle>
              <NumberCardText
                label={'New'}
                value={cases.newers}
                variant="dark"
              />
              <NumberCardText
                label={'Active'}
                value={cases.active}
                variant="dark"
              />
              <NumberCardText
                label="Critical"
                value={cases.critical}
                variant="danger"
              />
              <NumberCardText
                label="Recovered"
                value={cases.recovered}
                variant="success"
              />
              <NumberCardText label="TOT CASES/1M POP" value={cases.M_POP} />
              <NumberCardText label="Total" value={cases.total} />
            </Card>
            <Card body outline color="info">
              <CardTitle tag="h5" className="text-info">
                Tests
              </CardTitle>
              <NumberCardText label="TESTS/1M POP" value={tests.M_POP} />
              <NumberCardText label="Total" value={tests.total} />
            </Card>

            <Card body outline color="danger">
              <CardTitle tag="h5" className="text-danger">
                Deaths
              </CardTitle>
              <NumberCardText label={'New'} value={deaths.newers} />
              <NumberCardText label="DEATHS/1M POP" value={deaths.M_POP} />
              <NumberCardText label="Total" value={deaths.total} />
            </Card>
          </CardDeck>
        </Card>
      )}
    </>
  );
};

export default StatisticDetail;
