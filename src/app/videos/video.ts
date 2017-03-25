import { VideoStats } from './video-stats';
export class Video {
    constructor (
        public videoId:string, 
        public imgSrc:string, 
        public title:string, 
        public description:string, 
        public date?:Date,
        public isNew?:boolean,
        public stats?:VideoStats){}
}