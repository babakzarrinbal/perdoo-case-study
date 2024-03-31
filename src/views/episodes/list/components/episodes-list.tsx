import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Spin, Alert, List, Typography, Pagination } from "antd";
import { Link } from "react-router-dom";
import { episodes as episodesQuery } from "../../../../gql/queries";
import { Episodes as EpisodesTypes } from "../../../../types";

const { Title } = Typography;

const EpisodesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { loading, error, data } = useQuery<
    EpisodesTypes.EpisodesQueryData,
    EpisodesTypes.EpisodesQueryVars
  >(episodesQuery.GET_EPISODES, { variables: { page: currentPage } });

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;
  if (!data)
    return (
      <Alert
        message="Data Not Found"
        description="No episodes data available."
        type="error"
      />
    );

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Episodes
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={data.episodes.results}
        renderItem={(episode) => (
          <List.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%", // Make sure the width spans the full container
              }}
            >
              <div style={{ flex: 3, paddingRight: "16px" }}>
                {" "}
                {/* Adjust the right padding for spacing */}
                <Link
                  to={`/episodes/${episode.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Title level={4} style={{ marginBottom: "4px" }}>
                    {episode.name}
                  </Title>
                </Link>
                <p style={{ margin: 0 }}>
                  Episode: {episode.episode} - Air Date: {episode.air_date}
                </p>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                {" "}
                {/* Align the text to the right */}
                <span style={{ fontStyle: "italic" }}>
                  Characters: {episode.characters.length}
                </span>
              </div>
            </div>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePaginationChange}
        total={data.episodes.info.count}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default EpisodesList;
