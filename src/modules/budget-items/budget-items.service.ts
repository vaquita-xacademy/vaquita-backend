import { CreateBudgetItemDto } from "./dto/create-budget-items.dto";
import { sequelize } from "../../db/sequelize";
import { BudgetItem } from "../../db/models";
import { HttpException } from "../../exceptions";
import { Op, Transaction } from "sequelize";
import { UpdateBudgetItemDto } from "./dto/update-budget-items.dto";
import { normalizeText } from "../../helpers/text-transform";
import { errorMessage } from "../../helpers/messages";

export class BudgetItemsService {
    public async create(projectId: number, dto: CreateBudgetItemDto) {
        return sequelize.transaction(async (transaction) => {
            const budgetItemCreated = await BudgetItem.create(
                {
                    project_id: projectId,
                    name: dto.name,
                    quatity: dto.quantity,
                },
                { transaction }
            );

            return budgetItemCreated;
        });
    }

    public async sync(projectId: number, budgetItems: UpdateBudgetItemDto[], transaction: Transaction) {
        const keepIds = budgetItems.map(item => item.id).filter((id): id is number => id !== undefined);

        await BudgetItem.destroy({
            where: { project_id: projectId, id: { [Op.notIn]: keepIds }},
            transaction
        });
       
        const allItems = budgetItems.map(item => ({
            id: item.id,
            project_id: projectId,
            name: item.name,
            quantity: item.quantity,
        }));

        return await BudgetItem.bulkCreate(allItems, {
            transaction,
            updateOnDuplicate: ["name", "quantity"], 
            returning: true 
        });
    }

    public validateUniqueNames(items: CreateBudgetItemDto[] | UpdateBudgetItemDto[]) {
        if (!items || items.length === 0) return;
        const seenNames = new Set<string>();

        for (const item of items) {
            if (!item.name) continue; 
            const normalizedName = normalizeText(item.name);

            if (seenNames.has(normalizedName)) {
                throw new HttpException( 400, `${item.name}: ${errorMessage.already_exists}` );
            }
            seenNames.add(normalizedName);
        }
    }
}