import React, {Component} from 'react';
import {Modal, Form, Input, Radio} from 'antd';
import "./UserComponent.css";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserModalForm extends Component {

  render() {

    const {visible, onCancel, onCreate, form} = this.props;
    const {getFieldDecorator} = form;

    return (
        <div>
          <Modal
              visible={visible}
              title={"Add new user"}
              okText={"Add"}
              onCancel={onCancel}
              onOk={onCreate}
              className={"addModal"}
          >
            <Form layout="vertical">
              <FormItem label="Username" required={false}>
                {getFieldDecorator('username', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    max: 60,
                    pattern: /^\S+$/,
                    message: "Please input user's name. Max 60 characters. No spaces.",
                  }],
                })(
                    <Input placeholder="user name (max: 60)"/>
                )}
              </FormItem>
              <FormItem label="Email" required={false}>
                {getFieldDecorator('email', {
                  validateTrigger: ['onBlur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    max: 60,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please input user's email. Max 60 characters. Email format.",
                  }],
                })(
                    <Input placeholder="user password (max: 60)"/>
                )}
              </FormItem>
              <FormItem label="Password" required={false}>
                {getFieldDecorator('password', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    max: 60,
                    pattern: /^\S+$/,
                    message: "Please input user's password. Max 60 characters. No spaces.",
                  }],
                })(
                    <Input placeholder="user password (max: 60)"/>
                )}
              </FormItem>
              <FormItem label="Role" required={false}>
                {getFieldDecorator('role', {
                  initialValue: "admin"
                })(
                    <RadioGroup>
                      <Radio value="admin">Admin</Radio>
                      <Radio value="user">User</Radio>
                    </RadioGroup>
                )}
              </FormItem>
            </Form>
          </Modal>
        </div>
    );
  }
}

export const WrappedUserModalForm = Form.create()(UserModalForm);