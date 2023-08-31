<template>
    <a-table :columns="columns" :data="data" row-key="_id"
        :pagination="{ 'show-total': true, 'show-jumper': true, 'show-page-size': true, total: pager.count, current: currentPage }"
        @page-change="handlePageChange" @page-size-change="handlePageSizeChange">
        <template #path="{ record }">
            {{ record?.message?.pathname || '-' }}
        </template>

        <template #deviceInfo="{ record }">
            <template v-if="record?.deviceInfo">
                <p>
                    {{ record?.deviceInfo?.browser }}
                    {{ record?.deviceInfo?.browserVersion }}
                </p>
                <p>
                    {{ record?.deviceInfo?.device_type }}
                    {{ record?.deviceInfo?.device }} {{ record?.deviceInfo?.os }}
                    {{ record?.deviceInfo?.osVersion }}
                </p>
            </template>
            <template v-else>-</template>
        </template>

        <template #startTime="{ record }">
            {{ formatToDateTime(record?.message?.startTime) || '-' }}
        </template>
        <template #endTime="{ record }">
            {{ formatToDateTime(record?.time) || '-' }}
        </template>
    </a-table>
</template>

<script setup>
import { formatToDateTime } from '@/utils/dateUtil';
import { ref } from 'vue';
import { getMonitorList } from '@/api/home/index';

const pageProps = {
  count: 0,
  pageIndex: 1,
  pageSize: 10,
};

const columns = [
    {
        title: '访问标识',
        dataIndex: 'uuid',
        ellipsis: true,
    },
    {
        title: 'pv路由',
        slotName: 'path',
    },
    {
        title: '触发地址',
        dataIndex: 'pageUrl',
    },
    {
        title: '设备信息',
        slotName: 'deviceInfo',
    },

    {
        title: '用户',
        dataIndex: 'userId',
    },
    {
        title: '项目名',
        dataIndex: 'apikey',
    },
    {
        title: '访问开始时间',
        slotName: 'startTime',
    },
    {
        title: '结束时间',
        slotName: 'endTime',
    },
    // {
    //     title: '操作',
    //     key: 'option',
    //     valueType: 'option',
    //     width: '10%',
    //     fixed: 'right',
    //     render: (_, record) => [
    //         <BreadcrumbBtn record={record} key="behavior" />,
    //     ]
    // }
];

const data = ref([]);
const getData = async () => {
    const res = await getMonitorList({
        pageNum: 1,
        pageSize: 10,
        type: 'pv',
        startTime: '2023-08-01 00:00:00',
        endTime: '2023-08-31 09:58:28'
    })
    data.value = res?.data?.list
}
getData()
</script>
