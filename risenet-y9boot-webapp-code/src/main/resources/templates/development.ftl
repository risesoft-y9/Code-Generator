<#if codeSystem.environment == 0>
#运行环境
NODE_ENV = 'development'

# 工程名
VUE_APP_NAME = 'y9vue-${codeSystem.name?uncap_first}'
# 公共资源路径
VUE_APP_PUBLIC_PATH = '/y9vue-${codeSystem.name?uncap_first}/'
#后端api接口域名
VUE_APP_HOST = 'http://localhost:8080/${codeSystem.name?uncap_first}/'
# 前端index页面
VUE_APP_HOST_INDEX = 'http://localhost:8081/y9vue-${codeSystem.name?uncap_first}/'
# sso接口
VUE_APP_SSO_DOMAINURL = 'https://dev.youshengyun.com/'
# sso接口上下文
VUE_APP_SSO_CONTEXT = 'sso'
# sso授权码接口
VUE_APP_SSO_AUTHORIZE_URL = 'https://dev.youshengyun.com/sso/oauth2.0/authorize'
# 退出URL
VUE_APP_SSO_LOGOUT_URL = 'https://dev.youshengyun.com/sso/logout?service=http://localhost:8081/'
# sso接口的固定字段
VUE_APP_SSO_CLIENT_ID = 'clientid'
# sso接口的固定字段
VUE_APP_SSO_SECRET = 'secret'
# sso接口的固定字段
VUE_APP_SSO_GRANT_TYPE = 'authorization_code'
# sso-redisKey
# VUE_APP_REDISKEY = 'userKey'
# sso-sessionStorage_guid
# VUE_APP_SESSIONSTORAGE_GUID = 'guid'
# sso-token_key
VUE_APP_SSO_SITETOKEN_KEY = 'y9AT'
# sso-redisServerUrl
# VUE_APP_SERVER_REDIS = 'https://dev.youshengyun.com/'

# 跨域携带cookie
# VUE_APP_CREDENTIALS = true
# 记住我时间 单位：天
# VUE_APP_REMEMBER_TIME = 30
# appFeatures
# VUE_APP_APPFEATURES = '1'
<#else>
#运行环境
NODE_ENV = 'development'

# 工程名
VUE_APP_NAME = 'y9vue-${codeSystem.name?uncap_first}'
# 公共资源路径
VUE_APP_PUBLIC_PATH = '/y9vue-${codeSystem.name?uncap_first}/'
#后端api接口域名
VUE_APP_HOST = 'http://localhost:8080/${codeSystem.name?uncap_first}/'
# 前端index页面
VUE_APP_HOST_INDEX = 'http://localhost:8081/y9vue-${codeSystem.name?uncap_first}/'
# sso接口
VUE_APP_SSO_DOMAINURL = 'http://localhost:7055/'
# sso接口上下文
VUE_APP_SSO_CONTEXT = 'sso'
# sso授权码接口
VUE_APP_SSO_AUTHORIZE_URL = 'http://localhost:7055/sso/oauth2.0/authorize'
# 退出URL
VUE_APP_SSO_LOGOUT_URL = 'http://localhost:7055/sso/logout?service=http://localhost:8081/'
# sso接口的固定字段
VUE_APP_SSO_CLIENT_ID = 'clientid'
# sso接口的固定字段
VUE_APP_SSO_SECRET = 'secret'
# sso接口的固定字段
VUE_APP_SSO_GRANT_TYPE = 'authorization_code'
# sso-redisKey
# VUE_APP_REDISKEY = 'userKey'
# sso-sessionStorage_guid
# VUE_APP_SESSIONSTORAGE_GUID = 'guid'
# sso-token_key
VUE_APP_SSO_SITETOKEN_KEY = 'y9AT'
# sso-redisServerUrl
# VUE_APP_SERVER_REDIS = 'http://localhost:7055/'

# 跨域携带cookie
# VUE_APP_CREDENTIALS = true
# 记住我时间 单位：天
# VUE_APP_REMEMBER_TIME = 30
# appFeatures
# VUE_APP_APPFEATURES = '1'
</#if>
