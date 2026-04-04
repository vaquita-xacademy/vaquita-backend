import { HttpException } from '../../../exceptions';

export function ensureCanUpdateGoal(currentAmount: number, newGoal: number) : void {
    if (newGoal < currentAmount) {
        throw new HttpException(
            400, 
            `El nuevo objetivo ($${newGoal}) no puede ser menor a lo ya recaudado ($${currentAmount})`
        );
    }
}

export function ensureNoDonations(current_amount: any): void {
    if (Number(current_amount) > 0) {
        throw new HttpException(
            400,
            `El proyecto no puede ser eliminado porque tiene donaciones`
        );
    }
}