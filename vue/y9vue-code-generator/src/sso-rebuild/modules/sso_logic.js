'use strict';

/**
 * sso插件
 *
 * 面向对象的实现方式
 * 规范代码
 *
 */
import ssoRequest from './sso_lib';
import Y9Utils from './sso_helper';
import { encode64 } from './utils/base64';
import y9_storage from './utils/storage';

export default (function () {
    const { log, error, warn } = console;
    /**
     * 定义插件类
     */
    var Y9SSO = function () {};
    /**
     * 单例模式
     */
    Y9SSO.instant = null;

    /**
     * 初始化类的参数
     */
    Y9SSO.prototype.initParams = function (Vue, options) {
        if (!options || !options.env || !options.env.sso) {
            error('没有传入sso配置信息');
            return false;
        }
        this.ssoInfo = options.env.sso;
        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_DOMAINURL')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_DOMAINURL']参数");
            window.alert('重构后，原传入参数【VUE_APP_SSO】更名为【VUE_APP_SSO_DOMAINURL】,请检查！');
            return false;
        }
        this.vue_app_sso_domainUrl = this.ssoInfo.VUE_APP_SSO_DOMAINURL;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_CONTEXT')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_CONTEXT']参数");
            return false;
        }
        this.vue_app_sso_context = this.ssoInfo.VUE_APP_SSO_CONTEXT;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_AUTHORIZE_URL')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_AUTHORIZE_URL']参数");
            return false;
        }
        this.vue_app_sso_authorize_url = this.ssoInfo.VUE_APP_SSO_AUTHORIZE_URL;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_LOGOUT_URL')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_LOGOUT_URL']参数");
            window.alert('重构后，原传入参数【VUE_APP_Y9_LOGOUT_URL】更名为【VUE_APP_SSO_LOGOUT_URL】,请检查！');
            return false;
        }
        this.vue_app_sso_logout_url = this.ssoInfo.VUE_APP_SSO_LOGOUT_URL;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_CLIENT_ID')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_CLIENT_ID']参数");
            return false;
        }
        this.vue_app_sso_client_id = this.ssoInfo.VUE_APP_SSO_CLIENT_ID;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_SECRET')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_SECRET']参数");
            return false;
        }
        this.vue_app_sso_secret = this.ssoInfo.VUE_APP_SSO_SECRET;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_GRANT_TYPE')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_GRANT_TYPE']参数");
            window.alert('重构后，原传入参数【VUE_APP_GRANT_TYPE】更名为【VUE_APP_SSO_GRANT_TYPE】,请检查！');
            return false;
        }
        this.vue_app_sso_grant_type = this.ssoInfo.VUE_APP_SSO_GRANT_TYPE;

        // 插件必要的参数
        if (!this.ssoInfo.hasOwnProperty('VUE_APP_SSO_SITETOKEN_KEY')) {
            error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SSO_SITETOKEN_KEY']参数");
            window.alert(
                '重构后，原传入参数【 VUE_APP_SSO_SITETOKEN_KEY】更名为【VUE_APP_SSO_SITETOKEN_KEY】,请检查！'
            );
            return false;
        }
        this.vue_app_sso_siteTokenKey = this.ssoInfo.VUE_APP_SSO_SITETOKEN_KEY;

        // // 插件必要的参数
        // if (!this.ssoInfo.hasOwnProperty("VUE_APP_REDISKEY")) {
        //     error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_REDISKEY']参数");
        //     return false;
        // }
        // this.vue_app_sso_redisKey = this.ssoInfo.VUE_APP_REDISKEY;

        // // 插件必要的参数
        // if (!this.ssoInfo.hasOwnProperty("VUE_APP_SESSIONSTORAGE_GUID")) {
        //     error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SESSIONSTORAGE_GUID']参数");
        //     return false;
        // }
        // this.vue_app_sso_sessionStorage_guid = this.ssoInfo.VUE_APP_SESSIONSTORAGE_GUID;
        // // 插件必要的参数
        // if (!this.ssoInfo.hasOwnProperty("VUE_APP_SERVER_REDIS")) {
        //     error("入口函数（比如main.js）没有获取到env.sso['VUE_APP_SERVER_REDIS']参数");
        //     return false;
        // }
        // this.vue_app_sso_server_redis_url = this.ssoInfo.VUE_APP_SERVER_REDIS;

        // 插件可选参数
        if (this.ssoInfo.hasOwnProperty('appFeatures')) {
            this.appFeatures = options.env.appFeatures;
            this.appLoginPageUrl = options.env.appLoginPageUrl;
        } else {
            this.appFeatures = false;
            this.appLoginPageUrl = null;
        }

        // 插件可选参数 - 打印log
        if (options.env.hasOwnProperty('logInfo')) {
            if (options.env.logInfo.hasOwnProperty('showLog')) {
                this.showLog = true;
            } else {
                this.showLog = false;
            }

            // 定时器间隔执行时间，有传入值则使用它，无则默认
            if (options.env.logInfo.hasOwnProperty('sso_refresh_Timer_t')) {
                this.sso_refresh_Timer_t = options.env.logInfo.sso_refresh_Timer_t;
            } else {
                this.sso_refresh_Timer_t = 1800000;
            }
        } else {
            this.showLog = false;
            this.sso_refresh_Timer_t = 1800000;
        }

        // 定时器
        this.sso_Timer = null;

        if (this.showLog) {
            log(`Y9SSO对象：` + this);
            log(`VUE_APP_SSO_DOMAINURL=${this.vue_app_sso_domainUrl}`);
            log(`VUE_APP_SSO_CONTEXT=${this.vue_app_sso_context}`);
            log(`VUE_APP_SSO_AUTHORIZE_URL=${this.vue_app_sso_authorize_url}`);
            log(`VUE_APP_SSO_LOGOUT_URL=${this.vue_app_sso_logout_url}`);
            log(`VUE_APP_SSO_CLIENT_ID=${this.vue_app_sso_client_id}`);
            log(`VUE_APP_SSO_SECRET=${this.vue_app_sso_secret}`);
            log(`VUE_APP_SSO_GRANT_TYPE=${this.vue_app_sso_grant_type}`);
            log(`VUE_APP_SSO_SITETOKEN_KEY=${this.vue_app_sso_siteTokenKey}`);
        }
    };

    /**
     * 定时器
     */
    Y9SSO.prototype.ssoTimerRun = async function () {
        if (Y9SSO.instant.sso_Timer) {
            clearInterval(Y9SSO.instant.sso_Timer);
        } else {
            Y9SSO.instant.sso_Timer = setInterval(async () => {
                await ssoTimer_refreshToken();
            }, Y9SSO.instant.sso_refresh_Timer_t);
        }
    };

    /**
     * 登录跳转逻辑【重要】
     */
    Y9SSO.prototype.checkLogin = async function (callbackPageUrl = '') {
        let q = Y9Utils.parseQueryString(window.location.search.substring(1));
        // 先存储所有参数，也许有带其它参数可供项目使用到【从安全角度看，可能需要删除和单点登录相关的code和serviceTicketId和state】
        y9_storage.setObjectItem('query', q);
        // 获取应用的首页URL
        let sso_callback_url;
        callbackPageUrl
            ? (sso_callback_url = callbackPageUrl)
            : (sso_callback_url = window.location.origin + window.location.pathname);
        // 客户自己的单点登陆页面【项目最好别走这个if，多项目集成时可能会有大问题】
        if (!q && Y9SSO.instant.appLoginPageUrl) {
            if (callbackPageUrl) {
                Y9SSO.instant.showLog
                    ? log(`客户自己的单点登陆页面【项目最好别走这个if，多项目集成时可能会有大问题】`)
                    : '';
                Y9SSO.instant.navToLogin(callbackPageUrl);
            } else {
                window.location = Y9SSO.instant.appLoginPageUrl;
            }
        }
        // 单点登录服务器上的登陆页面
        if (!q && !Y9SSO.instant.appLoginPageUrl) {
            Y9SSO.instant.showLog ? log(`单点登录服务器上的登陆页面`) : '';
            Y9SSO.instant.navToLogin(sso_callback_url);
        }

        // sso的uri回调中包含code
        if (q && q.code) {
            const config_token = {
                grant_type: Y9SSO.instant.vue_app_sso_grant_type, // 固定
                client_id: Y9SSO.instant.vue_app_sso_client_id, // 固定
                client_secret: Y9SSO.instant.vue_app_sso_secret, // 固定
                code: q.code,
                redirect_uri: sso_callback_url
            };
            Y9SSO.instant.showLog ? log(`登录跳转链接中包含code时获取access_token`) : '';
            const getAccessToken = await Y9SSO.instant
                .ssoGetAccessTokenApi({ params: config_token })
                .then((res) => {
                    return res;
                })
                .catch((e) => {
                    error(`登录跳转链接中包含code时，获取access_token的过程中catch到错误:` + e);
                });
            Y9SSO.instant.showLog
                ? log(`获取access_token成功，在sessionStorage中查看${Y9SSO.instant.vue_app_sso_siteTokenKey}`)
                : '';
            let currentTimestamp = Date.parse(new Date()).toString().slice(0, 10);
            // expire_in是秒数，API显示的数据是 28800秒 = 8小时
            getAccessToken.expires_in = getAccessToken.expires_in - 1800; // 有效期时间，客户端比服务器少300秒
            getAccessToken.count_expires_in = parseInt(currentTimestamp) + parseInt(getAccessToken.expires_in);
            // session存储登陆信息
            let isCashe = y9_storage.setObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, getAccessToken);
            if (isCashe) {
                await Y9SSO.instant.ssoGetUserInfoApi();
            }
            // 删除回调url中的code
            Y9SSO.instant.showLog ? log(`删除回调url中的code`) : '';
            window.location = window.location.origin + window.location.pathname;
        }

        // 切换账号
        if (q && q.ticket) {
            // 获取当前url
            sso_callback_url = window.location.href;
            Y9SSO.instant.showLog ? log(`切换账号`) : '';
            Y9SSO.instant.navToLogin(sso_callback_url);
        }

        // 工作流 新开页签会因为没有缓存而无法进入这个函数里的条件，导致单点登录失败
        if (q && q.itemId) {
            // 获取当前url
            sso_callback_url = window.location.href;
            Y9SSO.instant.showLog ? log(`q.itemId`) : '';
            Y9SSO.instant.navToLogin(sso_callback_url);
        }

        // 处理任意其它未知参数的情况
        if (q) {
            Y9SSO.instant.showLog ? log(`处理任意其它未知参数的情况，q=${JSON.stringify(q)}`) : '';
            window.location = window.location.origin + window.location.pathname; // 即当前url地址，包括带参数的情况
            // Y9SSO.instant.navToLogin(sso_callback_url);
        }
    };

    /**
     * 单点登录 - 授权成功后，将要跳转的url
     */
    Y9SSO.prototype.navToLogin = function (sso_callback_url) {
        const url = `${Y9SSO.instant.vue_app_sso_authorize_url}?response_type=code&client_id=${
            Y9SSO.instant.vue_app_sso_client_id
        }&client_secret=${
            Y9SSO.instant.vue_app_sso_secret
        }&state=${Y9Utils.generateRandomString()}&scope=all&redirect_uri=${sso_callback_url}`;

        Y9SSO.instant.showLog
            ? log(`单点登录 - 传入插件的授权码url=【${Y9SSO.instant.vue_app_sso_authorize_url}】`)
            : '';
        Y9SSO.instant.showLog ? log(`单点登录 - 拼接授权码的完整url=【${url}】`) : '';
        Y9SSO.instant.showLog ? log(`单点登录 - 授权成功后，将要跳转的url=【${sso_callback_url}】`) : '';
        // 多标签场景下，其中一个标签退出，另一个标签刷新y9_storage.getObjectItem()返回false，获取不到数据
        if (!Y9SSO.instant.vue_app_sso_authorize_url) {
            Y9SSO.instant.showLog ? log(`【重构后测试此if问题是否还存在】`) : '';
            let arr = url.split('=');
            window.location = arr[arr.length - 1];
        } else {
            window.location = url;
        }
    };

    /**
     * 获取用户输入的用户名和密码开始单点登录
     */
    Y9SSO.prototype.ssoLogin = async function (username, password, tenantName, sso_callback_url) {
        const config_logon = {
            loginType: 'loginName', // 固定
            noLoginScreen: true,
            tenantLoginName: tenantName ? tenantName : 'risesoft',
            username: encode64(username),
            password: encode64(password),
            service: sso_callback_url
        };
        // checkSsoLoginInfo - API
        const check = await Y9SSO.instant.checkSsoLoginInfoApi({ params: config_logon }).catch((e) => {
            error('获取用户输入的用户名和密码开始单点登录的过程中，【checkSsoLoginInfoApi执行catch到错误】 e=' + e);
        });
        if (check.success) {
            // sso登陆
            return await ssoLoginApi({ params: config_logon })
                .then((res) => {
                    if (res.success) {
                        // 登陆成功 获取授权码
                        const url = `${Y9SSO.instant.vue_app_sso_authorize_url}?response_type=code&client_id=${Y9SSO.instant.vue_app_sso_client_id}&client_secret=${Y9SSO.instant.vue_app_sso_secret}&redirect_uri=${sso_callback_url}`;
                        Y9SSO.instant.showLog ? log(`登陆成功 拼接获取授权码的完整URL=${url}`) : '';
                        window.location = url;
                    } else {
                        Y9SSO.instant.showLog ? error(`登陆失败，请检查用户名和密码，resultInfo=` + check) : '';
                        return false;
                    }
                })
                .catch((e) => {
                    error('获取用户输入的用户名和密码开始单点登录的过程中，【ssoLoginApi执行catch到错误】 e=' + e);
                });
        } else {
            window.alert(check.msg);
            return false;
        }
    };

    /**
     * 获取当前会话登陆信息
     */
    Y9SSO.prototype.getSessionCache = async function () {
        // 当前时间戳
        let currentTimestamp = Date.parse(new Date()).toString().slice(0, 10),
            localCache = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey),
            count_expires_in;
        // 查询会话页面是否有session缓存
        if (localCache && localCache.refresh_token) {
            count_expires_in = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, 'count_expires_in');
            let isValidTime = currentTimestamp - count_expires_in;
            // 是否需要更新token
            if (isValidTime > 0 && isValidTime < 1800) {
                await Y9SSO.instant.refreshToken().catch((e) => {
                    error(`获取当前会话登陆信息 - 执行refreshToken函数catch错误：` + e);
                });
                return true;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    /**
     * 检查token
     */
    Y9SSO.prototype.checkToken = async function () {
        let isValid = await Y9SSO.instant.getSessionCache();
        if (isValid) {
            let userName = y9_storage.getStringItem('userName');
            if (!userName) {
                await Y9SSO.instant.ssoGetUserInfoApi();
            }
            return true;
        } else {
            // 无效
            return false;
        }
    };

    /**
     * 强制更新token、redis缓存时间
     * 每30分钟定时器更新一次
     * */
    Y9SSO.prototype.ssoTimer_refreshToken = async function () {
        Y9SSO.instant.showLog ? log(`========================================================`) : '';
        Y9SSO.instant.showLog ? log(`【${new Date()}】sso - 自动执行了定时器`) : '';
        Y9SSO.instant.showLog ? log(`更新前`) : '';
        // Y9SSO.instant.showLog?log(`guid = `, sessionStorage.getItem("guid")):'';
        Y9SSO.instant.showLog
            ? log(
                  `${Y9SSO.instant.vue_app_sso_siteTokenKey} = `,
                  y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey)
              )
            : '';
        Y9SSO.instant.showLog ? log(`--------------------------------------------------------`) : '';

        // 当前时间戳
        let currentTimestamp = Date.parse(new Date()).toString().slice(0, 10),
            localCache = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey),
            count_expires_in;

        // 查询会话页面是否有session缓存
        if (localCache && localCache.refresh_token) {
            count_expires_in = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, 'count_expires_in');

            let refresh_token = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, 'refresh_token');
            // 更新token
            await Y9SSO.instant.refreshToken().catch((e) => log(e.message));
            // 重新获取用户信息
            // await Y9SSO.instant.initUserData();
        }
        showLog ? log(`更新后`) : '';
        // showLog?log(`guid = `, sessionStorage.getItem("guid")):'';
        Y9SSO.instant.showLog
            ? log(
                  `${Y9SSO.instant.vue_app_sso_siteTokenKey} = `,
                  y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey)
              )
            : '';
        showLog ? log(`========================================================`) : '';
    };

    /**
     * 更新token
     */
    Y9SSO.prototype.refreshToken = async function () {
        const currentTimestamp = Date.parse(new Date()).toString().slice(0, 10);
        const config_token = {
            grant_type: 'refresh_token', // 固定
            client_id: Y9SSO.instant.vue_app_sso_client_id, // 固定
            client_secret: Y9SSO.instant.vue_app_sso_secret, // 固定
            refresh_token: value
        };

        const getNewToken = await ssoGetAccessTokenApi({ params: config_token })
            .then((res) => {
                return res;
            })
            .catch((e) => {
                error(`更新token的过程中catch到错误:` + e);
            });
        if (getNewToken && getNewToken.expires_in) {
            // expire_in是秒数，API显示的数据是 28800秒 = 8小时
            getNewToken.expires_in = getNewToken.expires_in - 1800; // 有效期时间，客户端比服务器少300秒
            getNewToken.count_expires_in = parseInt(currentTimestamp) + parseInt(getNewToken.expires_in);
        }

        // session存储登陆信息
        const isCashe = y9_storage.setObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, getNewToken);
        if (!isCashe) {
            Y9SSO.instant.showLog ? log('没有成功缓存') : '';
            return false;
        } else {
            return true;
        }
    };

    /**
     * 单点登录 - 检查API
     */
    Y9SSO.prototype.checkSsoLoginInfoApi = async function (data) {
        Y9SSO.instant.showLog ? log(`单点登录 - 【sso-2-检查API】得到的参数：`, data.params) : '';
        return await ssoRequest({
            url: `${Y9SSO.instant.vue_app_sso_context}/api/checkSsoLoginInfo`,
            method: 'post',
            cType: false,
            test: true,
            params: data.params
        });
    };

    /**
     * 单点登录 - 登录API
     */
    Y9SSO.prototype.ssoLoginApi = async function (data) {
        Y9SSO.instant.showLog ? log(`单点登录 - 【sso-1-登录API】得到的参数：`, data.params) : '';
        return await ssoRequest({
            url: `${Y9SSO.instant.vue_app_sso_context}/api/logon`,
            method: 'post',
            cType: false,
            test: true,
            params: data.params
        });
    };

    /**
     * 单点登录 - 获取和更新token API
     */
    Y9SSO.prototype.ssoGetAccessTokenApi = async function (data) {
        Y9SSO.instant.showLog ? log(`单点登录 - 【sso-3-获取和更新token API】得到的参数：`, data.params) : '';
        return await ssoRequest({
            url: `${Y9SSO.instant.vue_app_sso_context}/oauth2.0/accessToken`,
            method: 'get',
            cType: false,
            params: data.params
        });
    };

    /**
     * 单点登录 - 获取用户的信息 API
     */
    Y9SSO.prototype.ssoGetUserInfoApi = async function () {
        let access_token = y9_storage.getObjectItem(Y9SSO.instant.vue_app_sso_siteTokenKey, 'access_token');
        if (!access_token) {
            error(`单点登录 - 【sso-4-获取用户的信息 API】没有获取到access_token参数`);
            return false;
        }
        Y9SSO.instant.showLog ? log(`单点登录 - 【sso-4-获取用户的信息 API】access_token = `, access_token) : '';
        let get_user_info = await ssoRequest({
            url: `${Y9SSO.instant.vue_app_sso_context}/oauth2.0/profile`,
            method: 'get',
            cType: false,
            params: { access_token: access_token }
        });
        y9_storage.setObjectItem('ssoUserInfo', get_user_info);
        y9_storage.setStringItem('userName', get_user_info.name);
        return get_user_info;
    };

    /**
     * 单点登录 - 登出 API
     */
    // 传参的obj应该定义一个默认值，否则会打印一个不影响程序运行的错误，
    // 但是如果修复的话，发现单点登录无法登陆进去，因为cookie中的TGC设置了sameSite = none（不携带cookie），TGC立马就过期了，被拒绝了
    Y9SSO.prototype.ssoLogout = async function (obj) {
        Y9SSO.instant.showLog ? log(`登出，传入的obj = ${JSON.stringify(obj)}`) : '';
        let logoutUrl = `${Y9SSO.instant.vue_app_sso_domainUrl}/sso/logout?service=${window.location.origin}/`;
        if (obj.logoutUrl) {
            logoutUrl = obj.logoutUrl;
            Y9SSO.instant.showLog ? log(`执行了【传入的】登出URL=${obj.logoutUrl}`) : '';
        } else {
            Y9SSO.instant.showLog ? log(`执行了【默认的】登出URL=${obj.logoutUrl}`) : '';
        }
        // 执行删除前操作-自定义的
        if (obj.__y9delete__) {
            await obj.__y9delete__();
            Y9SSO.instant.showLog ? log(`执行了自定义的删除函数（事件）obj.__y9delete__`) : '';
        }

        let temp = sessionStorage.getItem('sso');
        sessionStorage.clear();
        Y9SSO.instant.showLog ? log(`登出时执行了【缓存清除语句】==> sessionStorage.clear()`) : '';
        sessionStorage.setItem('sso', temp);
        Y9SSO.instant.showLog ? log(`如果没有关闭会话页面，这里恢复了要传入sso插件的参数`) : '';
        // 执行sso的退出
        const vIE = Y9Utils.IEVersion();
        if (vIE !== 'edge' && vIE >= 9) {
            window.location = logoutUrl;
        } else {
            fetch(logoutUrl, {
                credentials: 'omit'
            })
                .then(() => {
                    // y9_storage.type().clear();
                    window.location.href = logoutUrl;
                })
                .catch((e) => {
                    error('传入参数【VUE_APP_Y9_LOGOUT_URL】更名为【VUE_APP_SSO_LOGOUT_URL】,请检查传入的值！');
                });
        }
    };

    if (Y9SSO.instant) {
        return Y9SSO.instant;
    } else {
        Y9SSO.instant = new Y9SSO();
        return Y9SSO.instant;
    }
})();
