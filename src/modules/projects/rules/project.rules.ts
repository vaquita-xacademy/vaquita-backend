import { HttpException } from '../../../exceptions';

// No bajar el monto objetivo por debajo de lo recaudado
export function validateGoalAmount(currentAmount: number, newGoal: number): void {
    if (newGoal < currentAmount) {
        throw new HttpException(
            400, 
            `El nuevo objetivo ($${newGoal}) no puede ser menor a lo ya recaudado ($${currentAmount})`
        );
    }
}

// No borrar un proyecto si ya tiene donaciones: current_amount > 0
export function hasDonations(current_amount: any): void {
    if (Number(current_amount) > 0) {
        throw new HttpException(
            400,
            `El proyecto no puede ser eliminado porque tiene donaciones`
        );
    }
}