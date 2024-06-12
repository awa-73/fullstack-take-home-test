export interface IContent {
    title: string;
    author: string;
    coverPhotoURL: string;
}
export interface IBook {
    book: IContent
}

export interface IB{
    books:IBook[]
}