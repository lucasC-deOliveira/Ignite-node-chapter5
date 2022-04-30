import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/rental";




class RentalsRepository implements IRentalsRepository {

    repository: Repository<Rental>


    constructor() {
        this.repository = getRepository(Rental)
    }
    

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where:{
                car_id,end_date:null
            }
        })
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where:{
                user_id,end_date:null
            }
         })
    }
    async create({ car_id, user_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id, user_id, expected_return_date, id, end_date,total
        })

        await this.repository.save(rental)

        return rental;

    }

    async findByid(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
      const rentals = await this.repository.find({
          user_id
      })

      return rentals
    }
}



export { RentalsRepository }