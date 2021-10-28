// autobind decorator
function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

//Validable
interface validable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validated: validable): boolean {
  let isValid = true;
  if (validated.required) {
    isValid = isValid && validated.value.toString().trim().length > 0
  }
  if (validated.minLength && typeof validated.value === 'string') {
    isValid = isValid && validated.value.trim().length >= validated.minLength;
  }
  if (validated.maxLength && typeof validated.value === 'string') {
    isValid = isValid && validated.value.trim().length <= validated.maxLength;
  }
  if (validated.min && typeof validated.value === 'number') {
    isValid = isValid && validated.value > validated.min;
  }
  if (validated.max && typeof validated.value === 'number') {
    isValid = isValid && validated.value < validated.max;
  }
  if (!isValid) {
    console.log("Invalid input:" + validated);
  }
  return isValid;
}

//Abstract class for HTML components
abstract class Component<T extends HTMLElement, U extends HTMLElement>{
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtBegining:boolean,
    newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtBegining);
  }

  private attach(insertAtBegining:boolean) {
    this.hostElement.insertAdjacentElement( insertAtBegining? 'afterbegin':'beforeend',this.element);
  }
  abstract configure():void;
  abstract renderContent():void;

}

//Enum for project stat
enum ProjectStatus {
  ACTIVE,
  FINISHED
}

//Project class
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) { };
}

//Listener Type
type Listener = (projects: Project[]) => void;

//Project stat management

class ProjectStat {
  private projects: Project[] = [];
  private listeners: Listener[] = [];
  private static instance: ProjectStat;
  private constructor() {
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
    for (const listn of this.listeners) {
      console.log('Call listener');
      listn(this.projects);
    }
  }

  addListener(listener: Listener) {
    this.listeners.push(listener);
  }
};

const porjectStat = ProjectStat.getInstance();
//ProjectList class
class ProjectList extends Component<HTMLDivElement,HTMLElement> {
  constructor(private type: 'active' | 'finished') {
    super('project-list','app',false,`${type}-projects`)
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    porjectStat.addListener((projects: Project[]) => {

      const relventedProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.ACTIVE;
        } else
          return project.status === ProjectStatus.FINISHED;
      });
      this.renderProjects(relventedProjects);
    });

    this.renderContent();
  }

  configure(){

  } ;

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }


  private renderProjects(projects: Project[]) {
    const projectListEl = document.getElementById(`${this.type}-project-list`) as HTMLElement;
    for (const project of projects) {
      const item = document.createElement('li');
      item.textContent = project.title;
      projectListEl.appendChild(item);
    }
  }
}
// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const descp = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;
    const titleValidable: validable = {
      value: title,
      required: true
    };
    const descValidable: validable = {
      value: descp,
      required: true,
      minLength: 2,
      maxLength: 30
    }
    const peopleValidable: validable = {
      value: people,
      required: true,
      min: 1,
      max: 6
    }
    if (
      !validate(titleValidable) || !validate(descValidable) || !validate(peopleValidable)
    ) {
      alert("Invalid input");
      return;
    } else {
      return [title, descp, +people]
    }

  }

  clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userinput = this.getUserInput();
    if (Array.isArray(userinput)) {
      const [title, desc, people] = userinput;
      console.log(title, desc, people);
      porjectStat.addProject(title, desc, people);
      this.clearInput();
    }

  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
