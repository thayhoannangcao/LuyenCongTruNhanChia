// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { useForm } from 'react-hook-form';
// import z from 'zod';

// import { FormItem } from '@/components/common/FormItem';

// const schema = z.object({
//   username: z
//     .string()
//     .min(1, { message: 'Username is required' })
//     .max(15, { message: 'Username should be less than 15 characters' }),
//   password: z.string().min(1, { message: 'Password is required' }),
//   remember: z.boolean(),
// });
// export type TestFormData = z.infer<typeof schema>;

// const TestForm = ({ submitFn }: { submitFn: (data: TestFormData) => void }) => {
//   const {
//     control,
//     watch,
//     handleSubmit,
//     reset,
//     formState: { isValid },
//   } = useForm<TestFormData>({
//     mode: 'onChange',
//     defaultValues: { username: 'jsun969', password: '', remember: true },
//     resolver: zodResolver(schema),
//   });

//   return (
//     <Form
//       className="max-w-md"
//       onFinish={handleSubmit((data) => {
//         submitFn?.(data);
//       })}
//     >
//       <FormItem
//         control={control}
//         name="username"
//         label="Username"
//         help="default help message"
//         data-testid="username-field"
//       >
//         <Input />
//       </FormItem>
//       <FormItem
//         control={control}
//         name="password"
//         label="Password"
//         disabled={!watch('username')}
//         data-testid="password-field"
//       >
//         <Input />
//       </FormItem>
//       <FormItem control={control} name="remember" valuePropName="checked">
//         <Checkbox>Remember me</Checkbox>
//       </FormItem>
//       <Form.Item>
//         <Button loading={true} htmlType="submit">
//           Submit
//         </Button>
//         <Button type="primary" onClick={() => reset()}>
//           Reset
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default TestForm;


import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="flex items-center justify-between text-white bg-primary-600">
        <div className="text-2xl font-bold">Luyện toán</div>
        <div >Avatar</div>
      </Header>
        <Layout
        >
          <Sider theme='light' className='h-screen w-[300px]' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
        </Layout>
    </Layout>
  );
};

export default App;