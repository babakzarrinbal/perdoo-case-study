import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Table,
  Spin,
  Alert,
  Typography,
  Pagination,
  Input,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { characters as charactersQueries } from "../../../../gql/queries";
import { Characters as CharactersTypes } from "../../../../types";
import { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const CharactersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });
  const [pageSize] = useState(20);
  const { loading, error, data, refetch } = useQuery<
    CharactersTypes.CharactersQueryData,
    CharactersTypes.CharactersQueryVars
  >(charactersQueries.GET_CHARACTERS, {
    variables: { page: currentPage, filter: filters || {} },
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    console.log(filters);
    refetch();
    confirm();
    setFilters({
      ...filters,
      name: selectedKeys[0],
    });
  };

  const columns: ColumnsType<CharactersTypes.Character> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, character: CharactersTypes.Character) => (
        <Link to={`/characters/${character.id}`} className="characterLink">
          {text}
        </Link>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Type name here"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys as string[], refetch)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], refetch)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type?: string) => type || "N/A",
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error)
    return <Alert message="Error" description={error.message} type="error" />;

  return (
    <div className="charactersListContainer" style={{ padding: "24px" }}>
      <Title level={2}>Characters</Title>
      <Table
        columns={columns}
        dataSource={data?.characters.results}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        pageSize={pageSize}
        showSizeChanger={false}
        total={(data?.characters.info.pages || 0) * pageSize}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default CharactersList;
