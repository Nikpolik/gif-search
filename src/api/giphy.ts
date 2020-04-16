const BASE_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'PfBHv3LRFPkQYAVwjm17ik885dv5eP9f';

export type Image = {
    url: string;
    width: string;
    height: string;
}

export type Images = {
    fixed_height: Image;
    fixed_width: Image;
    fixed_height_still: Image;
    fixed_width_still: Image;
    original: Image;
    original_still: Image;
}

export type Gif = {
    id: string;
    url: string;
    bitly_gif_url: string;
    embed_url: string;
    title: string;
    images: Images
}

export type Pagination = {
    offset: number;
    total_count: number;
    count: number;
}

export type Meta = {
    msg: string;
    status: string;
    response_id: string;
}

export type SearchResponse = {
    data: Gif[],
    pagination: Pagination,
    meta: Meta
}

export const search = async (input: string): Promise<Images[]> => {
    const response = await fetch(`${BASE_URL}/search?api_key=${API_KEY}&q=${input}`)
    const { data } = await response.json() as SearchResponse;
    return data.map((result) => result.images);
}

export const trending = async (): Promise<Images[]> => {
    const response = await fetch(`${BASE_URL}/trending?api_key=${API_KEY}`);
    const { data } = await response.json() as SearchResponse;
    return data.map((result) => result.images);
}