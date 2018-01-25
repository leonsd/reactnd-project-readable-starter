import React, { Component } from 'react'
import '../App.css'
import { capitalize } from '../utils/helpers'
import { Switch, Route, Link } from 'react-router-dom'
import PostsList from './PostsList'
import * as Api from '../utils/Api'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount = () => {
    Api.getCategories().then(categories => {
      this.setState({ categories })
    })
  }

  render() {
    const { categories } = this.state

    return (
      <Layout>
        <Header className="header">
          <div className="logo">
            <Link to='/'>Readable</Link>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="tags-o" />Categories</span>}>
                  {categories.map(category => (
                    <Menu.Item key={category.name}>
                      <Link to={`/posts/${category.path}`}>{capitalize(category.name)}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                {categories.map(category => (
                  <Route exact path={`/posts/${category.path}`} key={category.name} render={() => (
                    <PostsList category={category.name} />
                  )} />
                ))}
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Readable ©2018 Created by Leonardo Santos
        </Footer>
      </Layout>
    )
  }
}

export default App
