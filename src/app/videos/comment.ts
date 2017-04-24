export class Comment {
    constructor (
        public displayText:string,
        public userName:string,
        public userImg:string,
        public publishDate:Date,
        public replies?:Comment[]
    ){}
}
