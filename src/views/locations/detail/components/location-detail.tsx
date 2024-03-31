import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spin, Alert, Card, Typography, List } from "antd";
import { Link } from "react-router-dom";
import { locations as locationQueries } from "../../../../gql/queries";
import { Locations as LocationsTypes } from "../../../../types";

const { Title, Text } = Typography;

const LocationDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<
    LocationsTypes.LocationDetailQueryData,
    LocationsTypes.LocationDetailQueryVars
  >(locationQueries.GET_LOCATION_DETAILS, { variables: { id: id! } });

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;
  if (!data || !data.location)
    return (
      <Alert
        message="Error"
        description="No location data found"
        type="error"
      />
    );

  const { location } = data;

  return (
    <Card hoverable style={{ maxWidth: 480, margin: "20px auto" }}>
      <Title level={2}>{location.name}</Title>
      <Text>
        <strong>Type:</strong> {location.type}
      </Text>
      <br />
      <Text>
        <strong>Dimension:</strong> {location.dimension}
      </Text>
      <br />
      <Text>
        <strong>Created:</strong> {new Date(location.created).toLocaleString()}
      </Text>
      <br />
      <Title level={4}>Residents</Title>
      <List
        bordered
        dataSource={location.residents}
        renderItem={(character) => (
          <List.Item>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LocationDetail;
