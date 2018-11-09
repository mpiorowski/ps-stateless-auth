import React, {Component} from 'react';
import {Button, Col, Popconfirm, Row, Table} from 'antd';
import "./UserComponent.css";
import {addUser, deleteUser, getAllUsers} from "../../service/UserService";
import {WrappedUserModalForm} from "./UserModalForm";
import {userNotification} from "../../notification/UserNotification";

class UserComponent extends Component {

  state = {
    tableLoading: true,
    tableData: [],
    modalVisibility: false,
  };

  componentWillMount() {
    getAllUsers().then(response => {
      if (response) {
        response.forEach(val => this.add(val));
      }
      this.setState({
        tableLoading: false,
      })
    });
  }

  add = (val) => {
    const tableData = this.state.tableData;
    tableData.push({
      key: val.id,
      username: val.username,
      email: val.email,
      role: val.role ? val.role : 'admin',
    });
    this.setState({
      tableData: tableData,
    });
  };


  openModal = () => {
    this.setState({modalVisibility: true});
  };
  closeModal = () => {
    this.setState({modalVisibility: false});
  };
  submitModal = () => {
    const form = this.modalRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const user = {
          "user": values
        };
        addUser(user).then(response => {
          if (response) {
            form.resetFields();
            this.setState({modalVisibility: false});
            userNotification('success');
            this.add(values);
          }
        }).catch(err => {
          console.log(err);
          userNotification('wrong');
        })
      } else {
        console.log(err);
        userNotification('form');
      }
    });
  };
  saveRefModal = (modalRef) => {
    this.modalRef = modalRef;
  };
  handleDelete = (userId) => {
    deleteUser(userId).then(response => {
      if (response) {
        userNotification("delete");
        const tableData = [...this.state.tableData];
        this.setState({
          tableData: tableData.filter(item => item.key !== userId)
        });
      }
    })
  };

  render() {

    const columns = [{
      title: 'Username',
      dataIndex: 'username',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Role',
      dataIndex: 'role',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
      return (
          this.state.tableData.length >= 1
              ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                    <a href="">Delete</a>
                  </Popconfirm>
              ) : null
      );
    },
  }];

    function onChange() {
      console.log('dziala');
    }

    return (
        <div>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <Table
                  columns={columns}
                  dataSource={this.state.tableData}
                  onChange={onChange}
                  loading={this.state.tableLoading}
                  className={"userTable"}
                  size="middle"
                  // pagination={{pageSize: 2}}
                  bordered={true}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <Button type={"primary"} onClick={this.openModal}>Add user</Button>
              <WrappedUserModalForm
                  wrappedComponentRef={this.saveRefModal}
                  visible={this.state.modalVisibility}
                  onCancel={this.closeModal}
                  onCreate={this.submitModal}
              />
            </Col>
          </Row>
        </div>
    );
  }
}

export default UserComponent;