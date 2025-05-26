import { IQueue } from "./IQueue";

export enum EDirectQueue {
    Queue_01 = 'direct.queue.01',
    Queue_02 = 'direct.queue.02',
}

export enum EDirectRtk {
    rtk_01 = 'dr.rtk.01',
    rtk_02 = 'dr.rtk.02',
}

export const directQueueRtk: IQueue[] = [
    { name: EDirectQueue.Queue_01, rtk: EDirectRtk.rtk_01 },
    { name: EDirectQueue.Queue_02, rtk: EDirectRtk.rtk_02 },
];
