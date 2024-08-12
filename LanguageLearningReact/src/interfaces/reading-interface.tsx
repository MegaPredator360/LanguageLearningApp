import { Tags } from "./tags-interface";

export interface Reading {
    id: number,
    title: string,
    description: string,
    body: string,
    publish_date: string,
    likes: number,
    dislikes: number,
    views: number,
    user: number,
    user_username: string,
    language: number,
    language_name: string,
    category: number,
    category_name: string,
    reading_tags: Tags[]
    jwt?: string
}