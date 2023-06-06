import { Link, Outlet, useLocation } from 'react-router-dom';
import { umi_routes } from '~convention-routes';
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

const UmiLayout: React.FC = () => {
  const location = useLocation();

  const collator = new Intl.Collator('en');

  const items = Object.entries(umi_routes)
    .filter(([, value]) => !(value.id === '@@/global-layout' || value.id === '404'))
    .sort(([x], [y]) => collator.compare(x, y))
    .map(([, value]) => {
      if (value.path === '/') {
        return {
          label: <Link to={value.path}>{'index'}</Link>,
          key: value.path,
        };
      }
      return {
        label: <Link to={value.path}>{value.path}</Link>,
        key: '/' + value.path,
      };
    });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <Menu mode="inline" items={items} selectedKeys={[location.pathname]} />
      </Sider>
      <Content style={{ margin: '0 16px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default UmiLayout;
