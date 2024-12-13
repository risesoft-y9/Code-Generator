import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            orgTreeData: [
                //模拟的组织机构树数据
                {
                    createTime: '2022-09-19 06:27:21',
                    customId: null,
                    deleted: false,
                    description: '',
                    disabled: false,
                    dn: 'o=北京有生深境技术有限公司',
                    enName: '',
                    guidPath: '1440710032629960704',
                    id: '1440710032629960704',
                    name: '北京有生深境技术有限公司',
                    orgType: 'Organization',
                    organizationCode: 'systemManager@有生数字底座',
                    organizationType: '',
                    parentId: null,
                    properties: null,
                    tabIndex: 5,
                    tenantId: '11111111-1111-1111-1111-111111111113',
                    updateTime: '2023-01-13 02:53:08',
                    virtual: false,
                    children: [
                        {
                            avator: null,
                            caid: '',
                            createTime: '2022-09-19 15:36:24',
                            customId: '',
                            deleted: false,
                            description: '',
                            disabled: false,
                            dn: 'cn=张三,o=北京有生深境技术有限公司',
                            email: null,
                            guidPath: '1440710032629960704,1440727408356364288',
                            id: '1440727408356364288',
                            innerRole: null,
                            loginName: 'zhezong',
                            mobile: '13462010008',
                            name: '张三',
                            officeAddress: '',
                            officeFax: '',
                            officePhone: '',
                            official: 1,
                            officialType: '',
                            orderedPath: '00003,00001',
                            orgType: 'Person',
                            original: false,
                            originalId: '1440715581211807744',
                            parentId: '1440710032629960704',
                            password: '$2a$10$mu/xrB7IqfIXbyTMe0IPJegmhH9MDVez3G9OFBIXcNzSQjYOVBszG',
                            personType: 'deptPerson',
                            properties: null,
                            roles: '1440746688091262976',
                            sex: 1,
                            tabIndex: 1,
                            tenantId: '11111111-1111-1111-1111-111111111113',
                            updateTime: '2023-01-09 17:46:59',
                            version: 11,
                            weixinId: null
                        }
                    ]
                },
                {
                    createTime: '2022-09-19 06:11:36',
                    customId: null,
                    deleted: false,
                    description: '',
                    disabled: false,
                    dn: 'o=即时通讯组织',
                    enName: '',
                    guidPath: '1440706069851541504',
                    id: '1440706069851541504',
                    name: '即时通讯组织',
                    orgType: 'Organization',
                    organizationCode: 'systemManager@有生数字底座',
                    organizationType: '',
                    parentId: null,
                    properties: '{"1":"111","2":"2","888":"88888"}',
                    tabIndex: 4,
                    tenantId: '11111111-1111-1111-1111-111111111113',
                    updateTime: '2023-01-13 02:53:08',
                    virtual: false,
                    children: [
                        {
                            avator: '',
                            caid: '',
                            createTime: '2022-11-24 16:57:17',
                            customId: '',
                            deleted: false,
                            description: '',
                            disabled: false,
                            dn: 'cn=小红,o=即时通讯组织',
                            email: null,
                            guidPath: '1440706069851541504,1464665375550476288',
                            id: '1464665375550476288',
                            innerRole: '',
                            loginName: '小红',
                            mobile: '19973888888',
                            name: '小红',
                            officeAddress: '',
                            officeFax: '',
                            officePhone: '',
                            official: 1,
                            officialType: '',
                            orderedPath: '00002,00000',
                            orgType: 'Person',
                            original: true,
                            originalId: '',
                            parentId: '1440706069851541504',
                            password: '$2a$10$G8sm/B6P258PYdFEOwN9G.GBEm34541OMr/zp9HmozFA9R0DEE1c2',
                            personType: 'deptPerson',
                            properties: '',
                            roles: '1464998888455802880',
                            sex: 1,
                            tabIndex: 0,
                            tenantId: '11111111-1111-1111-1111-111111111113',
                            updateTime: '2023-01-09 17:46:52',
                            version: 22,
                            weixinId: ''
                        }
                    ]
                }
            ],
            systemTreeData: [
                //模拟的应用系统树数据
                {
                    autoInit: true,
                    cnName: '开源内核',
                    contextPath: 'platform',
                    createTime: '2022-06-06 16:22:43',
                    description: '',
                    enabled: true,
                    id: '11111111-1111-1111-1111-111111111111',
                    isvGuid: '11111111-1111-1111-1111-111111111120',
                    name: 'riseplatform',
                    singleDatasource: false,
                    tabIndex: 1,
                    updateTime: '2023-01-12 10:08:31',
                    appList: [
                        {
                            aliasName: '方法发',
                            appId: '1481956310734868480',
                            autoInit: false,
                            checked: true,
                            createTime: '2023-01-11 10:05:17',
                            customId: '',
                            description: '',
                            enabled: true,
                            hidden: false,
                            iconData: 'data:images/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIA',
                            iconUrl: '1464950539006513153',
                            id: '1481956310734868480',
                            inherit: false,
                            name: '数字底座',
                            numberUrl: '',
                            opentype: 0,
                            parentId: '',
                            resourceAdminUrl: '',
                            resourceType: 0,
                            roleAdminUrl: '',
                            showNumber: false,
                            systemId: '11111111-1111-1111-1111-111111111111',
                            tabIndex: 0,
                            tenancyStatus: null,
                            type: 1,
                            updateTime: '2023-01-11 11:10:17',
                            url: 'https://vue.youshengyun.com/kernel-standard/',
                            url2: '',
                            verifyUserName: '系统管理员'
                        },
                        {
                            aliasName: '部门管理',
                            appId: '11111111-1111-1111-1111-111111111112',
                            autoInit: false,
                            checked: true,
                            createTime: '2022-11-25 17:18:59',
                            customId: '',
                            description: '',
                            enabled: true,
                            hidden: false,
                            iconData: '',
                            iconUrl: '1464950615749693440',
                            id: '11111111-1111-1111-1111-111111111112',
                            inherit: false,
                            name: '部门管理',
                            numberUrl: '',
                            opentype: 1,
                            parentId: '',
                            resourceAdminUrl: '',
                            resourceType: 0,
                            roleAdminUrl: '',
                            showNumber: false,
                            systemId: '11111111-1111-1111-1111-111111111111',
                            tabIndex: 2,
                            tenancyStatus: null,
                            type: 2,
                            updateTime: '2022-12-06 14:53:27',
                            url: 'https://vue.youshengyun.com/platform',
                            url2: '',
                            verifyUserName: '系统管理员'
                        }
                    ]
                },
                {
                    autoInit: false,
                    cnName: '工作桌面',
                    contextPath: 'y9home',
                    createTime: '2018-06-13 13:42:49',
                    description: '',
                    enabled: true,
                    id: 'bc308576c26a45519624bcf2e02fdf88',
                    isvGuid: '993f08e4a9624c7d82b0bd0766f45f10',
                    name: 'y9home',
                    singleDatasource: false,
                    tabIndex: 2,
                    updateTime: '2023-01-12 10:08:31',
                    appList: [
                        {
                            aliasName: null,
                            appId: '1466098498108657664',
                            autoInit: false,
                            checked: true,
                            createTime: '2022-11-28 15:52:00',
                            customId: null,
                            description: null,
                            enabled: true,
                            hidden: false,
                            iconData: '',
                            iconUrl: '1466093911121334273',
                            id: '1466098498108657664',
                            inherit: false,
                            name: '合同管理',
                            numberUrl: null,
                            opentype: 0,
                            parentId: null,
                            resourceAdminUrl: null,
                            resourceType: 0,
                            roleAdminUrl: null,
                            showNumber: false,
                            systemId: 'bc308576c26a45519624bcf2e02fdf88',
                            tabIndex: 0,
                            tenancyStatus: null,
                            type: 1,
                            updateTime: '2022-11-28 15:52:00',
                            url: '#',
                            url2: null,
                            verifyUserName: '系统管理员'
                        }
                    ]
                },
                {
                    autoInit: false,
                    cnName: '网络硬盘',
                    contextPath: '',
                    createTime: '2022-11-25 14:53:47',
                    description: '',
                    enabled: true,
                    id: '1464996679395577856',
                    isvGuid: '11111111-1111-1111-1111-111111111113',
                    name: 'storage',
                    singleDatasource: false,
                    tabIndex: 13,
                    updateTime: '2023-01-13 10:58:43'
                }
            ],
            jobList: [
                {
                    code: '000',
                    createTime: '2022-10-28 17:08:49',
                    id: '11f2a143-c634-40f5-93dc-1ef390c2e585',
                    name: '董事长',
                    tabIndex: 1,
                    updateTime: '2023-01-12 16:24:14'
                },
                {
                    code: '002',
                    createTime: '2022-10-17 17:34:59',
                    id: '9c4aa886-5dac-4939-8ca1-75931d42f991',
                    name: '技术副总经理',
                    tabIndex: 2,
                    updateTime: '2023-01-12 16:24:14'
                },
                {
                    code: '003',
                    createTime: '2022-10-17 17:41:46',
                    id: '12e97c88-9cfc-41c6-832e-46862d668d77',
                    name: '销售副总经理',
                    tabIndex: 3,
                    updateTime: '2023-01-12 16:24:14'
                },
                {
                    code: '004',
                    createTime: '2022-10-17 17:51:49',
                    id: '9d7b8ffd-24e2-4da9-8462-00e5dbec7d14',
                    name: '财务副总经理',
                    tabIndex: 4,
                    updateTime: '2023-01-12 16:24:14'
                },
                {
                    code: '001',
                    createTime: '2022-10-19 17:46:12',
                    id: '5f6885d7-1308-4359-a723-fa3c9422d680',
                    name: '总经理',
                    tabIndex: 5,
                    updateTime: '2023-01-12 16:24:14'
                }
            ],
            loginLogList: [
                {
                    browserName: 'Chrome',
                    browserVersion: '107.0.0.0',
                    clientIpSection: '113.87.81',
                    id: '5f49fb7f139b4a259aec32023fd2038c',
                    logMessage: '登录成功',
                    loginTime: '2023-01-17T06:34:57.769+00:00',
                    loginType: 'loginName',
                    managerLevel: '0',
                    osName: 'OS X',
                    screenResolution: '',
                    serverIp: '192.168.0.151',
                    success: 'true',
                    tenantId: '11111111-1111-1111-1111-111111111113',
                    tenantName: '有生数字底座',
                    userHostDiskId: 'null',
                    userHostIp: '113.87.81.136',
                    userHostMac: 'null',
                    userHostName: 'null',
                    userId: '1449714230923104256',
                    userLoginName: 'imUser3',
                    userName: 'imUser3'
                },
                {
                    browserName: 'Firefox',
                    browserVersion: '108.0',
                    clientIpSection: '119.136.207',
                    id: '63305397f0f34494b5c05abd379ef769',
                    logMessage: '登录成功',
                    loginTime: '2023-01-10T08:51:05.827+00:00',
                    loginType: 'loginName',
                    managerLevel: '0',
                    osName: 'OS X',
                    screenResolution: '',
                    serverIp: '192.168.0.151',
                    success: 'true',
                    tenantId: '11111111-1111-1111-1111-111111111113',
                    tenantName: '有生数字底座',
                    userHostDiskId: 'null',
                    userHostIp: '119.136.207.168',
                    userHostMac: 'null',
                    userHostName: 'null',
                    userId: '1449714230923104256',
                    userLoginName: 'imUser3',
                    userName: 'imUser3'
                },
                {
                    browserName: 'Chrome',
                    browserVersion: '107.0.0.0',
                    clientIpSection: '119.136.207',
                    id: 'e5af972648824237b1c166e9e45b58cb',
                    logMessage: '登录成功',
                    loginTime: '2023-01-09T10:01:33.673+00:00',
                    loginType: 'loginName',
                    managerLevel: '0',
                    osName: 'OS X',
                    screenResolution: '',
                    serverIp: '192.168.0.151',
                    success: 'true',
                    tenantId: '11111111-1111-1111-1111-111111111113',
                    tenantName: '有生数字底座',
                    userHostDiskId: 'null',
                    userHostIp: '119.136.207.168',
                    userHostMac: 'null',
                    userHostName: 'null',
                    userId: '1449714230923104256',
                    userLoginName: 'imUser3',
                    userName: 'imUser3'
                }
            ]
        };
    },

    getters: {
        getOrgTreeData: (state) => {
            return state.orgTreeData;
        },
        getSystemTreeData: (state) => {
            return state.systemTreeData;
        },
        getJobList: (state) => {
            return state.jobList;
        },
        getLoginLogList: (state) => {
            return state.loginLogList;
        }
    }
});