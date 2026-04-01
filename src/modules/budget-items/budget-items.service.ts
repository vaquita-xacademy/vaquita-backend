import { CreateBudgetItemDto } from "./dto/create-budget-items.dto";
import { sequelize } from "../../db/sequelize";
import { BudgetItem } from "../../db/models";
import { InternalServerErrorException } from "../../exceptions";

export class BudgetItemsService {
    public async create(projectId: number, dto: CreateBudgetItemDto) {
        return sequelize.transaction(async (transaction) => {
            const budgetItemCreated = await BudgetItem.create(
                {
                    project_id: projectId,
                    name: dto.name,
                    amount: dto.amount,
                },
                { transaction }
            );

            if (!budgetItemCreated) {
                throw new InternalServerErrorException("No se pudo crear el item del presupuesto");
            }

            return budgetItemCreated;
        });
    }
}