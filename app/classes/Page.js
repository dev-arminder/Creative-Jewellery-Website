class Page {
  constructor({ id }) {
    this.id = id;
  }
  create() {
    console.log("Create" + this.id);
  }
}

export default Page;
