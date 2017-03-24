import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoComponent } from './video/video.component';

import { VideoService } from './video.service';
import { FrameComponent } from './frame/frame.component';

@NgModule({
    declarations:[
        VideosListComponent,
        VideoComponent,
        FrameComponent
    ],
    providers:[VideoService],
    imports:[CommonModule],
    exports:[VideosListComponent]
})

export class VideoModule { }