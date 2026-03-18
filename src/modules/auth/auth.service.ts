import { CreateDonorDto } from "../donors/dto/create-donor.dto";
import { DonorService } from "../donors/donor.service";

export class AuthService {
  private donorService: DonorService;
  
  constructor() {
    this.donorService = new DonorService;
  }

  public async registerDonor(dto: CreateDonorDto) {
    const newUser = await this.donorService.create(dto);
    return newUser ?? null;
  }

}
