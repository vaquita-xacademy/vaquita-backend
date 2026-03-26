import { User } from "../../../db/models/user.model";

export class UserResource {
    static toResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }

    static toCollection(users: User[]) {
        return users.map(user => UserResource.toResponse(user));
    }
}
