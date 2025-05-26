import { IQueue } from "./IQueue";

export enum EHeaderQueue {
    Queue_01 = 'header.queue.01',
    Queue_02 = 'header.queue.02',
}

export enum EHeaderRtk {
    rtk_01 = 'hd.rtk.01',
    rtk_02 = 'hd.rtk.02',
}

export const HeaderQueueRtk: IQueue[] = [
    { name: EHeaderQueue.Queue_01, rtk: EHeaderRtk.rtk_01 },
    { name: EHeaderQueue.Queue_02, rtk: EHeaderRtk.rtk_02 },
];
