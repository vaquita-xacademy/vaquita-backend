import { HttpException } from '../../../exceptions';

export const ProjectRules = {
    // No bajar el monto objetivo por debajo de lo recaudado
    ensureCanUpdateGoal:(currentAmount: number, newGoal: number) => {
        if (newGoal < currentAmount) {
            throw new HttpException(
                400, 
                `El nuevo objetivo ($${newGoal}) no puede ser menor a lo ya recaudado ($${currentAmount})`
            );
        }
    },

    // No borrar proyecto si ya tiene donaciones: current_amount > 0
    ensureNoDonations:(current_amount: any) => {
        if (Number(current_amount) > 0) {
            throw new HttpException(
                400,
                `El proyecto no puede ser eliminado porque tiene donaciones`
            );
        }
    }

}