/// <reference path="base-componenet.ts" />
namespace APP{
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');
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

    renderContent() { };
  }

}