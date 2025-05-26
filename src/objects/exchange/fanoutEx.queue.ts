import { IQueue } from "./IQueue";

export enum EFanoutQueue {
    Queue_01 = 'fanout.queue.01',
    Queue_02 = 'fanout.queue.02',
}

export enum EFanoutRtk {
    rtk_01 = 'fo.rtk.01',
    rtk_02 = 'fo.rtk.02',
}

export const FanoutQueueRtk: IQueue[] = [
    { name: EFanoutQueue.Queue_01, rtk: EFanoutRtk.rtk_01 },
    { name: EFanoutQueue.Queue_02, rtk: EFanoutRtk.rtk_02 },
];
