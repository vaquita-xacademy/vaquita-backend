import { hashSync } from "bcrypt";
import { CreateDonorDto } from "./dto/create-donor.dto";

export class DonorService {

  public async create(dto: CreateDonorDto) {
    dto.password = hashSync(dto.password, 10);
    // const donor: Donor = await Donor.create(dto);
    // return donor;
  }

}
