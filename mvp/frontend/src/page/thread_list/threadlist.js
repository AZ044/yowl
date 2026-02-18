        import { Layout, Breadcrumb, Button, Card, Form, Input, Upload, Space, Typography, List, Divider } from "antd";
        import * as antd from 'antd';
        import { ThreadAPI, TokenManager } from "../lib/api";        
        import React from "react";
        import "./style.css";

        const { Header, Content } = Layout;
        const { Title, Text } = Typography;
        const { TextArea } = Input;

        export default function ThreadList() {
            const [form] = Form.useForm();
            const [showCreateForm, setShowCreateForm] = React.useState(false);
            const [threads, setThreads] = React.useState([]);
            const [loading, setLoading] = React.useState(true);

            React.useEffect(() => {
                loadThreads();
            }, []);

            const loadThreads = async () => {
                try {
                    setLoading(true);
                    const data = await ThreadAPI.getAll();
                    setThreads(data);
                } catch (error) {
                    antd.message.error('Failed to load threads: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };

            const handleCreateThread = async (values) => {
                if (!TokenManager.isLoggedIn()) {
                    antd.message.error('You must be logged in to create a thread. Please login through the authentication system.');
                    return;
                }

                try {
                    const result = await ThreadAPI.create(values.subject, values.comment);
                    antd.message.success('Thread created successfully!');
                    form.resetFields();
                    setShowCreateForm(false);
                    loadThreads();
                } catch (error) {
                    antd.message.error('Failed to create thread: ' + error.message);
                }
            };


            const uploadProps = {
                beforeUpload: (file) => {
                    const isImage = file.type.startsWith('image/');
                    if (!isImage) {
                        antd.message.error('You can only upload image files!');
                    }
                    return false;
                },
                showUploadList: true,
                maxCount: 1,
            };

            const goToThread = (uuid) => {
                window.location.href = '/threadview?id=' + uuid;
            };

            return React.createElement(Layout, { className: 'layout-root' }, [
                React.createElement(Header, { 
                    key: 'header',
                    className: 'layout-header'
                }, [
                    React.createElement(Breadcrumb, {
                        key: 'breadcrumb',
                        separator: "/",
                        className: 'breadcrumb-white',
                        items: [
                            { title: React.createElement('span', { className: 'breadcrumb-item-white' }, 'Home') },
                            { title: React.createElement('span', { className: 'breadcrumb-item-white' }, 'cat') },
                            { title: React.createElement('span', { className: 'breadcrumb-item-white' }, 'Cats') }
                        ]
                    }),
                    React.createElement(Title, { 
                        key: 'title',
                        level: 3, 
                        class: 'title-white',
                        onClick:  () => window.location.href="/"
                    }, '5CHAN'),
                    React.createElement(Space, { key: 'actions' }, [
                        React.createElement(Button, {
                            key: 'create',
                            ghost: true,
                            onClick: () => setShowCreateForm(!showCreateForm)
                        }, 'Create New Thread'),
                    ])
                ]),
                React.createElement(Content, { 
                    key: 'content',
                    className: 'layout-content'
                }, [
                    showCreateForm && React.createElement(Card, {
                        key: 'create-form',
                        title: 'Create New Thread',
                        className: 'board-header'
                    }, [
                        React.createElement(Form, {
                            key: 'form',
                            form: form,
                            layout: 'vertical',
                            onFinish: handleCreateThread
                        }, [
                            React.createElement(Form.Item, {
                                key: 'subject',
                                label: 'Subject',
                                name: 'subject',
                                rules: [{ required: true, message: 'Please enter a subject' }]
                            }, [
                                React.createElement(Input, {
                                    placeholder: 'Enter thread subject'
                                })
                            ]),
                            React.createElement(Form.Item, {
                                key: 'comment',
                                label: 'Comment',
                                name: 'comment',
                                rules: [{ required: true, message: 'Please enter your comment' }]
                            }, [
                                React.createElement(TextArea, {
                                    rows: 4,
                                    placeholder: 'Enter your comment'
                                })
                            ]),
                            React.createElement(Form.Item, {
                                key: 'image',
                                label: 'Image',
                                name: 'image'
                            }, [
                                React.createElement(Upload, uploadProps, [
                                    React.createElement(Button, { icon: React.createElement('span', null) }, 'Choose File')
                                ])
                            ]),
                            React.createElement(Form.Item, { key: 'submit' }, [
                                React.createElement(Button, {
                                    type: 'primary',
                                    htmlType: 'submit',
                                    className: 'btn-create'
                                }, 'Post')
                            ])
                        ])
                    ]),
                    React.createElement('div', { key: 'threads' }, 
                        loading ? 
                            React.createElement('div', { style: { textAlign: 'center', padding: '20px' } }, 'Loading threads...')
                        :
                        threads.length === 0 ?
                            React.createElement('div', { style: { textAlign: 'center', padding: '20px' } }, 'No threads yet. Create one!')
                        :
                        threads.map(thread => 
                            React.createElement(Card, {
                                key: thread.uuid,
                                hoverable: true,
                                className: 'thread-card ant-card-hoverable',
                                onClick: () => goToThread(thread.uuid)
                            }, [
                                React.createElement('div', { 
                                    key: 'content',
                                    className: 'thread-item-content'
                                }, [
                                    React.createElement('div', {
                                        key: 'image',
                                        className: 'thread-item-image'
                                    }, 'Thread Image'),
                                    React.createElement('div', { 
                                        key: 'thread-content',
                                        className: 'thread-item-body'
                                    }, [
                                        React.createElement(Space, {
                                            key: 'header',
                                            className: 'thread-item-header'
                                        }, [
                                            React.createElement(Text, { 
                                                key: 'username',
                                                strong: true,
                                                className: 'username-purple'
                                            }, 'Anonymous'),
                                            React.createElement(Text, {
                                                key: 'post-number',
                                                type: 'secondary',
                                                className: 'meta-text'
                                            }, `No.${thread.uuid.substring(0, 8)}`)
                                        ]),
                                        React.createElement(Title, {
                                            key: 'title',
                                            level: 5,
                                            className: 'title-dark'
                                        }, thread.title),
                                        React.createElement(Text, {
                                            key: 'preview',
                                            type: 'secondary',
                                            className: 'preview-text'
                                        }, thread.description),
                                        React.createElement(Space, {
                                            key: 'meta',
                                            split: React.createElement(Divider, { type: 'vertical' })
                                        }, [
                                            React.createElement('a', {
                                                key: 'link',
                                                href: 'javascript:void(0)',
                                                onClick: (e) => {
                                                    e.stopPropagation();
                                                    goToThread(thread.uuid);
                                                },
                                                className: 'link-purple'
                                            }, 'Click to view thread →')
                                        ])
                                    ])
                                ])
                            ])
                        )
                    )
                ])
            ]);
        }