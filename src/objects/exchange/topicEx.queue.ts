import { IQueue } from "./IQueue";

export enum ETopicQueue {
    Queue_01 = 'topic.queue.01',
    Queue_02 = 'topic.queue.02',
}

export enum ETopicRtk {
    rtk_01 = 'tp.rtk.01',
    rtk_02 = 'tp.rtk.02',
}

export const TopicQueueRtk: IQueue[] = [
    { name: ETopicQueue.Queue_01, rtk: ETopicRtk.rtk_01 },
    { name: ETopicQueue.Queue_02, rtk: ETopicRtk.rtk_02 },
];
