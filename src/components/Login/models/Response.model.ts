interface Page {
  page_name: string;
  page_link: string;
  page_icon: string;
}

interface Module {
  module_name: string;
  module_link: string;
  module_icon: string;
  children: Page[];
}

interface UserMenu extends Array<Module> {}

export interface ResponseLogin {
  token: string;
  menu: UserMenu;
  user: string;
}
