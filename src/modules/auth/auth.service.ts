import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserService } from "../users/users.service";

export class AuthService {
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService;
  }

  public async registerUser(dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    return newUser ?? null;
  }

}