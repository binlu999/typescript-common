namespace APP {
    //ProjectList class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement>
        implements DragTarget {
        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`)

            this.configure()
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
        }

        @autobind
        dropHandler(event: DragEvent) {
            const projId = event.dataTransfer!.getData('text/plain');
            porjectStat.moveProject(projId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        }

        @autobind
        dragLeaveHandler(event: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            porjectStat.addListener((projects: Project[]) => {

                const relventedProjects = projects.filter(project => {
                    if (this.type === 'active') {
                        return project.status === ProjectStatus.ACTIVE;
                    } else
                        return project.status === ProjectStatus.FINISHED;
                });
                this.renderProjects(relventedProjects);
            });
        };

        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
        }


        private renderProjects(projects: Project[]) {
            const projectListEl = document.getElementById(`${this.type}-project-list`) as HTMLElement;
            projectListEl.textContent = '';
            for (const project of projects) {
                new ProjectItem(this.element.querySelector('ul')!.id, project);
            }
        }
    }
}