import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spin, Alert, Card, Typography, List } from "antd";
import { Link } from "react-router-dom";
import { episodes as episodesQueries } from "../../../../gql/queries";
import { Episodes as EpisodesTypes } from "../../../../types";

const { Title, Text } = Typography;

const EpisodeDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<
    EpisodesTypes.EpisodeQueryData,
    EpisodesTypes.EpisodeQueryVars
  >(episodesQueries.GET_EPISODE_DETAILS, {
    variables: { id: id! },
  });

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;
  if (!data || !data.episode)
    return (
      <Alert message="Error" description="No episode data found" type="error" />
    );

  const { episode } = data;

  return (
    <Card hoverable style={{ maxWidth: 480, margin: "20px auto" }}>
      <Title level={2}>{episode.name}</Title>
      <Text>
        <strong>Air Date:</strong> {episode.air_date}
      </Text>
      <br />
      <Text>
        <strong>Episode:</strong> {episode.episode}
      </Text>
      <br />
      <Title level={4}>Characters</Title>
      <List
        itemLayout="horizontal"
        dataSource={episode.characters}
        renderItem={(character) => (
          <List.Item>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EpisodeDetail;
