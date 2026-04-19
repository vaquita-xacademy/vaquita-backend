import { capitalizeText } from "../../helpers/text-transform";
import { Project } from "../models";


export const projectTransform = (project: Project) => {
    if (project.title) { project.title = capitalizeText(project.title); }
    
    if(project.location) {
        project.location.province = capitalizeText(project.location.province);
        project.location.city = capitalizeText(project.location.city);
    }
    
    const goal = Number(project.goal_amount);
    const current = Number(project.current_amount);

    if (goal > 0) {
        const percentage = (current / goal) * 100;
        project.progress = Math.min(Math.round(percentage), 100);
    }else {
        project.progress = 0;
    }
}

export const preventSlugChange = (project: Project) => {
    if (project.changed('slug')) {
        throw new Error("No se puede editar el slug del proyecto");
    }
};