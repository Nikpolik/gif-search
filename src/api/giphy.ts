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

export const getGifs = async (type: 'search' | 'trending', value?: string, pagination?: { limit?: number, offset?: number }) => {
    let request_url = `${BASE_URL}/${type}?api_key=${API_KEY}&`;
    if (value && type == 'search') {
        request_url += `q=${value}&`
    }
    if (pagination) {
        if (pagination.limit) {
            request_url += `limit=${pagination.limit}&`;
        }
        if (pagination.offset) {
            request_url += `offset=${pagination.offset}`;
        }
    }
    const response = await fetch(request_url);
    return await response.json() as SearchResponse;
}