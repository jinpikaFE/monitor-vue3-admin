<template>
    <PvTable />
</template>

<script setup>
import { reactive } from 'vue';
import { getMonitorList } from '@/api/home/index';

import PvTable from './components/PvTable.vue';

const searchForm = reactive({
    userId: '',
    uuid: '',
    apikey: '',
    startTime: '',
    endTime: ''
})

</script>
