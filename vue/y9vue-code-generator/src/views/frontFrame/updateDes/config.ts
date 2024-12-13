export default () => {
    /**
     * @name: treeList
     * @description: 左侧列表数据 id和右侧的id需要一致才能滚动定位 name 版本号
     * @date: 2023--06--07
     */
    let treeList = [
        { id: '1', name: 'V1.6.8' },
        { id: '2', name: 'V1.6.9' },
        { id: '3', name: 'V1.7.4' },
        { id: '4', name: 'V1.7.5' },
        { id: '5', name: 'V1.7.6' },
        { id: '6', name: 'V1.7.7' },
        { id: '7', name: 'V2.0.2' },
        { id: '8', name: 'V2.0.4' },
        { id: '9', name: 'V2.0.5' },
        { id: '10', name: 'V2.0.6' },
        { id: '11', name: 'V2.0.7' },
        { id: '12', name: 'V2.0.8' },
        { id: '13', name: 'V2.0.9' },
        { id: '14', name: 'V2.1.0' },
        { id: '15', name: 'V2.1.1' },
        { id: '16', name: 'V2.1.2' },
        { id: '17', name: 'V2.1.3' },
        { id: '18', name: 'v2.1.5' },
        { id: '19', name: 'v2.1.7' },
        { id: '20', name: 'v2.1.8' }
    ];
    /**
     * @name: description
     * @description: 右侧内容，id和左侧id对应 version版本号
     * @description: name 组件名称 date 日期 info就是进度条里的内容
     * @date: 2023--06--07
     */
    let description = [
        {
            id: '20',
            version: 'V2.1.8',
            name: '表单组件的上传图片功能，传入默认列表时，如果限制数量和默认列表数量，屏蔽上传',
            date: '2024-2-23',
            author: 'fuyu',
            info: [
                {
                    title: '表单组件的上传图片功能，传入默认列表时，如果限制数量和默认列表数量，屏蔽上传',
                    value: [
                        {
                            content: '表单组件的上传图片功能，传入默认列表时，如果限制数量和默认列表数量，屏蔽上传'
                        }
                    ]
                }
            ]
        },
        {
            id: '19',
            version: 'V2.1.7',
            name: '列表组件、表格组件中分页组件的设置记忆性参数传递',
            date: '2024-2-21',
            author: 'chensiwen',
            info: [
                {
                    title: '列表组件、表格组件中分页组件的设置记忆性参数传递',
                    value: [
                        {
                            content: '列表组件、表格组件中分页组件的设置记忆性参数传递，与分页组件相同使用方式'
                        }
                    ]
                }
            ]
        },
        {
            id: '18',
            version: 'V2.1.5',
            name: '分页组件的当前分页，每页条目个数设置记忆性参数',
            date: '2024-2-20',
            author: 'chensiwen',
            info: [
                {
                    title: '分页组件的当前分页，每页条目个数设置记忆性参数',
                    value: [
                        {
                            content:
                                '分页组件的当前分页，每页条目个数设置记忆性参数，添加了两个变量分别实现每页条目个数单独具有记忆性和当前分页和每页条目个数具有记忆性。'
                        }
                    ]
                }
            ]
        },
        {
            id: '17',
            version: 'V2.1.3',
            name: '过滤组件、table组件、vxeTable组件的过滤配置',
            date: '2024-1-29',
            author: 'fuyu',
            info: [
                {
                    title: '过滤组件、table组件、vxeTable组件的过滤配置',
                    value: [
                        {
                            content:
                                '过滤组件、table组件、vxeTable组件的过滤配置，添加fangDouTime 配置，可配置过滤的防抖值。配置为0,即可立即返回过滤数据'
                        }
                    ]
                }
            ]
        },
        {
            id: '16',
            version: 'V2.1.2',
            name: '表单组件',
            date: '2024-1-18',
            author: 'fuyu',
            info: [
                {
                    title: '表单组件',
                    value: [
                        {
                            content: '表单组件的date类型添加teleported配置'
                        }
                    ]
                }
            ]
        },
        {
            id: '15',
            version: 'V2.1.1',
            name: '树组件',
            date: '2024-1-17',
            author: 'fuyu',
            info: [
                {
                    title: '树组件',
                    value: [
                        {
                            content: '树组件新增自定义节点样式的配置'
                        }
                    ]
                }
            ]
        },
        {
            id: '14',
            version: 'V2.1.0',
            name: '分页组件',
            date: '2023-12-08',
            author: 'fuyu',
            info: [
                {
                    title: '分页组件',
                    value: [
                        {
                            content: '分页组件每页显示个数选择器的选项调整'
                        }
                    ]
                }
            ]
        },
        {
            id: '13',
            version: 'V2.0.9',
            name: '所有组件',
            date: '2023-12-08',
            author: 'fuyu',
            info: [
                {
                    title: '所有组件',
                    value: [
                        {
                            content: '所有组件中的 el-input 输入框添加了防止自动填充的功能	'
                        }
                    ]
                }
            ]
        },
        {
            id: '12',
            version: 'V2.0.8',
            name: '表格组件修复',
            date: '2023-10-31',
            author: 'fuyu',
            info: [
                {
                    title: '表格组件修复',
                    value: [
                        {
                            content: '修复在框架中修改字体大小时，鼠标经过表格，表格字体大小会恢复默认大小的 bug'
                        }
                    ]
                }
            ]
        },
        {
            id: '11',
            version: 'V2.0.7',
            name: '表格组件优化',
            date: '2023-10-18 16:10',
            author: 'fuyu',
            info: [
                {
                    title: '表格组件优化',
                    value: [
                        {
                            content: '新增属性：openAutoComputedHeight，开启自动计算高度，优先级比height属性高'
                        }
                    ]
                }
            ]
        },
        {
            id: '10',
            version: 'V2.0.6',
            name: '表格组件优化',
            date: '2023-10-17 17:40',
            author: 'fuyu',
            info: [
                {
                    title: '表格组件优化',
                    value: [
                        {
                            content: '表格高度没传入则设置为自动计算好的高度'
                        }
                    ]
                }
            ]
        },
        {
            id: '9',
            version: 'V2.0.5',
            name: '更新最新依赖',
            date: '2023-9-27',
            author: 'fuyu',
            info: [
                {
                    title: '更新最新依赖',
                    value: [
                        {
                            content: '更新最新依赖'
                        }
                    ]
                }
            ]
        },
        {
            id: '8',
            version: 'V2.0.4',
            name: '因国产系统暂时无法使用最新依赖，因此先回退版本，回退依赖',
            date: '2023-9-27',
            author: 'fuyu',
            info: [
                {
                    title: '因国产系统暂时无法使用最新依赖，因此先回退版本，回退依赖',
                    value: [
                        {
                            content: '因国产系统暂时无法使用最新依赖，因此先回退版本，回退依赖'
                        }
                    ]
                }
            ]
        },
        {
            id: '7',
            version: 'V2.0.2',
            name: 'y9Tree组件修复',
            date: '2023-9-21 14:10',
            author: 'fuyu',
            info: [
                {
                    title: 'y9Tree组件修复',
                    value: [
                        {
                            content:
                                '修改y9Tree组件，在增加checkOnClickNode属性后，让check-change也生效，并修复双击事件对单击事件的影响'
                        }
                    ]
                }
            ]
        },
        {
            id: '6',
            version: 'V1.7.7',
            name: 'y9Dialog组件新增margin配置',
            date: '2023-7-26 14:50',
            author: 'fuyu',
            info: [
                {
                    title: 'y9Dialog组件新增margin配置',
                    value: [{ content: '可自主配置弹窗的位置' }]
                }
            ]
        },
        {
            id: '5',
            version: 'V1.7.6',
            name: '解决打包报错isCE',
            date: '2023-7-18 11:00',
            author: 'fuyu',
            info: [
                {
                    title: '解决打包报错isCE',
                    value: [{ content: '更新了插件版本' }]
                }
            ]
        },
        {
            id: '4',
            version: 'V1.7.5',
            name: 'y9Table表格组件',
            date: '2023-7-7 15:10',
            author: 'fuyu',
            info: [
                {
                    title: '更新了 y9Table组件',
                    value: [{ content: 'y9Table组件添加自定义表头配置' }]
                }
            ]
        },
        {
            id: '3',
            version: 'V1.7.4',
            name: '新增全局注册element-plus icon',
            date: '2023-6-29 15:00',
            author: 'fuyu',
            info: [
                {
                    title: '新增全局注册element-plus icon',
                    value: [{ content: '新增全局注册element-plus icon' }]
                }
            ]
        },
        {
            id: '2',
            version: 'V1.6.9',
            name: 'y9Table表格组件和y9VxeTable组件',
            date: '2023-6-20 11:45',
            author: 'fuyu',
            info: [
                {
                    title: '更新了 y9Table组件',
                    value: [{ content: '取消设置默认初始高度' }]
                },
                {
                    title: '更新了 y9VxeTable组件',
                    value: [{ content: '取消设置默认初始高度' }]
                }
            ]
        },
        {
            id: '1',
            version: 'V1.6.8',
            name: 'y9Table表格组件和y9VxeTable组件',
            date: '2023-6-8 18:02',
            author: 'fuyu',
            info: [
                {
                    title: '更新了 y9Table组件',
                    value: [
                        {
                            content:
                                '使用时没配置表格高度，则组件设置默认初始高度，避免火狐浏览器自动计算表格高度为小数点出现滚动条抖动的情况'
                        }
                    ]
                },
                {
                    title: '更新了 y9VxeTable组件',
                    value: [
                        {
                            content:
                                '使用时没配置表格高度，则组件设置默认初始高度，避免火狐浏览器自动计算表格高度为小数点出现滚动条抖动的情况'
                        }
                    ]
                }
            ]
        }
    ];
    return { treeList, description };
};
