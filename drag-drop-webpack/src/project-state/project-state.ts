import {Project,ProjectStatus} from "../models/project"

//Listener Type
type Listener<T> = (items: T[]) => void;

//Abstract Stat class
abstract class State<T>{
    protected listeners: Listener<T>[] = [];
    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
};

//Project stat management
class ProjectStat extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectStat;
    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new ProjectStat();
        }
        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const project = new Project(
            Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
        this.projects.push(project);
        this.updateProjects()
    }

    moveProject(id: string, status: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === id);
        if (project) {
            console.log("New status:" + status);
            project.status = status;
            this.updateProjects();
        }
    }

    updateProjects() {
        for (const l of this.listeners) {
            l(this.projects);
        }
    }

};

console.log("Loading project-stat file");
export const porjectStat = ProjectStat.getInstance();