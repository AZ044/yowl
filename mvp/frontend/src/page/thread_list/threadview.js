import { Layout, Breadcrumb, Button, Card, Form, Input, Upload, Space, Typography, Avatar, Tag } from 'antd';
import * as antd from 'antd';

import React from 'react';
import { ThreadAPI, TokenManager } from "../lib/api";     

        const { Header, Content } = Layout;
        const { Title, Text } = Typography;
        const { TextArea } = Input;

        export default function ThreadView() {
            const [form] = Form.useForm();
            const [threadData, setThreadData] = React.useState(null);
            const [loading, setLoading] = React.useState(true);

            const urlParams = new URLSearchParams(window.location.search);
            const threadId = urlParams.get('id');

            React.useEffect(() => {
                if (threadId) {
                    loadThread();
                }
            }, [threadId]);

            const loadThread = async () => {
                try {
                    setLoading(true);
                    const data = await ThreadAPI.getById(threadId);
                    setThreadData(data);
                } catch (error) {
                    antd.message.error('Failed to load thread: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };

            const handleReplySubmit = async (values) => {
                if (!TokenManager.isLoggedIn()) {
                    antd.message.error('You must be logged in to post a reply. Please login through the authentication system.');
                    return;
                }

                try {
                    await ThreadAPI.createPost(threadId, values.comment);
                    antd.message.success('Reply posted successfully!');
                    form.resetFields();
                    loadThread();
                } catch (error) {
                    antd.message.error('Failed to post reply: ' + error.message);
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

            return React.createElement(Layout, { className: 'layout-root' }, [
                React.createElement(Header, { 
                    key: 'header',
                    className: 'layout-header'
                }, [
                    React.createElement('div', { key: 'nav', className: 'nav-container' }, [
                        React.createElement('a', { 
                            key: 'back-link',
                            href: '/threadlist', 
                            className: 'back-link-white'
                        }, 'Return to Board')
                    ]),
                    React.createElement(Title, { 
                        key: 'title',
                        level: 3, 
                        class: 'title-white'
                    }, 'Thread View'),
                ]),
                React.createElement(Content, { 
                    key: 'content',
                    className: 'layout-content'
                }, [
                    React.createElement(Card, {
                        key: 'reply-form',
                        title: 'Post Reply',
                        className: 'board-header reply-form'
                    }, [
                        React.createElement(Form, {
                            key: 'form',
                            form: form,
                            layout: 'vertical',
                            onFinish: handleReplySubmit
                        }, [
                            React.createElement(Form.Item, {
                                key: 'comment',
                                label: 'Comment',
                                name: 'comment',
                                rules: [{ required: true, message: 'Please enter your comment!' }]
                            }, [
                                React.createElement(TextArea, {
                                    rows: 4,
                                    placeholder: 'Enter your comment...'
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
                                }, 'Post Reply')
                            ])
                        ])
                    ]),
                    loading ? 
                        React.createElement('div', { key: 'loading', style: { textAlign: 'center', padding: '20px' } }, 'Loading thread...')
                    :
                    !threadData ?
                        React.createElement('div', { key: 'not-found', style: { textAlign: 'center', padding: '20px' } }, 'Thread not found')
                    :
                    React.createElement('div', { key: 'posts' }, 
                        threadData.post.map((post, index) => 
                            React.createElement(Card, {
                                key: post.uuid,
                                className: 'post-item thread-card'
                            }, [
                                React.createElement('div', { 
                                    key: 'post-content',
                                    className: 'post-item-content'
                                }, [
                                    React.createElement('div', {
                                        key: 'image',
                                        className: 'post-item-image'
                                    }, 'Post Image'),
                                    React.createElement('div', { 
                                        key: 'content',
                                        className: 'post-item-body'
                                    }, [
                                        React.createElement(Space, {
                                            key: 'header',
                                            className: 'post-item-header'
                                        }, [
                                            React.createElement(Text, { 
                                                key: 'username',
                                                strong: true,
                                                className: 'username-purple'
                                            }, post.pseudo || 'Anonymous'),
                                            React.createElement(Text, {
                                                key: 'post-number',
                                                type: 'secondary',
                                                className: 'meta-text'
                                            }, `No.${post.uuid.substring(0, 8)}`)
                                        ]),
                                        React.createElement(Text, {
                                            key: 'text'
                                        }, post.message)
                                    ])
                                ])
                            ])
                        )
                    )
                ])
            ]);
        }
