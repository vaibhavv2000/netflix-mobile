export interface userTypes {
 name: string;
 email: string;
 password?: string;
};

export interface user {
 id: number;
 name: string;
 email: string;
 wishlist: number[];
};

export interface movie {
 id: number;
 movie_name: string;
 description: string;
 genre: string;
 length: number;
 pg: boolean;
 rating: number;
 release_year: number;
 thumbnail: string;
 title_img: string;
 type: string;
};

export interface position {
 x: number;
 y: number;
 movie: movie;
};