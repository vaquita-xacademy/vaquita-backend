import { BudgetItem } from "../../../db/models";

export class BudgetItemsResource {
    static toResponse(item: BudgetItem) {
        return {
            id: item.id,
            name: item.name,
            amount: Number(item.amount),
        };
    }

    static toCollection(items: BudgetItem[]) {
        return items.map(item => BudgetItemsResource.toResponse(item));
    }
}