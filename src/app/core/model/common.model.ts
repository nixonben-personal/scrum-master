import { FormControl } from "@angular/forms"


export type Position='left'|'right'|'center'
export interface Card{
    title:string,
    count:number,
}

export interface StoryForm{
    story_name:FormControl,
    story_point:FormControl
}