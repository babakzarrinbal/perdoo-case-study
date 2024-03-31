import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spin, Alert, Card, Typography, List } from "antd";
import { Link } from "react-router-dom";
import { characters as charactersQueries } from "../../../../gql/queries";
import { Characters as CharactersTypes } from "../../../../types";

const { Title, Text, Paragraph } = Typography;

const CharacterDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<
    CharactersTypes.CharacterQueryData,
    CharactersTypes.CharacterQueryVars
  >(charactersQueries.GET_CHARACTER_DETAILS, {
    variables: { id: id! },
  });

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;
  if (!data)
    return (
      <Alert
        message="Error"
        description="No character data found"
        type="error"
      />
    );

  const { character } = data;

  return (
    <Card
      hoverable
      style={{ maxWidth: 480, margin: "20px auto" }}
      cover={<img alt={character.name} src={character.image} />}
    >
      <Title level={2}>{character.name}</Title>
      <Paragraph>
        <Text>
          <strong>Status:</strong> {character.status}
        </Text>
        <br />
        <Text>
          <strong>Species:</strong> {character.species}
        </Text>
        <br />
        <Text>
          <strong>Type:</strong> {character.type || "Unknown"}
        </Text>
        <br />
        <Text>
          <strong>Gender:</strong> {character.gender}
        </Text>
        <br />
        <Text>
          <strong>Origin:</strong> {character.origin?.name}
        </Text>
        <br />
        <Text>
          <strong>Last Known Location:</strong> {character.location?.name}
        </Text>
      </Paragraph>
      <Title level={4}>Episodes</Title>
      <List
        itemLayout="horizontal"
        dataSource={character.episode}
        renderItem={(episode) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/episodes/${episode.id}`}>{episode.name}</Link>}
              description={`${episode.episode} - Aired on ${episode.air_date}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CharacterDetail;
