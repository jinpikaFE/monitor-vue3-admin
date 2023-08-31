import request from '../../utils/request';

const VITE_MONITOR_BASE_URL = import.meta.env.VITE_MONITOR_BASE_URL;

export function getMonitorList(params) {
  return request({
    url: '/v1/mgb/monitor',
    method: 'get',
    params,
    baseURL: VITE_MONITOR_BASE_URL,
  });
}
