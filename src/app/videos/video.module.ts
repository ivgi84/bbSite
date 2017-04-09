import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosListComponent } from './videos-list/videos-list.component';
import { VideoListItemComponent } from './video-list-item/video-list-item.component';

import { VideoService } from './video.service';
import { VideoComponent } from './video/video.component';
import { ShortDescriptionPipe } from './short-description.pipe';

@NgModule({
    declarations:[
        VideosListComponent,
        VideoListItemComponent,
        VideoComponent,
        ShortDescriptionPipe
    ],
    providers:[VideoService],
    imports:[CommonModule],
    exports:[VideosListComponent]
})

export class VideoModule { }