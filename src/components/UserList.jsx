import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";

const UserList = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usersFromStorage = getUsers();
    setUsers(usersFromStorage);
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(email);
      setUsers(getUsers());
    }
  };

  const handleEdit = (index) => {
    localStorage.setItem("editUserIndex", index);
    navigate("/edit-user");
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #eef1fc, #f9f9ff)",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Container
        className="p-4 rounded"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }} >
        <Row
          className="align-items-center mb-4"
          style={{ flexWrap: "nowrap" }}
        >
          <Col
            style={{
              fontWeight: "700",
              color: "#0d6efd",
              fontSize: "1.75rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            User List
          </Col>

          <Col
            xs="auto"
            style={{ display: "flex", gap: "10px", flexShrink: 0 }}
          >
            <Button
              variant="primary"
              size="sm"
              style={{ borderRadius: "0.5rem", width: "100px" }}
              onClick={() => navigate("/create-user")}
            >
              Create
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleLogoutClick}
              style={{ borderRadius: "0.5rem", width: "100px" }}
            >
              Logout
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by Email"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ borderRadius: "0.5rem" }}
            />
          </Col>
        </Row>

        <Table
          striped
          bordered
          hover
          responsive
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <thead className="table-primary">
            <tr>
              <th style={{ width: "5%" }}>Sl No.</th>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "25%" }}>Email ID</th>
              <th style={{ width: "15%" }}>Phone</th>
              <th style={{ width: "30%", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(users.indexOf(user))}
                      style={{ borderRadius: "0.3rem" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.email)}
                      style={{ borderRadius: "0.3rem" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserList;
