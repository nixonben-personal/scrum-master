import { FormControl } from "@angular/forms"


export type Position='left'|'right'|'center'
export interface Card{
    title:string,
    count:number,
    description:string;
}

export interface StoryForm{
    story_name:FormControl,
    story_point:FormControl,
    description:FormControl
}

export interface Signup{
    first_name:string;
    last_name:string,
    email:string,
    password:string
}

export interface Login{
    email:string,
    password:string
}