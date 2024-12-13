<template>
    <div class="y9-title">
        基础用法
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('base')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData1"></y9Tree>
    </div>

    <div class="y9-title">
        无边框的树
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('noBorder')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData2" :haveBorder="false"></y9Tree>
    </div>

    <div class="y9-title">
        可选择的树
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('checkbox')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData3" showCheckbox></y9Tree>
    </div>

    <div class="y9-title">
        设置默认展开和默认勾选
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('defaultExpanAndChecked')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree
            :data="treeData4"
            :defaultCheckedKeys="['1-2', '2-1']"
            :defaultExpandedKeys="['1', '1-1', '2']"
            showCheckbox
        ></y9Tree>
    </div>

    <div class="y9-title">
        禁用复选框
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('disabled')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="disabledTreeData" showCheckbox></y9Tree>
    </div>

    <div class="y9-title">
        使用默认的操作节点的按钮
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('defaultActive')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree
            ref="y9TreeDefaultActiveRef"
            :data="treeData5"
            defaultAcitonIcons
            showCheckbox
            @add-icon="onAddIcon"
            @remove-icon="onRemoveIcon"
            @preview-icon="onPreviewIcon"
        >
        </y9Tree>
    </div>

    <div class="y9-title">
        自定义操作节点按钮
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('customActive')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree ref="y9TreeCustomActiveRef" :data="treeData5" showCheckbox>
            <template #actions="{ item }">
                <span style="color: var(--el-color-primary)" @click="onDelete(item)">删除</span>
                <span style="color: var(--el-color-primary); margin-left: 5px" @click="onInsertAfter(item)"
                    >向下插入兄弟节点</span
                >
                <span style="color: var(--el-color-primary); margin-left: 5px" @click="onInsertBefore(item)"
                    >向上插入兄弟节点</span
                >
            </template>
        </y9Tree>
    </div>

    <div class="y9-title">
        自定义节点标题
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('customTitle')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData6" showCheckbox>
            <template #title="{ item }"> {{ item.id }}--{{ item.name }}</template>
        </y9Tree>
    </div>

    <div class="y9-title">
        自定义节点内容
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('customNode')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData7" showCheckbox>
            <template #content="{ item }">
                <div style="display: flex; align-items: center">
                    <i class="ri-organization-chart" style="margin-right: 5px"></i>
                    <span>{{ item.name }}</span>
                </div>
            </template>
        </y9Tree>
    </div>

    <div class="y9-title">
        树节点过滤
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('filterNode')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <el-input v-model="search" :size="fontSizeObj.buttonSize" style="margin-bottom: 20px"></el-input>
        <y9Tree
            ref="y9TreeSearchRef"
            :data="treeData8"
            :filterNodeMethod="filterNodeMethod"
            defaultExpandAll
            showCheckbox
        >
        </y9Tree>
    </div>

    <div class="y9-title">
        懒加载
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('lazyNode')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :load="onTreeLazyLoad" lazy showCheckbox></y9Tree>
    </div>

    <div class="y9-title">
        懒加载+api搜索示例
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('lazyNode+apiSearch')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <el-input
            v-model="apiSearchKey"
            :size="fontSizeObj.buttonSize"
            placeholder="请搜索用户名称"
            style="margin-bottom: 20px"
            @input="onSearchChange"
        ></el-input>
        <y9Tree ref="y9LazyTreeRef" :data="alreadyLoadTreeData" :load="onTreeLazyLoadFn" lazy></y9Tree>
    </div>

    <!-- 	<div class="y9-title">
        懒加载 子节点为person时可选，父节点禁止选择，待子节点加载完毕设置父节点可选 示例
        <el-button style="margin-left: 10px;" type="primary" :size="fontSizeObj.buttonSize" :style="{ fontSize: fontSizeObj.baseFontSize }"
         class="global-btn-main"  @click="onShowCode('lazyNodeChangeChecked')">查看代码</el-button>
    </div>
    <div style="background-color: #fff; padding:20px;">
        <y9Tree
        ref="y9TreeChangeCheckedRef"
        lazy
        showCheckbox
        :load="onTreeLazyLoadChangeChecked">
        </y9Tree>		
    </div> -->

    <div class="y9-title">
        在双击事件中屏蔽单击事件的示例
        <el-button
            :size="fontSizeObj.buttonSize"
            :style="{ fontSize: fontSizeObj.baseFontSize }"
            class="global-btn-main"
            style="margin-left: 10px"
            type="primary"
            @click="onShowCode('dblclickAndclick')"
            >查看代码
        </el-button>
    </div>
    <div style="background-color: #fff; padding: 20px">
        <y9Tree :data="treeData9" :nodeDblclick="true" @node-dblclick="nodeDblclick" @node-click="nodeClick"></y9Tree>
    </div>

    <div class="y9-title">y9Tree属性说明表</div>
    <y9Table :config="attrTableConfig"></y9Table>

    <div class="y9-title">y9Tree事件说明表</div>
    <y9Table :config="eventTableConfig"></y9Table>

    <div class="y9-title">y9Tree实例说明表</div>
    <y9Table :config="instanceTableConfig"></y9Table>

    <div class="y9-title">y9Tree插槽说明表</div>
    <y9Table :config="slotConfig"></y9Table>

    <y9Dialog v-model:config="codeDialogConfig">
        <pre class="y9-code">
			<code id="code">
				{{ codeDialogConfig.codeText }}
			</code>
		</pre>
    </y9Dialog>
</template>

<script lang="ts" setup>
    import { getTreeItemById, searchByName, treeInterface } from '@/api/frontFrame/org/index';
    import { inject } from 'vue';
    // 注入 字体对象
    const fontSizeObj: any = inject('sizeObjInfo');
    let treeData1, treeData2, treeData3, treeData4, treeData5, treeData6, treeData7, treeData8, treeData9;
    treeData1 =
        treeData2 =
        treeData3 =
        treeData4 =
        treeData5 =
        treeData6 =
        treeData7 =
        treeData8 =
        treeData9 =
            reactive([
                {
                    name: '北京有生博大有限公司',
                    id: '1',
                    children: [
                        {
                            name: '深圳分公司',
                            id: '1-1',
                            children: [
                                {
                                    name: '研发部',
                                    id: '1-1-1'
                                },
                                {
                                    name: '销售部',
                                    id: '1-1-2'
                                }
                            ]
                        },
                        {
                            name: '山东分公司',
                            id: '1-2',
                            children: [
                                {
                                    name: '运营部',
                                    id: '1-2-1'
                                },
                                {
                                    name: '销售部',
                                    id: '1-2-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '有生集团',
                    id: '2',
                    children: [
                        {
                            name: '内蒙团队',
                            id: '2-1'
                        },
                        {
                            name: '深圳团队',
                            id: '2-2'
                        }
                    ]
                }
            ]);

    let disabledTreeData = ref([
        {
            name: '北京有生博大有限公司',
            id: '1',
            children: [
                {
                    name: '深圳分公司',
                    id: '1-1',
                    children: [
                        {
                            name: '研发部',
                            id: '1-1-1',
                            disabled: true
                        },
                        {
                            name: '销售部',
                            id: '1-1-2'
                        }
                    ]
                },
                {
                    name: '山东分公司',
                    id: '1-2',
                    children: [
                        {
                            name: '运营部',
                            id: '1-2-1',
                            disabled: true
                        },
                        {
                            name: '销售部',
                            id: '1-2-2'
                        }
                    ]
                }
            ]
        },
        {
            name: '有生集团',
            id: '2',
            children: [
                {
                    name: '内蒙团队',
                    id: '2-1',
                    disabled: true
                },
                {
                    name: '深圳团队',
                    id: '2-2',
                    disabled: true
                }
            ]
        }
    ]);

    //过滤tree
    let search = ref('');
    const y9TreeSearchRef = ref('');
    watch(
        () => search.value,
        (newVal) => {
            y9TreeSearchRef.value!.filter(newVal);
        }
    );

    const filterNodeMethod = (value, data) => {
        if (!value) return true;
        return data.name.includes(value);
    };

    let y9TreeDefaultActiveRef = ref();

    let count = 100;
    //点击添加icon
    const onAddIcon = (node) => {
        count++;
        y9TreeDefaultActiveRef.value.append(
            {
                name: '新增节点,id=' + (node.id + '-' + count),
                id: node.id + '-' + count
            },
            node.id
        );
        console.log('添加icon被点击了', node);
    };

    //点击删除icon
    const onRemoveIcon = (node) => {
        y9TreeDefaultActiveRef.value.remove(node);
        console.log('删除icon被点击了', node);
    };

    //点击查看icon
    const onPreviewIcon = (node) => {
        console.log('查看icon被点击了', node);
    };

    let y9TreeCustomActiveRef = ref();
    //点击自定义：删除
    const onDelete = (node) => {
        y9TreeCustomActiveRef.value.remove(node);
        console.log('删除被点击了', node);
    };
    //点击自定义：向上插入兄弟节点
    const onInsertBefore = (node) => {
        count++;
        y9TreeCustomActiveRef.value.insertBefore(
            {
                name: '新增节点,id=' + (node.id + '-' + count),
                id: node.id + '-' + count
            },
            node.id
        );
        console.log('向上插入兄弟节点被点击了', node);
    };
    //点击自定义：向下插入兄弟节点
    const onInsertAfter = (node) => {
        count++;
        y9TreeCustomActiveRef.value.insertAfter(
            {
                name: '新增节点,id=' + (node.id + '-' + count),
                id: node.id + '-' + count
            },
            node.id
        );
        console.log('向下插入兄弟节点被点击了', node);
    };

    //tree懒加载
    const onTreeLazyLoad = async (node, resolve: () => void) => {
        if (node.$level === 0) {
            let res = await treeInterface(); //获取一级节点数据

            return resolve(res.data); //返回一级节点数据
        } else {
            let res = await getTreeItemById({
                parentId: node.id,
                treeType: 'tree_type_org_person',
                disabled: true
            });
            return resolve(res.data); //返回二级三级...节点数据
        }
    };

    //tree懒加载+api搜索
    //tree实例
    const y9LazyTreeRef = ref();

    //已经加载成功的tree数据
    const alreadyLoadTreeData = ref([]);

    //搜索关键字
    const apiSearchKey = ref('');

    //防抖定时器
    let timer;
    const onSearchChange = (searchkey) => {
        //清空计时器
        clearTimeout(timer);

        //重新计时
        timer = setTimeout(async () => {
            if (searchkey) {
                //有值就请求搜索api

                //请求搜索接口
                const res = await searchByName({
                    key: searchkey,
                    treeType: 'tree_type_org_person'
                });

                const data = res.data;

                //根据搜索结果转换成tree结构显示出来
                alreadyLoadTreeData.value = transformTreeBySearchResult(data);

                nextTick(() => {
                    y9LazyTreeRef.value.setExpandAll();
                });
            } else {
                //没有就获取获取已经懒加载过的数据，并且设置默认选中第一个节点、默认展开第一个节点

                alreadyLoadTreeData.value = y9LazyTreeRef.value.getLazyTreeData(); //获取已经懒加载过的数据

                nextTick(() => {
                    if (alreadyLoadTreeData.value.length > 0) {
                        y9LazyTreeRef.value.setCurrentKey(alreadyLoadTreeData.value[0].id); //设置第一个节点为高亮节点

                        y9LazyTreeRef.value.setExpandKeys([alreadyLoadTreeData.value[0].id]); //设置第一个节点展开
                    }
                });
            }
        }, 500);
    };

    //根据搜索结果转换成tree结构
    function transformTreeBySearchResult(result) {
        const treeData = [];
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            if (!item.parentId) {
                //一级节点
                let node = item;
                const child = result.filter((resultItem) => resultItem.parentId === item.id);
                if (child.length > 0) {
                    //如果有子节点则递归子节点，进行组合
                    item.children = child;
                    const fn2 = (data) => {
                        for (let j = 0; j < data.length; j++) {
                            const itemJ = data[j];
                            const childs = result.filter((resultItem) => resultItem.parentId === itemJ.id);
                            if (childs.length > 0) {
                                itemJ.children = childs;
                                if (itemJ.children.length > 0) {
                                    fn2(itemJ.children);
                                }
                            }
                        }
                    };
                    fn2(item.children); //递归子节点
                }

                treeData.push(item);
            }
        }

        return treeData;
    }

    //懒加载
    async function onTreeLazyLoadFn(node, resolve: () => void) {
        if (node.$level === 0) {
            //请求一级节点接口
            const res = await treeInterface();
            const data = res.data;

            //初始化数据后，默认选中第一个节点、设置第一个节点展开
            const callBack = () => {
                if (data.length > 0) {
                    y9LazyTreeRef.value.setCurrentKey(data[0].id); //设置第一个节点为高亮节点

                    y9LazyTreeRef.value.setExpandKeys([data[0].id]); //设置第一个节点展开
                }
            };
            return resolve(data, callBack); //返回一级节点数据
        } else {
            //请求接口
            const res = await getTreeItemById({
                parentId: node.id,
                treeType: 'tree_type_org_person'
            });
            console.log('二级节点res', res);
            const data = res.data;

            return resolve(data); //返回二级三级...节点数据
        }
    }

    //懒加载 子节点为person时可选，父节点禁止选择，待子节点加载完毕设置父节点可选 示例
    //模拟一级接口返回数据
    const virtually_treeInterface = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    code: 200,
                    msg: '一级接口访问成功',
                    data: [
                        {
                            name: '北京有生博大有限公司',
                            id: '1',
                            orgType: 'Organization',
                            parentId: ''
                        },
                        {
                            name: '有生集团',
                            id: '2',
                            orgType: 'Organization',
                            parentId: ''
                        }
                    ]
                });
            }, 2000);
        });
    };
    //模拟二级、三级接口返回数据
    const virtually_getTreeItemById = (parentId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                switch (parentId) {
                    case '1':
                        resolve({
                            code: 200,
                            msg: '二级接口访问成功',
                            data: [
                                {
                                    name: '深圳分公司',
                                    id: '1-1',
                                    orgType: 'Department',
                                    parentId: parentId
                                },
                                {
                                    name: '山东分公司',
                                    id: '1-2',
                                    orgType: 'Department',
                                    parentId: parentId
                                }
                            ]
                        });
                        break;
                    case '2':
                        resolve({
                            code: 200,
                            msg: '二级接口访问成功',
                            data: [
                                {
                                    name: '内蒙团队',
                                    id: '2-1',
                                    orgType: 'Department',
                                    parentId: parentId
                                },
                                {
                                    name: '小红',
                                    id: '2-2',
                                    orgType: 'Person',
                                    parentId: parentId
                                }
                            ]
                        });
                        break;
                    case '1-1':
                        resolve({
                            code: 200,
                            msg: '三级接口访问成功',
                            data: [
                                {
                                    name: '小明',
                                    id: '1-1-1',
                                    orgType: 'Person',
                                    parentId: parentId
                                },
                                {
                                    name: '小亮',
                                    id: '1-1-2',
                                    orgType: 'Person',
                                    parentId: parentId
                                }
                            ]
                        });
                        break;
                    case '1-2':
                        resolve({
                            code: 200,
                            msg: '三级接口访问成功',
                            data: [
                                {
                                    name: '运营部',
                                    id: '1-2-1',
                                    orgType: 'Department',
                                    parentId: parentId
                                },
                                {
                                    name: '小白',
                                    id: '1-2-2',
                                    orgType: 'Person',
                                    parentId: parentId
                                }
                            ]
                        });
                        break;
                    default:
                        resolve({
                            code: 200,
                            msg: '接口访问成功',
                            data: []
                        });
                }
            }, 500);
        });
    };
    //tree实例
    const y9TreeChangeCheckedRef = ref('');
    //tree懒加载
    const onTreeLazyLoadChangeChecked = async (node, resolve: () => void) => {
        if (node.$level === 0) {
            //获取一级节点数据
            let res = await virtually_treeInterface();

            //格式化数据
            res.data.forEach((item) => {
                if (item.orgType === 'Person') {
                    item.isLeaf = true; //设置为叶子节点
                } else {
                    item.disabled = true; //可选框禁止选择
                }
            });

            return resolve(res.data); //返回一级节点数据
        } else {
            //获取二级节点数据
            let res = await virtually_getTreeItemById(node.id);

            //格式化数据
            res.data.forEach((item) => {
                if (item.orgType === 'Person') {
                    item.isLeaf = true; //设置为叶子节点
                } else {
                    item.disabled = true; //可选框禁止选择
                }
            });

            const callBack = () => {
                /**
                 * 1- 检查是否该节点下的所有子节点已经加载完毕，或者为叶子节点（因为person类型是叶子节点），检查通过设置该节点为可选
                 * 2- 一级一级递归该节点是否有父节点，有父节点则递归检查父节点下的所有孙子节点是否加载完毕，或者为叶子节点，检查通过则设置为可选。
                 */

                //1- 检查是否该节点下的所有子节点已经加载完毕，或者为叶子节点（因为person类型是叶子节点）
                const flag = node.children.every((item) => item.$lazyLoaded === true || item.isLeaf === true);
                if (flag) {
                    //检查通过则设置其父节点可选
                    y9TreeChangeCheckedRef.value.setCheckDisabledByKey(node.id, false);
                }
                //2- 一级一级递归该节点是否有父节点，有父节点则递归检查父节点下的所有孙子节点是否加载完毕，或者为叶子节点，检查通过则设置为可选。
                const diguiParent = (currNode) => {
                    if (currNode.parentId) {
                        //获取父节点
                        const parentNode = y9TreeChangeCheckedRef.value.getNode(currNode.parentId);
                        if (Object.keys(parentNode).length > 0 && parentNode.children) {
                            //2-1 开始递归检查父节点下的所有子节点，该父节点下的所有孙、子节点加载完毕才能可选
                            const diguiChildren = (treeData) => {
                                let childFlag = true;
                                for (let i = 0; i < treeData.length; i++) {
                                    const item = treeData[i];
                                    if (item.$lazyLoaded !== true && item.isLeaf !== true) {
                                        childFlag = false;
                                    }
                                    if (item.$lazyLoaded === true && item.children && item.children.length) {
                                        const valid = diguiChildren(item.children);
                                        if (!valid) {
                                            childFlag = false;
                                        }
                                    }
                                }
                                return childFlag;
                            };

                            const diguiResult = diguiChildren(parentNode.children);
                            if (diguiResult) {
                                y9TreeChangeCheckedRef.value.setCheckDisabledByKey(parentNode.id, false);
                                //2-2 继续递归检查该父节点的父节点
                                diguiParent(parentNode);
                            }
                        }
                    }
                };

                diguiParent(node);
            };

            return resolve(res.data, callBack); //返回二级三级...节点数据
        }
    };

    //在双击事件中屏蔽单击事件的示例
    let nodeClickTimer = null; //单击事件的计时器
    function nodeDblclick(item) {
        clearTimeout(nodeClickTimer);
        console.log('双击事件触发', item);
    }

    function nodeClick(item) {
        clearTimeout(nodeClickTimer);
        nodeClickTimer = setTimeout(() => {
            console.log('单击事件触发', item);
        }, 200);
    }

    //y9Tree属性说明表属性说明表格配置
    let attrTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '可选值',
                key: 'optionalValue'
            },
            {
                title: '默认值',
                key: 'defaultValue'
            }
        ],
        tableData: [
            {
                attr: 'data',
                explain: '展示数据',
                type: 'Array',
                optionalValue: '',
                defaultValue: '[]'
            },
            {
                attr: 'nodeKey',
                explain: '节点唯一标识的属性',
                type: 'String',
                optionalValue: '',
                defaultValue: 'id'
            },
            {
                attr: 'nodeProps',
                explain:
                    '节点字段的属性配置,lable:指定节点标签为节点对象的某个属性值,children:指定子树为节点对象的某个属性值（有children属性，就有展开按钮）,disabled:指定节点选择框是否禁用为节点对象的某个属性值,isLeaf:指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效',
                type: 'Object',
                optionalValue: '',
                defaultValue: `
					{
						label:"title",
						children:"children",
						disabled:"disabled",
						isLeaf:false
					}
					`,
                id: 'props',
                children: [
                    {
                        attr: 'label',
                        explain: '指定节点标签为节点对象的某个属性值',
                        type: 'String',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'children',
                        explain: '指定子树为节点对象的某个属性值',
                        type: 'String',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'disabled',
                        explain: '指定节点选择框是否禁用为节点对象的某个属性值',
                        type: 'String',
                        optionalValue: '',
                        defaultValue: ''
                    }
                ]
            },
            {
                attr: 'isCustomNodeClass',
                explain:
                    '是否设置自定义节点样式，如果为true，会识别树数据data中 “$customNodeClass” 字段的值作为该节点的样式名称。',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'haveBorder',
                explain: '节点是否有边框',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'true'
            },
            {
                attr: 'indent',
                explain: '相邻级节点间的水平缩进',
                type: 'String',
                optionalValue: '',
                defaultValue: '20px'
            },
            {
                attr: 'emptyText',
                explain: '内容为空的时候展示的文本',
                type: 'String',
                optionalValue: '',
                defaultValue: '暂无数据'
            },
            {
                attr: 'defaultAcitonIcons',
                explain: '默认的节点操作icon,为true时，全部展示，为false时，全部不展示，为Object类型时根据配置展示',
                type: 'Object | Boolean',
                optionalValue: 'true | false | {add:true,remove:true,preview:true,}',
                defaultValue: 'false',
                id: 'defaultAcitonIcons',
                children: [
                    {
                        attr: 'add',
                        explain: '是否显示默认的添加icon',
                        type: 'Boolean',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'remove',
                        explain: '是否显示默认的删除icon',
                        type: 'Boolean',
                        optionalValue: '',
                        defaultValue: ''
                    },
                    {
                        attr: 'preview',
                        explain: '是否显示默认的预览icon',
                        type: 'Boolean',
                        optionalValue: '',
                        defaultValue: ''
                    }
                ]
            },
            {
                attr: 'currentNodeKey',
                explain: '当前选中的节点',
                type: 'String | Number',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'highlightCurrent',
                explain: '是否高亮当前选中节点',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'true'
            },
            {
                attr: 'filterNodeMethod',
                explain: '对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏.Function(value, data)',
                type: 'Function',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'showCheckbox',
                explain: '节点是否可被选择,即是否显示可选框',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'defaultExpandAll',
                explain: '是否默认展开所有节点',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'defaultExpandedKeys',
                explain: '默认展开的节点的 key 的数组',
                type: 'Array',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'defaultCheckedKeys',
                explain: '默认勾选的节点的 key 的数组',
                type: 'Array',
                optionalValue: '',
                defaultValue: ''
            },
            {
                attr: 'nodeDblclick',
                explain: '是否支持双击事件',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'expandOnClickNode',
                explain:
                    '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'checkOnClickNode',
                explain: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'checkStrictly',
                explain: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false,父子互相关联',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'lazy',
                explain: '是否懒加载子节点，需与 load 方法结合使用',
                type: 'Boolean',
                optionalValue: '',
                defaultValue: 'false'
            },
            {
                attr: 'load',
                explain: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
                type: 'Function',
                optionalValue:
                    'function(node, resolve)  resolve是个函数，resolve参数有（data,callBack）1.data就是tree数据 2.callBack就是组件内部初始化懒加载数据后，执行的回调函数',
                defaultValue: 'false'
            },
            {
                attr: 'expandIconPosition',
                explain: '展开icon位置',
                type: 'String',
                optionalValue: 'left | right',
                defaultValue: 'left'
            }
        ]
    });

    //y9Tree事件说明表
    let eventTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '事件名',
                key: 'name',
                align: 'left'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '回调参数',
                key: 'callBack'
            }
        ],
        tableData: [
            {
                name: 'node-expand',
                explain: '节点被展开时触发的事件',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'node-collapse',
                explain: '节点被关闭时触发的事件',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'node-click',
                explain: '当节点被点击的时候触发',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'node-dblclick',
                explain:
                    '当节点被双击的时候触发，必须设置属性 nodeDblclick 为 true 此事件才生效（注意：双击事件必定会触发单击事件）',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'node-context-menu',
                explain: '当点击节点鼠标右键时触发',
                callBack: '共两个参数，依次为：event，节点的当前节点的 Node 对象'
            },
            {
                name: 'add-icon',
                explain: '当节点的默认添加icon被点击的时候触发',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'remove-icon',
                explain: '当节点的默认删除icon被点击的时候触发',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'preview-icon',
                explain: '当节点的默认预览icon被点击的时候触发',
                callBack: '当前节点的 Node 对象'
            },
            {
                name: 'check-change',
                explain: '当复选框被点击的时候触发',
                callBack:
                    '共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点'
            }
        ]
    });

    //y9Tree实例说明表
    let instanceTableConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '属性',
                key: 'attr'
            },
            {
                title: '说明',
                key: 'explain'
            },
            {
                title: '类型',
                key: 'type'
            },
            {
                title: '传入的参数说明',
                key: 'params'
            }
        ],
        tableData: [
            {
                attr: 'filterTree',
                explain: '模糊过滤tree',
                type: 'Function',
                params: `

					`
            },
            {
                attr: 'setChecked',
                explain: '设置节点是否被选中, 使用此方法必须设置 nodeKey 属性',
                type: 'Function',
                params: `
						传入三个参数：
							1.要选中的节点的 key 或者 node对象
							2.一个布尔类型参数表明是否选中
							3.一个布尔类型参数表明是否递归选中子节点
					`
            },
            {
                attr: 'setCheckedKeys',
                explain: '设置需要选中的节点，使用此方法必须设置 nodeKey 属性',
                type: 'Function',
                params: `
						传入一个参数：需要被选中的多节点 key 的数组
					`
            },
            {
                attr: 'setCheckedNodes',
                explain: '设置需要选中的节点，使用此方法必须设置 nodeKey 属性',
                type: 'Function',
                params: `
						传入一个参数：需要被选中的多节点数组
					`
            },
            {
                attr: 'getCheckedNodes',
                explain: '如果节点可以被选中，(showCheckbox 为 true), 本方法将返回当前选中节点的数组',
                type: 'Function',
                params: `
						传入两个参数：
							1.leafOnly,默认值为 false,返回当前选中的节点数组， 若参数为 true, 它将返回当前选中节点的子节点数组
							2.includeHalfChecked，默认值为 false，不包含半选中节点，如果参数为 true, 返回值包含半选中节点数据
					`
            },
            {
                attr: 'getCheckedKeys',
                explain: '如果节点可以被选中，(showCheckbox 为 true), 本方法将返回当前选中节点 key 的数组',
                type: 'Function',
                params: `
						传入一个参数：leafOnly,默认值为 false,返回当前选中的节点的key数组， 若参数为 true, 它将返回当前选中节点的子节点的key数组
					`
            },
            {
                attr: 'getHalfCheckedNodes',
                explain: '如果节点可以被选中，(showCheckbox 为 true), 本方法将返回当前半选中的节点组成的数组',
                type: 'Function',
                params: `

					`
            },
            {
                attr: 'getHalfCheckedKeys',
                explain: '如果节点可以被选中，(showCheckbox 为 true), 本方法将返回当前半选中的节点组成的key数组',
                type: 'Function',
                params: `

					`
            },
            {
                attr: 'getNode',
                explain: '根据 key 拿到 node',
                type: 'Function',
                params: `
						传入一个参数：key
					`
            },
            {
                attr: 'clearAllChecked',
                explain: '清空所有选中的节点',
                type: 'Function',
                params: `

					`
            },
            {
                attr: 'setAllChecked',
                explain: '设置选中所有节点',
                type: 'Function',
                params: `

					`
            },
            {
                attr: 'remove',
                explain: '删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入一个参数：(data) 要删除的节点的 data 或者 node 对象
					`
            },
            {
                attr: 'append',
                explain: '为 Tree 中的一个节点追加一个子节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入两个参数：(data, parentNode) 1. 要追加的子节点的 data 2. 父节点的 data, key 或 node
					`
            },
            {
                attr: 'insertBefore',
                explain: '在 Tree 中给定节点前插入一个节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入两个参数：(data, parentNode) 1. 要增加的子节点的 data 2. 参考节点的 data, key 或 node
					`
            },
            {
                attr: 'insertAfter',
                explain: '在 Tree 中给定节点后插入一个节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入两个参数：(data, parentNode) 1. 要增加的子节点的 data 2. 参考节点的 data, key 或 node
					`
            },
            {
                attr: 'getCurrentKey',
                explain: '返回当前被选中节点的key (如果没有则返回 null)，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: ''
            },
            {
                attr: 'getCurrentNode',
                explain: '返回当前被选中节点的数据 (如果没有则返回 null)，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: ''
            },
            {
                attr: 'setCurrentKey',
                explain: '通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入两个参数：(key, shouldAutoExpandParent) 1. 待被选节点的 key， 如果为 null, 取消当前选中的节点 2. 是否自动展开父节点
					`
            },
            {
                attr: 'setCurrentNode',
                explain: '通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入两个参数：(node, shouldAutoExpandParent) 1. 待被选中的节点 2. 是否自动展开父节点
					`
            },
            {
                attr: 'getLazyTreeData',
                explain: '获取懒加载的tree数据 使用此方法必须设置lazy懒加载状态为true',
                type: 'Function',
                params: `
					`
            },
            {
                attr: 'setExpandKeys',
                explain: '根据key设置展开节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: `
						传入一个参数：(keys) 需要被展开的节点key数组
					`
            },
            {
                attr: 'setExpandAll',
                explain: '设置展开所有节点，使用此方法必须设置 node-key 属性',
                type: 'Function',
                params: ``
            },
            {
                attr: 'handNodeClick',
                explain: '手动点击节点',
                type: 'Object | Number | String',
                params: `传入一个参数：(data) 需要手动点击的 data, key 或 node`
            },
            {
                attr: 'setCheckDisabledByKey',
                explain: '根据key设置多选框是否禁用，（注意，设置属性showCheckbox = true，此方法才生效）',
                type: 'Number | String',
                params: `传入一个参数：(key) 需要设置为可选的节点 key `
            }
        ]
    });

    //y9Tree插槽说明表格配置
    let slotConfig = ref({
        showOverflowTooltip: false,
        headerBackground: true, //头部背景颜色
        pageConfig: false, //无分页
        border: false, //无边框
        columns: [
            {
                title: '插槽名',
                key: 'slotName'
            },
            {
                title: '说明',
                key: 'explain'
            }
        ],
        tableData: [
            {
                slotName: 'expand',
                explain: '自定义展开收缩时的icon，回调一个参数：isExpand是否展开节点'
            },
            {
                slotName: 'content',
                explain: '自定义节点内容，回调一个参数：item当前节点'
            },
            {
                slotName: 'title',
                explain: '节点标题，回调一个参数：item当前节点'
            },
            {
                slotName: 'actions',
                explain: '自定义操作按钮，回调一个参数：item当前节点'
            }
        ]
    });

    //查看代码弹窗
    let codeDialogConfig = ref({
        show: false,
        okText: '复制',
        onOk: (config) => {
            return new Promise((resolve, reject) => {
                const code = document.getElementById('code');
                window.getSelection().selectAllChildren(code);
                document.execCommand('copy');
                ElMessage({
                    message: '复制成功',
                    type: 'success'
                });
                reject();
            });
        }
    });

    //点击查看代码按钮
    function onShowCode(type) {
        Object.assign(codeDialogConfig.value, {
            show: true,
            type: type
        });
        if (type === 'base') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData"></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'noBorder') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" :haveBorder="false"></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'checkbox') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" showCheckbox></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'defaultExpanAndChecked') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree
			:data="treeData"
			showCheckbox
			:defaultExpandedKeys="['1','1-1','2']"
			:defaultCheckedKeys="['1-2','2-1']"></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'disabled') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" showCheckbox></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
								disabled:true,
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
								disabled:true,
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
						disabled:true,
					},
					{
						name:"深圳团队",
						id:"2-2",
						disabled:true,
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'defaultActive') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree
			ref="y9TreeDefaultActiveRef"
			:data="treeData"
			showCheckbox
			defaultAcitonIcons
			@add-icon="onAddIcon"
			@remove-icon="onRemoveIcon"
			@preview-icon="onPreviewIcon">
			</y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);

		let y9TreeDefaultActiveRef = ref()
		let count = 100;

		//点击添加icon
		const onAddIcon = (node) => {
			count++
			y9TreeDefaultActiveRef.value.append({
				name:"新增节点,id="+(node.id + '-' + count),
				id:node.id + '-' + count,
			},node.id);
			console.log("添加icon被点击了",node)
		}

		//点击删除icon
		const onRemoveIcon = (node) => {
			y9TreeDefaultActiveRef.value.remove(node)
			console.log("删除icon被点击了",node)
		}

		//点击查看icon
		const onPreviewIcon = (node) => {
			console.log("查看icon被点击了",node)
		}
	<\/script>
			`;
        } else if (type === 'customActive') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree
			ref="y9TreeCustomActiveRef"
			:data="treeData"
			showCheckbox >
				<template #actions="{item}">
					<span style="color: var(--el-color-primary);" @click="onDelete(item)">删除</span>
					<span style="color: var(--el-color-primary);margin-left: 5px;" @click="onInsertAfter(item)">向下插入兄弟节点</span>
					<span style="color: var(--el-color-primary);margin-left: 5px;" @click="onInsertBefore(item)">向上插入兄弟节点</span>
				</template>
			</y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);

		let y9TreeCustomActiveRef = ref()
		//点击自定义：删除
		const onDelete = (node) => {
			y9TreeCustomActiveRef.value.remove(node)
			console.log("删除被点击了",node)
		}
		let count = 100;
		//点击自定义：向上插入兄弟节点
		const onInsertBefore = (node) => {
			count++
			y9TreeCustomActiveRef.value.insertBefore({
				name:"新增节点,id="+(node.id + '-' + count),
				id:node.id + '-' + count,
			},node.id);
			console.log("向上插入兄弟节点被点击了",node)
		}
		//点击自定义：向下插入兄弟节点
		const onInsertAfter = (node) => {
			count++
			y9TreeCustomActiveRef.value.insertAfter({
				name:"新增节点,id="+(node.id + '-' + count),
				id:node.id + '-' + count,
			},node.id);
			console.log("向下插入兄弟节点被点击了",node)
		}
	<\/script>
			`;
        } else if (type === 'customTitle') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" showCheckbox>
				<template #title="{item}">
					{{item.id}}--{{item.name}}
				</template>
			</y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'customNode') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" showCheckbox>
				<template #content="{item}">
					<div style="display: flex; align-items:center">
						<i class="ri-organization-chart" style="margin-right: 5px;"></i>
						<span>{{item.name}}</span>
					</div>
				</template>
			</y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'filterNode') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<el-input v-model="search" style="margin-bottom: 20px;"></el-input>
			<y9Tree
			ref="y9TreeSearchRef"
			:data="treeData"
			showCheckbox
			defaultExpandAll
			:filterNodeMethod="filterNodeMethod">
			</y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let search = ref('');
		const y9TreeSearchRef = ref('')
		watch(
			() => search.value,
			(newVal) => {
				y9TreeSearchRef.value!.filter(newVal);
			}
		)

		const filterNodeMethod = (value,data) => {
			if(!value) return true
			return data.name.includes(value)
		}
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
	<\/script>
			`;
        } else if (type === 'lazyNode') {
            codeDialogConfig.value.codeText = `
	<template>
		<y9Tree
		lazy
		showCheckbox
		:load="onTreeLazyLoad">
		</y9Tree>
	</template>
	<script lang="ts" setup>
		import { treeInterface, getTreeItemById, searchByName } from '@/api/org';
		//tree懒加载
		const onTreeLazyLoad = async (node, resolve: () => void) => {

			if (node.$level === 0) {
				let res = await treeInterface();//获取一级节点数据

				return resolve(res.data)//返回一级节点数据


			} else {
				let res = await getTreeItemById({
					parentId: node.id,
					treeType:'tree_type_org_person',
					disabled: true,
				});
				return resolve(res.data);//返回二级三级...节点数据
			}
		}
	<\/script>
			`;
        } else if (type === 'lazyNode+apiSearch') {
            codeDialogConfig.value.codeText = `
	<template>
		<el-input v-model="apiSearchKey" style="margin-bottom: 20px;" placeholder="请搜索用户名称" @input="onSearchChange"></el-input>
		<y9Tree
		ref="y9LazyTreeRef"
		:data="alreadyLoadTreeData"
		lazy
		:load="onTreeLazyLoadFn">
		</y9Tree>
	</template>
	<script lang="ts" setup>
		import { treeInterface, getTreeItemById, searchByName } from '@/api/org';
		//tree实例
		const y9LazyTreeRef = ref()

		//已经加载成功的tree数据
		const alreadyLoadTreeData = ref([]);

		//搜索关键字
		const apiSearchKey = ref('')

		//防抖定时器
		let timer;
		const onSearchChange = (searchkey) => {
			//清空计时器
		    clearTimeout(timer);

			//重新计时
			timer = setTimeout(async () => {
				if(searchkey){//有值就请求搜索api

					//请求搜索接口
					const res = await searchByName({
						key:searchkey,
						treeType:"tree_type_org_person"

					})

					const data = res.data;

					//根据搜索结果转换成tree结构显示出来
					alreadyLoadTreeData.value = transformTreeBySearchResult(data);

					nextTick(() => {
						y9LazyTreeRef.value.setExpandAll()
					})



				}else{//没有就获取获取已经懒加载过的数据，并且设置默认选中第一个节点、默认展开第一个节点

					alreadyLoadTreeData.value = y9LazyTreeRef.value.getLazyTreeData();//获取已经懒加载过的数据

					nextTick(() => {

						if(alreadyLoadTreeData.value.length > 0){

							y9LazyTreeRef.value.setCurrentKey(alreadyLoadTreeData.value[0].id);//设置第一个节点为高亮节点

							y9LazyTreeRef.value.setExpandKeys([alreadyLoadTreeData.value[0].id])//设置第一个节点展开

						}
					})


				}
			},500)
		};


		//根据搜索结果转换成tree结构
		function transformTreeBySearchResult(result){
				const treeData = []
				for(let i = 0; i<result.length; i++){
					const item = result[i];
					if(!item.parentId){//一级节点
						let node = item;
						const child = result.filter(resultItem => resultItem.parentId === item.id);
						if(child.length > 0){//如果有子节点则递归子节点，进行组合
							item.children = child;
							const fn2 = (data) => {
								for(let j = 0; j<data.length; j++){
									const itemJ = data[j];
									const childs = result.filter(resultItem => resultItem.parentId === itemJ.id);
									if(childs.length > 0){
										itemJ.children = childs
										if(itemJ.children.length > 0){
											fn2(itemJ.children)
										}
									}
								}
							}
							fn2(item.children);//递归子节点
						}

						treeData.push(item)

					}
				}

				return treeData
		}

		//懒加载
		async function onTreeLazyLoadFn(node,resolve: () => void){
			if (node.$level === 0) {
				//请求一级节点接口
				const res = await treeInterface();
				const data = res.data;


				//初始化数据后，默认选中第一个节点、设置第一个节点展开
				const callBack = () => {
					if(data.length > 0){

						y9LazyTreeRef.value.setCurrentKey(data[0].id);//设置第一个节点为高亮节点

						y9LazyTreeRef.value.setExpandKeys([data[0].id])//设置第一个节点展开

					}

				}
				return resolve(data,callBack)//返回一级节点数据


			} else {


				//请求接口
				const res = await getTreeItemById({
					parentId:node.id,
					treeType: 'tree_type_org_person'
				});
				console.log("二级节点res",res)
				const data = res.data;

				return resolve(data);//返回二级三级...节点数据
			}
		}
	<\/script>
			`;
        } else if (type === 'lazyNodeChangeChecked') {
            codeDialogConfig.value.codeText = `
	<template>
		<y9Tree
		ref="y9TreeChangeCheckedRef"
		lazy
		showCheckbox
		:load="onTreeLazyLoadChangeChecked">
		</y9Tree>
	</template>
	<script lang="ts" setup>
		//模拟一级接口返回数据
		const virtually_treeInterface = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						code:200,
						msg:"一级接口访问成功",
						data:[
							{
								name:"北京有生博大有限公司",
								id:"1",
								orgType: "Organization",
								parentId: "",
							},
							{
								name:"有生集团",
								id:"2",
								orgType: "Organization",
								parentId: "",
							},
						]
					})
				},2000)
			})
		}
		//模拟二级、三级接口返回数据
		const virtually_getTreeItemById = (parentId) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					switch(parentId){
						case "1":
							resolve({
								code:200,
								msg:"二级接口访问成功",
								data:[
									{
										name:"深圳分公司",
										id:"1-1",
										orgType: "Department",
										parentId: parentId,
									},
									{
										name:"山东分公司",
										id:"1-2",
										orgType: "Department",
										parentId: parentId,
									},
								]
							})
							break;
						case "2":
							resolve({
								code:200,
								msg:"二级接口访问成功",
								data:[
									{
										name:"内蒙团队",
										id:"2-1",
										orgType: "Department",
										parentId: parentId,
									},
									{
										name:"小红",
										id:"2-2",
										orgType: "Person",
										parentId: parentId,
									},
								]
							})
							break;
						case "1-1":
							resolve({
								code:200,
								msg:"三级接口访问成功",
								data:[
									{
										name:"小明",
										id:"1-1-1",
										orgType: "Person",
										parentId: parentId,
									},
									{
										name:"小亮",
										id:"1-1-2",
										orgType: "Person",
										parentId: parentId,
									},
								]
							})
							break;
						case "1-2":
							resolve({
								code:200,
								msg:"三级接口访问成功",
								data:[
									{
										name:"运营部",
										id:"1-2-1",
										orgType: "Department",
										parentId: parentId,
									},
									{
										name:"小白",
										id:"1-2-2",
										orgType: "Person",
										parentId: parentId,
									},
								]
							})
							break;
						default:
							resolve({
								code:200,
								msg:"接口访问成功",
								data:[]
							})

					}

				},500)
			})
		}
		//tree实例
		const y9TreeChangeCheckedRef = ref("");
		//tree懒加载
		const onTreeLazyLoadChangeChecked = async (node, resolve: () => void) => {

			if (node.$level === 0) {

				//获取一级节点数据
				let res = await virtually_treeInterface();

				//格式化数据
				res.data.forEach(item => {
					if(item.orgType === 'Person'){
						item.isLeaf = true;//设置为叶子节点
					}else {
						item.disabled = true;//可选框禁止选择
					}
				})

				return resolve(res.data)//返回一级节点数据


			} else {

				//获取二级节点数据
				let res = await virtually_getTreeItemById(node.id);

				//格式化数据
				res.data.forEach(item => {
					if(item.orgType === 'Person'){
						item.isLeaf = true;//设置为叶子节点
					}else {
						item.disabled = true;//可选框禁止选择
					}
				})


				const callBack = () => {

					/**
					 * 1- 检查是否该节点下的所有子节点已经加载完毕，或者为叶子节点（因为person类型是叶子节点），检查通过设置该节点为可选
					 * 2- 一级一级递归该节点是否有父节点，有父节点则递归检查父节点下的所有孙子节点是否加载完毕，或者为叶子节点，检查通过则设置为可选。
					 */

					//1- 检查是否该节点下的所有子节点已经加载完毕，或者为叶子节点（因为person类型是叶子节点）
					const flag = node.children.every((item) => item.$lazyLoaded === true || item.isLeaf === true);
					if(flag) {//检查通过则设置其父节点可选
						y9TreeChangeCheckedRef.value.setCheckDisabledByKey(node.id,false)
					}
					//2- 一级一级递归该节点是否有父节点，有父节点则递归检查父节点下的所有孙子节点是否加载完毕，或者为叶子节点，检查通过则设置为可选。
					const diguiParent = (currNode) => {
						if(currNode.parentId){
							//获取父节点
							const parentNode = y9TreeChangeCheckedRef.value.getNode(currNode.parentId)
							if(Object.keys(parentNode).length > 0 && parentNode.children){
								//2-1 开始递归检查父节点下的所有子节点，该父节点下的所有孙、子节点加载完毕才能可选
								const diguiChildren = (treeData) => {
									let childFlag = true
									for(let i = 0 ; i < treeData.length; i++){
										const item = treeData[i]
										if(item.$lazyLoaded !== true && item.isLeaf !== true){
											childFlag = false
										}
										if(item.$lazyLoaded === true && item.children && item.children.length){
											const valid = diguiChildren(item.children)
											if(!valid){
												childFlag = false
											}
										}
									}
									return childFlag
								}

								const diguiResult = diguiChildren(parentNode.children);
								if(diguiResult){
									y9TreeChangeCheckedRef.value.setCheckDisabledByKey(parentNode.id,false)
									//2-2 继续递归检查该父节点的父节点
									diguiParent(parentNode)
								}
							}
						}

					}

					diguiParent(node);



				}

				return resolve(res.data,callBack);//返回二级三级...节点数据
			}
		}
	<\/script>
			`;
        } else if (type === 'dblclickAndclick') {
            codeDialogConfig.value.codeText = `
	<template>
		<div style="background-color: #fff; padding:20px;">
			<y9Tree :data="treeData" :nodeDblclick="true" @node-dblclick="nodeDblclick" @node-click="nodeClick"></y9Tree>
		</div>
	</template>
	<script lang="ts" setup>
		let treeData = ref([
			{
				name:"北京有生博大有限公司",
				id:"1",
				children:[
					{
						name:"深圳分公司",
						id:"1-1",
						children:[
							{
								name:"研发部",
								id:"1-1-1",
							},
							{
								name:"销售部",
								id:"1-1-2",
							},
						]
					},
					{
						name:"山东分公司",
						id:"1-2",
						children:[
							{
								name:"运营部",
								id:"1-2-1",
							},
							{
								name:"销售部",
								id:"1-2-2",
							},
						]
					},
				]
			},
			{
				name:"有生集团",
				id:"2",
				children:[
					{
						name:"内蒙团队",
						id:"2-1",
					},
					{
						name:"深圳团队",
						id:"2-2",
					},
				]
			},
		]);
		//在双击事件中屏蔽单击事件的示例
		let nodeClickTimer = null;//单击事件的计时器
		function nodeDblclick(item){
			clearTimeout(nodeClickTimer)
			console.log("双击事件触发",item)
		}
		function nodeClick(item){
			clearTimeout(nodeClickTimer)
			nodeClickTimer = setTimeout(() => {
				console.log("单击事件触发",item)
			},200)
		}
	<\/script>
			`;
        }
    }
</script>

<style lang="scss" scoped></style>
