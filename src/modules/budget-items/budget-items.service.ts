import { CreateBudgetItemDto } from "./dto/create-budget-items.dto";
import { sequelize } from "../../db/sequelize";
import { BudgetItem } from "../../db/models";
import { InternalServerErrorException } from "../../exceptions";
import { Op, Transaction } from "sequelize";
import { UpdateBudgetItemDto } from "./dto/update-budget-items.dto";

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

    public async sync(projectId: number, budgetItems: UpdateBudgetItemDto[], transaction: Transaction) {
        const keepIds = budgetItems.map(item => item.id).filter((id): id is number => id !== undefined);

        await BudgetItem.destroy({
            where: {
                project_id: projectId,
                id: { [Op.notIn]: keepIds }
            },
            transaction
        });

        for (const item of budgetItems) {
            if (item.id) {
                await BudgetItem.update(
                    { name: item.name, amount: item.amount },
                    { where: { id: item.id, project_id: projectId }, transaction }
                );
            } else {
                await BudgetItem.create(
                    { project_id: projectId, name: item.name, amount: item.amount },
                    { transaction }
                );
            }
        }
    }
}