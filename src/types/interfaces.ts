import { ProjectStatus, SortOptions } from "./enums"

export interface Paginate {
    limit: number,
    after?: string,
    before?: string
}

export interface ListPaginateProjectQuery extends Paginate {
    sort?: SortOptions,
    category_id?: number,
    search?: string,
    status?: ProjectStatus
}

export interface ImageUploadResult {
    url: string;
    publicId: string;
}