import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, editPost, removePost } from '../actions/Post'
import { Row, Col, Button, Divider, List, Avatar, Icon, Modal, Input, Select } from 'antd'
import * as Api from '../utils/Api'
const { TextArea } = Input
const InputGroup = Input.Group
const Option = Select.Option

class PostsList extends Component {
  state = {
    posts: [],
    modalAddPost: false
  }

  componentDidMount() {
    const { category } = this.props

    Api.getPosts(category).then(posts => {
      this.setState({ posts })
    })
  }

  showModal = () => {
    this.setState({
      modalAddPost: true,
    });
  }

  handleOk = (e) => {
    console.log(e)
    this.addPost()
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      modalAddPost: false,
    });
  }

  addPost = () => {
    const id = this.generateId()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    // const category = document.querySelector('#category').value
    const body = document.querySelector('#body').value
    const post = {
      id: id,
      title: title,
      author: author,
      timestamp: Date.now(),
      category: 'react',
      body: body
    }

    Api.addPost(post).then(res => {
      this.setState(state => (
        state.posts = state.posts.concat([ post ])
      ))

      this.setState({ modalAddPost: false })
    })
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
    const { posts } = this.state
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8, marginLeft: 8 }} />
        {text}
      </span>
    )

    return(
      <div>
        <Row>
          <Col span={24}><Button type="primary" onClick={this.showModal}>Add Post</Button></Col>
        </Row>
        <Divider />
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={post => (
            <List.Item
              key={post.id}
              actions={[<IconText type="like-o" text={post.voteScore} />, <IconText type="message" text="2" />]}
              extra={<Avatar icon='user' />}
            >
              <List.Item.Meta
                title={[post.title, <IconText type="edit" key={post.id} />]}
                description={`Author: ${post.author}`}
              />
              {post.body}
            </List.Item>
          )}
        />
        <Modal
          title="Add Post"
          visible={this.state.modalAddPost}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={24}><Input id='title' placeholder="Title" /></Col>
          </Row>
          <Row>
            <InputGroup>
              <Col span={12}>
                <Input id='author' placeholder="Author" />
              </Col>
              <Col span={12}>
                <Select defaultValue={this.props.category} id='category' style={{ width: '100%' }}>
                  <Option value="react">React</Option>
                  <Option value="redux">Redux</Option>
                  <Option value="udacity">Udacity</Option>
                </Select>
              </Col>
            </InputGroup>
          </Row>
          <Row>
            <Col span={24}><TextArea id='body' rows={4} placeholder="Body" /></Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ post }) {
  return {
    posts: []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
