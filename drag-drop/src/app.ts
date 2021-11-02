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

interface Draggable{
  dragStartHandler(event:DragEvent):void;
  dragEndHandler(event:DragEvent):void;
}

interface DragTarget{
  dragOverHandler(event:DragEvent):void;
  dropHandler(event:DragEvent):void;
  dragLeaveHandler(event:DragEvent):void;
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

//Project Item class
class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> 
      implements Draggable{
  private project :Project;

  get persons(){
    if(this.project.people===1){
      return "1 person";
    }else{
      return `${this.project.people} persons`;
    }
  }
  constructor(hostId:string,project:Project){
    super('single-project',hostId,false,project.id);
    this.project=project;
    this.configure();
    this.renderContent();
    console.log("Host id ="+hostId);
    console.log("item id="+project.id);
  }

  @autobind
  dragStartHandler(event:DragEvent){
    event.dataTransfer!.setData('text/plain',this.project.id);
    event.dataTransfer!.effectAllowed='move';
  }

  dragEndHandler(_:DragEvent){
    console.log('drag end event');
  }
  configure(){
    this.element.addEventListener('dragstart',this.dragStartHandler);
    this.element.addEventListener('dragend',this.dragEndHandler);
  };
  renderContent(){
    this.element.querySelector('h2')!.textContent=this.project.title;
    this.element.querySelector('h3')!.textContent=this.persons+" assigned"
    this.element.querySelector('p')!.textContent=this.project.description;
  }
};

//Listener Type
type Listener<T> = (items: T[]) => void;

//Abstract Stat class
abstract class State<T>{
  protected listeners:Listener<T>[]=[];
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

  moveProject(id:string,status:ProjectStatus){
    const project=this.projects.find(proj=>proj.id===id);
    if(project){
      console.log("New status:"+status);
      project.status=status;
      this.updateProjects();
    }
  }

  updateProjects(){
    for(const l of this.listeners){
      l(this.projects);
    }
  }

};

const porjectStat = ProjectStat.getInstance();
//ProjectList class
class ProjectList extends Component<HTMLDivElement,HTMLElement> 
      implements DragTarget {
  constructor(private type: 'active' | 'finished') {
    super('project-list','app',false,`${type}-projects`)
    
    this.configure()
    this.renderContent();
  }

  @autobind
  dragOverHandler(event:DragEvent){
    if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault();
      const listEl=this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event:DragEvent){
    const projId=event.dataTransfer!.getData('text/plain');
    porjectStat.moveProject(projId,this.type==='active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
  }

  @autobind
  dragLeaveHandler(event:DragEvent){
    const listEl=this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure(){
    this.element.addEventListener('dragover',this.dragOverHandler);
    this.element.addEventListener('drop',this.dropHandler);
    this.element.addEventListener('dragleave',this.dragLeaveHandler);
    porjectStat.addListener((projects: Project[]) => {

      const relventedProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.ACTIVE;
        } else
          return project.status === ProjectStatus.FINISHED;
      });
      this.renderProjects(relventedProjects);
    });
  } ;

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }


  private renderProjects(projects: Project[]) {
    const projectListEl = document.getElementById(`${this.type}-project-list`) as HTMLElement;
    projectListEl.textContent='';
    for (const project of projects) {
      new ProjectItem(this.element.querySelector('ul')!.id,project);
    }
  }
}
// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input','app',true,'user-input');
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

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(){};
}

const prjInput = new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
