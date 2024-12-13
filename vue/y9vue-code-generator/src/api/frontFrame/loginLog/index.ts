import Request from '@/api/lib/request';
//获取模拟的树数据
import { useGlobalStore } from '@/store/modules/globalStore';

const platformRequest = Request();

const globalStore = useGlobalStore();
const loginLogListData = globalStore.getLoginLogList; //获取数据列表

//获取列表
export const loginLogList = async (params) => {
    //模拟返回假数据
    return new Promise((resolve) => {
        const res = {
            code: 0,
            currPage: 1,
            msg: '获取日志分页列表成功',
            rows: loginLogListData,
            success: true,
            total: 3,
            totalPages: 1
        };

        setTimeout(() => {
            resolve(res);
        }, 500);
    });
};
