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
  interface validable{
    value:string|number;
    required:boolean;
    minLength?:number;
    maxLength?:number;
    min?:number;
    max?:number;
  }

  function validate(validated:validable):boolean{
    let isValid=true;
    if(validated.required){
      isValid=isValid && validated.value.toString().trim().length>0
    }
    if(validated.minLength && typeof validated.value === 'string'){
      isValid=isValid && validated.value.trim().length >= validated.minLength;
    }
    if(validated.maxLength && typeof validated.value === 'string'){
      isValid=isValid && validated.value.trim().length <= validated.maxLength; 
    }
    if(validated.min && typeof validated.value === 'number'){
      isValid=isValid && validated.value > validated.min;
    }
    if(validated.max && typeof validated.value === 'number'){
      isValid=isValid && validated.value < validated.max;
    }
    if(!isValid){
      console.log("Invalid input:"+validated);
    }
    return isValid;
  }
  //ProjectList class
  class ProjectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement

    constructor(private type:'active'|'finished'){
      this.templateElement=document.getElementById('project-list')! as HTMLTemplateElement;
      this.hostElement=document.getElementById('app')! as HTMLDivElement;
      
      const importedNode=document.importNode(
        this.templateElement.content,
        true
      )
      this.element=importedNode.firstElementChild as HTMLElement;
      this.element.id=`${this.type}-projects`

      this.attach();
      this.renderContent();
    }

    private renderContent(){
      const listId=`${this.type}-project-list`;
      this.element.querySelector('ul')!.id=listId;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase()+' PROJECTS';
    }

    private attach(){
      this.hostElement.insertAdjacentElement('beforeend',this.element)
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
  
    private getUserInput():[string,string,number]|void{
      const title=this.titleInputElement.value;
      const descp=this.descriptionInputElement.value;
      const people=this.peopleInputElement.value;
      const titleValidable:validable={
        value:title,
        required:true
      };
      const descValidable:validable={
        value:descp,
        required:true,
        minLength:2,
        maxLength:30
      }
      const peopleValidable:validable={
        value:people,
        required:true,
        min:1,
        max:6
      }
      if(
        !validate(titleValidable) || !validate(descValidable)||!validate(peopleValidable)
        ){
        alert("Invalid input");
        return;
      }else{
        return [title,descp,+people]
      }

    }

    clearInput(){
      this.titleInputElement.value='';
      this.descriptionInputElement.value='';
      this.peopleInputElement.value=''
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userinput=this.getUserInput();
      if(Array.isArray(userinput)){
        const [title,desc,people]=userinput;
        console.log(title,desc,people);
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
  