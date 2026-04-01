export enum UserRole {
    ADMIN = "admin",
    DONOR = "donor",
    OWNER = "owner",
}

export enum VerifiedProfileStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

export enum EntityType {
    INDIVIDUAL = "individual",
    LEGAL = "legal"
}

export enum ProjectStatus {
    ACTIVE = "active",
    PAUSED = "paused",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}

export enum SortOptions {
    NEWEST = "newest",
    OLDEST = "oldest",
    TITLE_ASC = "title_asc",
    TITLE_DESC = "title_desc"
}