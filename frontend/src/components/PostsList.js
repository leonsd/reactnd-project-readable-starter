import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, addPost, editPost, removePost } from '../actions/Post'
import { Row, Col, Form, Button, Divider, List, Avatar, Icon, Modal, Input, Select } from 'antd'
import * as Api from '../utils/Api'
const { TextArea } = Input
const InputGroup = Input.Group
const FormItem = Form.Item
const Option = Select.Option

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title="Create a new post"
        okText="Save"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of post!' }],
            })(
              <Input />
            )}
          </FormItem>
          <InputGroup>
            <Col span={12}>
              <FormItem label="Author">
                {getFieldDecorator('author')(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Category">
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Please input the category of post!' }],
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="react">React</Option>
                    <Option value="redux">Redux</Option>
                    <Option value="udacity">Udacity</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </InputGroup>
          <FormItem label="Body">
            {getFieldDecorator('body')(<TextArea rows={4} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
)

class PostsList extends Component {
  state = {
    visible: false
  }

  componentDidMount = () => {
    const { category, getPosts, getPostsByCategory } = this.props
    getPostsByCategory(category).then(posts => {
      getPosts(posts)
    })
  }

  showModal = (post = null) => {
    this.setState({ visible: true })
    console.log(post)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const { addPost } = this.props
    const form = this.form

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const post = {
        id: this.generateId(),
        title: values.title,
        author: values.author,
        timestamp: Date.now(),
        category: values.category,
        body: values.body
      }

      Api.addPost(post).then(res => {
        addPost(res)
        form.resetFields()
        this.setState({ visible: false })
      })
    });
  }

  saveFormRef = (form) => {
    this.form = form
  }

  generateId = () => {
    const randomized = Math.ceil(Math.random() * Math.pow(10, 12))
    let digito = Math.ceil(Math.log(randomized))
    while(digito > 10){
      digito = Math.ceil(Math.log(digito))
    }
    return (randomized + '-' + digito)
  }

  render() {
    const { posts } = this.props.posts
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8, marginLeft: 8 }} />
        {text}
      </span>
    )

    return(
      <div>
        <Row>
          <Col span={24}>
            <Button 
              type="primary" 
              onClick={this.showModal}
            >Add Post
            </Button>
          </Col>
        </Row>
        <Divider />
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={post => (
            <List.Item
              key={post.id}
              actions={[<IconText type="like-o" text={post.voteScore} />, <IconText type="message" text={post.commentCount} />]}
              extra={<Avatar icon='user' />}
            >
              <List.Item.Meta
                title={
                  [post.title,
                  <a 
                    key={post.id}
                    onClick={() => {this.showModal(post)}}>
                    <IconText type="edit" />
                  </a>]
                }
                description={`Author: ${post.author}`}
              />
              {post.body}
            </List.Item>
          )}
        />
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const posts = state.post
  return { 
    posts: posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (data) => dispatch(getPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
