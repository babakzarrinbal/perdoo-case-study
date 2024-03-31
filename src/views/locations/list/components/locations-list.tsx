import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Spin, Alert, List, Typography, Pagination } from "antd";
import { Link } from "react-router-dom";
import { locations as locationsQueries } from "../../../../gql/queries";
import { Locations as LocationsTypes } from "../../../../types";

const { Title } = Typography;

const LocationList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery<
    LocationsTypes.LocationsQueryData,
    LocationsTypes.LocationQueryVars
  >(locationsQueries.GET_LOCATIONS, {
    variables: { page: currentPage, filter: {} },
  });

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Locations</Title>
      <List
        itemLayout="horizontal"
        dataSource={data?.locations.results}
        renderItem={(location) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`/locations/${location.id}`}>{location.name}</Link>
              }
              description={`Type: ${location.type} - Dimension: ${location.dimension}`}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={20} // Default page size
        onChange={handlePaginationChange}
        total={data?.locations.info.count}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default LocationList;
