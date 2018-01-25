import React, { Component } from 'react'
import { Row, Col, Button, Divider, List, Avatar, Icon } from 'antd'
import * as Api from '../utils/Api'

class PostsList extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const { category } = this.props

    Api.getPosts(category).then(posts => {
      this.setState({ posts })
    })
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
          <Col span={24}><Button type="primary">Add Post</Button></Col>
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
                title={[post.title, <IconText type="edit" />]}
                description={`Author: ${post.author}`}
              />
              {post.body}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default PostsList
